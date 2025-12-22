import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

export const handler = async (event: any) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

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
        const { paymentMethodId, email, name, plan, amount } = JSON.parse(event.body);

        // Create or retrieve customer
        let customer;
        const existingCustomers = await stripe.customers.list({
            email,
            limit: 1,
        });

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
        } else {
            customer = await stripe.customers.create({
                email,
                name,
                metadata: {
                    plan,
                },
            });
        }

        // Attach payment method to customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        });

        // Set as default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            customer: customer.id,
            payment_method: paymentMethodId,
            off_session: true, // This allows you to charge later
            confirm: true,
            metadata: {
                plan,
            },
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                customerId: customer.id,
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
            }),
        };
    } catch (error: any) {
        console.error('Error confirming payment:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message,
                type: error.type,
            }),
        };
    }
};
