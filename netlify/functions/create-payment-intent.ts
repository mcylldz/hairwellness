import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

export const handler = async (event: any) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { plan } = JSON.parse(event.body);

        // Plan prices
        const prices: Record<string, number> = {
            '1-week': 999,   // $9.99 in cents
            '4-week': 1999,  // $19.99 in cents
            '12-week': 3999, // $39.99 in cents
        };

        const amount = prices[plan];
        if (!amount) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid plan' }),
            };
        }

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                plan,
            },
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            }),
        };
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
