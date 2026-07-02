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

        let paymentMethodId;

        if (cardNumber.startsWith('4242')) {
            paymentMethodId = 'pm_card_visa';
        } else if (cardNumber.startsWith('5555')) {
            paymentMethodId = 'pm_card_mastercard';
        } else {
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

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        });

        if (paymentIntent.status === 'succeeded') {
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
