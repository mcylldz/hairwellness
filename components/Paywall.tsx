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
        // PRIORITIZE VITE_ PREFIXED VARS
        const stripeLink = (import.meta as any).env.VITE_STRIPE_PAYMENT_LINK ||
            (import.meta as any).env.VITE_STRIPE_URL ||
            (window as any)._env_?.VITE_STRIPE_PAYMENT_LINK ||
            (window as any)._env_?.STRIPE_PAYMENT_LINK ||
            (window as any).process?.env?.VITE_STRIPE_PAYMENT_LINK;

        console.log("Stripe Checkout Link Check:", stripeLink ? "FOUND" : "NOT FOUND");

        if (stripeLink) {
            // Stripe typically blocks iframes/popups, so we use a direct redirect for reliability
            window.location.href = stripeLink;
        } else {
            console.error("CRITICAL: VITE_STRIPE_PAYMENT_LINK is missing in environment variables.");
            alert("Payment link is not configured. Please check your Netlify environment variables (must start with VITE_).");
            onSuccess();
        }
    };

    const testimonials = [
        { name: "Lila", age: 27, text: "My frizz is finally under control. I never thought my natural hair could look this polished and healthy.", img: "/testimonial_1.jpg" },
        { name: "Maya", age: 31, text: "The strength and shine are incredible. My hair feels thicker and much more resilient than before.", img: "/testimonial_2.jpg" },
        { name: "Clara", age: 35, text: "I finally found a routine that actually works for my texture. The transformation has been a huge confidence boost.", img: "/testimonial_3.jpg" },
        { name: "Elena", age: 44, text: "My hair hasn't looked this full and vibrant in years. The personalized approach made all the difference.", img: "/testimonial_4.jpg" }
    ];

    const [activeTestimonial, setActiveTestimonial] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

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

                {/* Impact Image Slider */}
                <div className="w-full relative rounded-3xl overflow-hidden shadow-xl mb-6 border border-slate-100 bg-white">
                    <div className="relative h-64 w-full">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-opacity duration-1000 ${i === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
                                <div className="absolute top-4 left-4 bg-cyan-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">TRANSFORMATION</div>
                            </div>
                        ))}
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-900 text-lg">{testimonials[activeTestimonial].name}, {testimonials[activeTestimonial].age}</span>
                            <div className="flex space-x-0.5">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />)}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed italic font-medium">
                            "{testimonials[activeTestimonial].text}"
                        </p>

                        {/* Dot Indicators */}
                        <div className="flex justify-center space-x-1.5 mt-4">
                            {testimonials.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-4 bg-cyan-500' : 'w-1.5 bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="w-full mt-auto space-y-4">
                    <div className="text-center space-y-2 mb-4">
                        <p className="text-cyan-500 font-black text-3xl uppercase tracking-tighter">
                            FREE for 3 days
                        </p>
                        <p style={{ fontSize: '12px', color: 'oklch(0.89 0.03 257.78)' }} className="leading-snug px-2 font-medium">
                            You will be charged a monthly fee of $39.00 from the day your free trial ends. You can cancel your subscription either before your free trial ends or after the free trial has ended.
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
                    <button onClick={onSubscription}>Subscription</button>
                </div>

            </div>
        </div>
    );
};
