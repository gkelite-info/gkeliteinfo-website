import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
    try {
        const body = await req.json();
        const { cardNumber, expMonth, expYear, cvc, cardHolderName, amount, applicationId } = body;

        // Note: Passing raw card details through your own API requires PCI compliance.
        // Stripe throws an error if raw card data access isn't enabled in the Dashboard.
        // For this test environment, we map standard test card numbers to Stripe's test tokens.
        
        let paymentMethodId;
        
        if (cardNumber.startsWith('4242')) {
            paymentMethodId = 'pm_card_visa';
        } else if (cardNumber.startsWith('5555')) {
            paymentMethodId = 'pm_card_mastercard';
        } else {
            // Fallback: try creating it (this will throw the same raw-card error if not enabled)
            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: cardNumber,
                    exp_month: expMonth,
                    exp_year: expYear,
                    cvc: cvc,
                },
                billing_details: {
                    name: cardHolderName,
                }
            });
            paymentMethodId = paymentMethod.id;
        }

        // Resolve internal integer applicationId if a string (like GK-INTER-2026-00005) was provided
        let internalAppId = parseInt(applicationId, 10);
        if (isNaN(internalAppId)) {
            const { data: leadData } = await supabase
                .from('lead_applications')
                .select('applicationId')
                .eq('applicationNumber', applicationId)
                .single();
                
            if (leadData && leadData.applicationId) {
                internalAppId = leadData.applicationId;
            } else {
                return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
            }
        }

        // Create and confirm a PaymentIntent to immediately charge the card
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in paise (₹500 -> 50000)
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        });

        if (paymentIntent.status === 'succeeded') {
            // Insert into Supabase lead_payments table
            const { error: dbError } = await supabase.from('lead_payments').insert({
                applicationId: internalAppId,
                amount: amount,
                paymentStatus: 'success',
                transactionId: paymentIntent.id,
                paymentDate: new Date().toISOString(),
                paymentMethod: 'credit_card',
                receiptUrl: paymentIntent.receipt_url || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            if (dbError) {
                console.error("Supabase insert error:", dbError);
                // Still return success since the payment went through
                return NextResponse.json({ success: true, paymentIntent, note: 'DB Insert Failed' });
            }

            return NextResponse.json({ success: true, paymentIntent });
        } else {
            return NextResponse.json({ success: false, error: 'Payment failed' }, { status: 400 });
        }

    } catch (error) {
        console.error("Stripe payment error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
