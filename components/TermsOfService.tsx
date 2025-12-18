import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
    onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
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

                <h1 className="text-3xl font-black text-slate-900 mb-6">Terms of Service</h1>
                <p className="text-sm text-slate-400 mb-8 font-medium italic">Last Updated: December 2025</p>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using Mesu, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
                        <p>
                            Mesu provides AI-driven hair health analysis and personalized routine recommendations based on user-provided survey data and photos. The service is provided for informational and educational purposes only.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Subscription and Billing</h2>
                        <p>
                            Mesu PRO offers a 3-day free trial, after which a monthly subscription fee of $39.90 is charged. You can cancel your subscription at any time. No refunds are provided for partial subscription periods.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. No Medical Advice</h2>
                        <p>
                            The content provided by Mesu is NOT medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. User Content</h2>
                        <p>
                            You grant Mesu a non-exclusive license to process your uploaded photos and survey data solely for the purpose of providing the analysis service and improving our AI performance.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
                        <p>
                            Mesu and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <p className="text-center text-slate-400 text-sm italic">
                            Thank you for choosing Mesu for your hair wellness journey.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
