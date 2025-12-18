import React from 'react';
import { ArrowLeft, CreditCard, RefreshCw, XCircle } from 'lucide-react';

interface SubscriptionPolicyProps {
    onClose: () => void;
}

export const SubscriptionPolicy: React.FC<SubscriptionPolicyProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto font-sans text-slate-700 leading-relaxed p-6">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={onClose}
                    className="flex items-center text-cyan-600 font-bold mb-8 hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to App
                </button>

                <h1 className="text-3xl font-black text-slate-900 mb-6">Subscription Policy</h1>
                <p className="text-sm text-slate-400 mb-8 font-medium italic">Effective Date: December 2025</p>

                <section className="space-y-8">
                    <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                            <CreditCard className="w-6 h-6 mr-2 text-cyan-600" />
                            Trial & Billing
                        </h2>
                        <p className="mb-4">
                            Mesu PRO offers a <strong>3-day Free Trial</strong> to new users. During this period, you will have full access to all premium features, including your 12-week transformation plan and all hair health indicators.
                        </p>
                        <p>
                            After the trial expires, you will be automatically charged <strong>$39.90 per month</strong> unless you cancel at least 24 hours before the trial ends.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                            <RefreshCw className="w-6 h-6 mr-2 text-cyan-600" />
                            Automatic Renewal
                        </h2>
                        <p>
                            Your subscription will automatically renew each month on the same day as your initial purchase. Your payment method on file will be charged the standard rate of $39.90.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                            <XCircle className="w-6 h-6 mr-2 text-red-500" />
                            Cancellation Policy
                        </h2>
                        <p className="mb-4">
                            You can cancel your Mesu PRO subscription at any time. To avoid being charged for the next billing cycle, please cancel at least 24 hours before your current period ends.
                        </p>
                        <p>
                            Upon cancellation, you will retain access to premium features until the end of your current billing period.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">Refund Policy</h2>
                        <p>
                            Subscriptions and individual analysis reports are non-refundable. We do not provide refunds or credits for any partial subscription periods or unused reports.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <p className="text-center text-slate-400 text-sm">
                            For billing inquiries or support, please contact us through the app or our official support channels.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
