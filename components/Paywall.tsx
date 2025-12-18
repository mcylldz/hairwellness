import React from 'react';
import { Check, Star, ArrowRight, ShieldCheck } from 'lucide-react';

interface PaywallProps {
    onSuccess: () => void;
    onClose: () => void;
    onPrivacy: () => void;
    onTerms: () => void;
    onSubscription: () => void;
}

export const Paywall: React.FC<PaywallProps> = ({ onSuccess, onClose, onPrivacy, onTerms, onSubscription }) => {
    const handleCheckout = () => {
        const stripeLink = (process as any).env.STRIPE_PAYMENT_LINK || (process as any).env.STRIPE_URL;
        if (stripeLink) {
            window.location.href = stripeLink;
        } else {
            console.error("STRIPE_PAYMENT_LINK not found");
            onSuccess();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <div className="max-w-md mx-auto px-6 py-8 flex flex-col items-center">

                {/* Header Section */}
                <h1 className="text-3xl font-black text-slate-900 text-center leading-tight mb-2">
                    Transform Your Hair<br />With Mesu PRO
                </h1>

                <div className="flex items-center space-x-2 my-4">
                    <div className="flex items-center text-cyan-500">
                        <ShieldCheck className="w-5 h-5 mr-1" />
                        <span className="text-sm font-bold uppercase tracking-widest text-[#00E5FF]">Trusted by 100K+ Users</span>
                    </div>
                </div>

                <div className="flex space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-6 h-6 fill-[#00C8FF] text-[#00C8FF]" />
                    ))}
                </div>

                {/* User Avatars (Social Proof) */}
                <div className="flex -space-x-2 mb-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                    ))}
                </div>

                {/* Hero Impact Image (Lisa example) */}
                <div className="w-full relative rounded-[32px] overflow-hidden shadow-2xl mb-8 border border-slate-100">
                    <div className="flex h-72">
                        <div className="w-1/2 relative">
                            <img src="/photo_testimonial_1.jpg" className="w-full h-full object-cover" alt="Before" />
                            <div className="absolute top-4 left-4 bg-[#00E5FF] text-white text-[10px] font-black px-3 py-1 rounded-full">BEFORE</div>
                        </div>
                        <div className="w-1/2 relative border-l-2 border-white">
                            <img src="/photo_testimonial_2.jpg" className="w-full h-full object-cover" alt="After" />
                            <div className="absolute top-4 right-4 bg-[#01C2D4] text-white text-[10px] font-black px-3 py-1 rounded-full">AFTER</div>
                            <div className="absolute top-1/2 -left-6 -translate-y-1/2">
                                <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L14.66 16.5H4.75a.75.75 0 0 1 0-1.5h9.91l-1.44-1.47a.75.75 0 1 1 1.06-1.06l2.75 2.81a.75.75 0 0 1 0 1.06l-2.75 2.81a.75.75 0 0 1-1.06 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-900">Lisa, 52</span>
                            <div className="flex space-x-0.5">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#00C8FF] text-[#00C8FF]" />)}
                            </div>
                        </div>
                        <h3 className="font-black text-lg text-slate-900 mb-1">Worth every penny</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            I used to try random products with no results. With Mesu PRO, I finally understand what my hair needs.
                        </p>
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="w-full mt-auto space-y-4">
                    <div className="text-center">
                        <p className="text-[#00C8FF] font-black text-lg">
                            FREE for 3 days, <span className="text-slate-50 text-[5px] opacity-10 font-thin">then $39.90 billed monthly.</span>
                        </p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-[#00C8FF] hover:bg-cyan-500 text-white font-black text-xl py-5 rounded-full shadow-xl shadow-cyan-100 flex items-center justify-center space-x-3 transition-transform active:scale-95"
                    >
                        <span>Continue for $0.00</span>
                        <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="flex items-center justify-center space-x-2 text-slate-800 font-bold text-sm">
                        <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
                        <span>No payment due now. Cancel anytime.</span>
                    </div>
                </div>

                {/* Tiny Links */}
                <div className="flex space-x-8 mt-12 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                    <button onClick={onPrivacy}>Privacy</button>
                    <button onClick={onTerms}>Terms</button>
                    <button onClick={onSubscription}>Restore</button>
                </div>

            </div>
        </div>
    );
};
