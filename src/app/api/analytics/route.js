import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '../../../utils/supabase/client';

// A simple in-memory Rate Limiter to prevent spam
// Note: This works per-instance (perfect for single Node.js servers). 
// If deploying to serverless/Vercel with multiple instances, rate limiting still drastically reduces overall spam.
const rateLimitMap = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // Max 60 requests per IP per minute

function isRateLimited(ip) {
    const now = Date.now();
    const userStats = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - userStats.startTime > WINDOW_MS) {
        // Reset window
        userStats.count = 1;
        userStats.startTime = now;
        rateLimitMap.set(ip, userStats);
        return false;
    }

    if (userStats.count >= MAX_REQUESTS) {
        return true;
    }

    userStats.count += 1;
    rateLimitMap.set(ip, userStats);
    return false;
}

export async function POST(req) {
    try {
        // 1. Rate Limiting Security
        // Support proxies by checking x-forwarded-for first
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { success: false, error: "Too many requests" },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { eventType, formType, applicationId, path, metadata } = body;

        if (!eventType || !path) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: eventType or path" },
                { status: 400 }
            );
        }

        // 2. Secure Visitor ID (HttpOnly Cookie logic)
        const cookieStore = await cookies();
        let visitorId = cookieStore.get('visitorId')?.value;
        let isNewVisitor = false;

        if (!visitorId) {
            // Generate a secure UUID natively
            visitorId = crypto.randomUUID();
            isNewVisitor = true;
        }

        // 3. Database Insertion (Supabase)
        // Extract basic user agent for analytics
        const userAgent = req.headers.get("user-agent") || null;

        const now = new Date().toISOString();
        const payload = {
            visitorId,
            eventType,
            formType: formType || null,
            applicationId: applicationId || null,
            path,
            ipAddress: ip,
            userAgent,
            metadata: metadata || null,
            createdAt: now,
            updatedAt: now
        };

        const { error } = await supabase
            .from('application_analytics_logs')
            .insert([payload]);

        if (error) {
            console.error("Analytics insert error:", error);
            return NextResponse.json(
                { success: false, error: "Database error" },
                { status: 500 }
            );
        }

        // 4. Return response and set secure cookie if needed
        const response = NextResponse.json({ success: true, visitorId: isNewVisitor ? visitorId : undefined });

        if (isNewVisitor) {
            response.cookies.set({
                name: 'visitorId',
                value: visitorId,
                httpOnly: true, // Crucial for security, prevents XSS access
                secure: process.env.NODE_ENV === 'production', // Use Secure flag in production
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 365, // 1 year expiration
                path: '/'
            });
        }

        return response;
    } catch (error) {
        console.error("Analytics API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
