import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, Loader2 } from 'lucide-react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: '1-week' | '4-week' | '12-week';
    onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, selectedPlan, onSuccess }) => {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [elements, setElements] = useState<StripeElements | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cardElement, setCardElement] = useState<any>(null);

    const planDetails = {
        '1-week': { price: 9.99, name: '1-Week Plan', amount: 999 },
        '4-week': { price: 19.99, name: '4-Week Plan', amount: 1999 },
        '12-week': { price: 39.99, name: '12-Week Plan', amount: 3999 },
    };

    const plan = planDetails[selectedPlan];

    useEffect(() => {
        if (isOpen) {
            initializeStripe();
        }
    }, [isOpen]);

    const initializeStripe = async () => {
        const publishableKey = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;

        if (!publishableKey) {
            setError('Stripe configuration missing');
            return;
        }

        const stripeInstance = await loadStripe(publishableKey);
        setStripe(stripeInstance);

        if (stripeInstance) {
            const elementsInstance = stripeInstance.elements();
            setElements(elementsInstance);

            const card = elementsInstance.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#1e293b',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        '::placeholder': {
                            color: '#94a3b8',
                        },
                    },
                    invalid: {
                        color: '#ef4444',
                    },
                },
            });

            card.mount('#card-element');
            setCardElement(card);

            card.on('change', (event: any) => {
                setError(event.error ? event.error.message : null);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !cardElement || !email || !name) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create payment method
            const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    email,
                    name,
                },
            });

            if (pmError) {
                throw new Error(pmError.message);
            }

            // Confirm payment with backend
            const response = await fetch('/.netlify/functions/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod!.id,
                    email,
                    name,
                    plan: selectedPlan,
                    amount: plan.amount,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Payment failed');
            }

            // Success!
            console.log('Payment successful:', result);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Payment error:', err);
            setError(err.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center rounded-t-3xl">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Complete Payment</h2>
                        <p className="text-sm text-slate-500 mt-1">{plan.name} - ${plan.price}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        disabled={loading}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7000FF] focus:border-transparent transition-all"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7000FF] focus:border-transparent transition-all"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Card Element */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <CreditCard size={16} />
                            Card Information
                        </label>
                        <div
                            id="card-element"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#7000FF] focus-within:border-transparent transition-all"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Security Note */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                        <Lock size={14} className="text-green-600" />
                        <span>Your payment information is encrypted and secure</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !stripe}
                        className="w-full bg-[#7000FF] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#6000dd] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>Pay ${plan.price}</>
                        )}
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-center text-slate-400">
                        By confirming your payment, you agree to our Terms of Service and Privacy Policy.
                        Your card will be saved for future charges.
                    </p>
                </form>
            </div>
        </div>
    );
};
