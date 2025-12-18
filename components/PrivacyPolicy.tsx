import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
    onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
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

                <h1 className="text-3xl font-black text-slate-900 mb-6">Privacy Policy</h1>
                <p className="text-sm text-slate-400 mb-8 font-medium italic">Last Updated: December 2025</p>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
                        <p>
                            Mesu collects information you provide directly to us through our hair wellness survey, including your name, age, gender identity, hair characteristics, and photos of your hair. We also collect your email address to send you your results.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
                        <p>
                            We use your data to generate a personalized hair health analysis and routine using AI technology. Specifically, we use your:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Photos and survey answers to calculate wellness scores.</li>
                            <li>Email address to deliver the analysis and plan.</li>
                            <li>Data to improve our AI models and service accuracy.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your sensitive hair data and photos. Your information is processed securely and is never sold to third parties.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. AI Analysis Disclosure</h2>
                        <p>
                            Analysis is performed by artificial intelligence (Gemini API). While we strive for accuracy, Mesu does not provide medical advice. Consult a dermatologist for clinical hair concerns.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Your Rights</h2>
                        <p>
                            You may contact us at any time to request access to or deletion of your personal data stored on our systems.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <p className="text-center text-slate-400 text-sm italic">
                            By using Mesu, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
