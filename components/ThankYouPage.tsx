import React, { useEffect } from 'react';
import { Check, Mail, Clock } from 'lucide-react';
import { PixelService } from '../services/pixel';

interface ThankYouPageProps {
    selectedPlan?: '1-week' | '4-week' | '12-week';
    email?: string;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ selectedPlan = '4-week', email = 'your email' }) => {
    const planDetails = {
        '1-week': { name: '1-Week Plan', price: 9.99, duration: '1 week' },
        '4-week': { name: '4-Week Plan', price: 19.99, duration: '4 weeks' },
        '12-week': { name: '12-Week Plan', price: 39.99, duration: '12 weeks' },
    };

    const plan = planDetails[selectedPlan];

    useEffect(() => {
        // Track Purchase event when page loads
        PixelService.track('Purchase', {
            currency: 'USD',
            value: plan.price,
            content_name: plan.name,
        });

        // Also track custom event
        PixelService.trackCustom('PurchaseComplete', {
            plan: selectedPlan,
            price: plan.price,
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <Check size={48} className="text-green-600" strokeWidth={3} />
                    </div>
                </div>

                {/* Main Message */}
                <h1 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-4">
                    Payment Successful! 🎉
                </h1>

                <p className="text-center text-slate-600 text-lg mb-8">
                    Thank you for choosing the <span className="font-bold text-[#2bb3c9]">{plan.name}</span>
                </p>

                {/* Info Cards */}
                <div className="space-y-4 mb-8">
                    {/* Email Card */}
                    <div className="bg-gradient-to-r from-cyan-50 to-cyan-50 rounded-2xl p-6 border border-cyan-100">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Mail size={24} className="text-[#2bb3c9]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-2">Your Personalized Plan is On Its Way!</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Your customized {plan.duration} hair wellness plan will be sent to <span className="font-semibold text-slate-900">{email}</span> within the next <span className="font-bold text-[#2bb3c9]">24 hours</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-gradient-to-r from-cyan-50 to-cyan-50 rounded-2xl p-6 border border-cyan-100">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Clock size={24} className="text-cyan-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-2">What Happens Next?</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Our AI analyzes your hair profile in detail</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>We create your personalized {plan.duration} routine</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>You receive detailed product recommendations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Get access to our AI Hair Assistant 24/7</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">{plan.name}</span>
                        <span className="font-bold text-slate-900">${plan.price}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                        <span className="font-bold text-slate-900">Total Paid</span>
                        <span className="font-black text-2xl text-[#2bb3c9]">${plan.price}</span>
                    </div>
                </div>

                {/* Support Note */}
                <div className="text-center">
                    <p className="text-sm text-slate-500 mb-4">
                        Questions? Check your email for order details or contact our support team.
                    </p>
                    <p className="text-xs text-slate-400">
                        Order confirmation has been sent to {email}
                    </p>
                </div>
            </div>
        </div>
    );
};
