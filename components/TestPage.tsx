import React, { useState, useEffect } from 'react';
import { Target, ChartBar, Shield, Check, Clock, Lock, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { SURVEY_STEPS } from '../constants'; // Import constants to get testimonial data

export const TestPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [selectedPlan, setSelectedPlan] = useState<'1-week' | '4-week' | '12-week'>('4-week');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // Default first one open
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    // Get testimonials from constants
    // The testimonial step has id 'results_preview' and is type 'testimonials'
    const testimonialStep = SURVEY_STEPS.find(step => step.id === 'results_preview');
    const testimonials = testimonialStep?.testimonials || [];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTimeVerbose = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    const formatTimeComponents = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return {
            mins: `${mins < 10 ? '0' : ''}${mins}`,
            secs: `${secs < 10 ? '0' : ''}${secs}`
        };
    };

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Why exactly the Mesu Plan?",
            answer: "The Mesu Plan provides gentle, consistent hair care routines personalized by AI to match your unique hair and scalp profile. It helps restore balance, improve hair health, and support stronger, more resilient hair—so you can feel confident in how your hair looks and feels every day."
        },
        {
            question: "Will I get any physical products?",
            answer: "No. The Mesu Plan is a fully digital hair analysis and guidance system. We recommend hair care products based on your analysis results, but you are free to purchase them from any store you prefer. Mesu does not sell or ship physical products."
        },
        {
            question: "How can this plan help me?",
            answer: "The Mesu Plan helps you take control of your hair care with clarity and confidence.\nInstead of guessing which products or routines might work, you receive step-by-step guidance based on your hair type, scalp condition, and goals.\nThe AI Hair Assistant is always available to answer your questions, and the Hair Product Scanner ensures that every product you consider truly fits your hair profile."
        },
        {
            question: "When can I start seeing results?",
            answer: "Results vary depending on your hair concerns and goals, but most Mesu users begin noticing improvements within the first 3–4 weeks.\nMany users report visible changes in hair texture, scalp comfort, and manageability after consistent use of the plan."
        },
        {
            question: "Is the Mesu Plan science-backed?",
            answer: "Yes. The Mesu Plan is built on trichology research and evidence-based hair care principles.\nIt is developed using scientific insights into hair structure, scalp health, and ingredient safety, combined with AI-driven personalization—so the recommendations are both reliable and effective."
        }
    ];

    const PlansSection = () => (
        <div id="plans-selection-inner" className="bg-slate-50 rounded-xl p-4 md:p-6 mb-8">
            {/* Promo Banner */}
            <div className="bg-[#EAFBF3] rounded-2xl p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#59CFA2] p-1 rounded-full"><div className="w-2 h-2 bg-white rounded-full"></div></div>
                    <h3 className="font-bold text-[#0D2B1D] text-sm md:text-base">Your promo code applied!</h3>
                </div>

                <div className="flex gap-3">
                    {/* Code Box */}
                    <div className="flex-1 bg-white rounded-xl border border-slate-100 flex items-center p-3 shadow-sm overflow-hidden">
                        <div className="text-[#2ECC71] mr-2 shrink-0"><Check size={16} strokeWidth={3} /></div>
                        <span className="font-semibold text-slate-800 text-xs md:text-sm truncate">MEHMET_Dec25</span>
                    </div>
                    {/* Timer Box */}
                    <div className="bg-[#D4F5E4] rounded-xl flex flex-col items-center justify-center px-4 py-1 w-24 md:w-28 text-[#1E5F43] shrink-0">
                        <div className="text-xl font-bold leading-none tracking-tight tabular-nums">{formatTimeVerbose(timeLeft)}</div>
                        <div className="text-[9px] font-medium opacity-80 leading-none mt-0.5">minutes seconds</div>
                    </div>
                </div>
            </div>

            {/* Subscription Plans */}
            <div className="space-y-4 mb-8">

                {/* 1-Week Plan */}
                <div
                    onClick={() => setSelectedPlan('1-week')}
                    className={`relative p-0 rounded-2xl border-2 cursor-pointer transition-all duration-200 bg-white overflow-hidden ${selectedPlan === '1-week' ? 'border-slate-400' : 'border-slate-100'}`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Radio Circle */}
                            <div className={`w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50 shrink-0`}>
                                {selectedPlan === '1-week' && <div className="w-3 h-3 rounded-full bg-slate-400" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">1-Week Plan</h3>
                                <div className="text-xs text-slate-400 font-medium">
                                    <span className="line-through decoration-slate-400 decoration-1">$59.99</span> <span className="text-slate-600">→ $10.49</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-700 text-xl">$1.49</div>
                            <div className="text-[10px] text-slate-400 uppercase font-medium">per day</div>
                        </div>
                    </div>
                </div>


                {/* 4-Week Plan (Most Popular) */}
                <div
                    onClick={() => setSelectedPlan('4-week')}
                    className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden shadow-lg ${selectedPlan === '4-week' ? 'border-[#7000FF] bg-white ring-1 ring-[#7000FF]/30' : 'border-gray-200 bg-white'}`}
                >
                    {/* Purple Banner */}
                    <div className="bg-[#7000FF] text-white text-center text-xs font-bold uppercase py-1.5 tracking-wide">
                        Most Popular
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Radio Circle - Custom Check for active */}
                            {selectedPlan === '4-week' ? (
                                <div className="w-6 h-6 rounded-full bg-[#7000FF] flex items-center justify-center shrink-0">
                                    <Check size={14} color="white" strokeWidth={3} />
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full border border-slate-300 bg-slate-50 shrink-0" />
                            )}

                            <div>
                                <h3 className="font-bold text-slate-900 text-xl">4-Week Plan</h3>
                                <div className="text-xs text-slate-500 font-medium">
                                    <span className="line-through decoration-slate-400">$59.99</span> <span className="text-slate-900 font-bold">→ $19.99</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-black text-slate-900 text-2xl">$0.71</div>
                            <div className="text-[10px] text-slate-500 uppercase font-medium tracking-wide">per day</div>
                        </div>
                    </div>
                </div>

                {/* 12-Week Plan */}
                <div
                    onClick={() => setSelectedPlan('12-week')}
                    className={`relative p-0 rounded-2xl border-2 cursor-pointer transition-all duration-200 bg-white overflow-hidden ${selectedPlan === '12-week' ? 'border-slate-400' : 'border-slate-100'}`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Radio Circle */}
                            <div className={`w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50 shrink-0`}>
                                {selectedPlan === '12-week' && <div className="w-3 h-3 rounded-full bg-slate-400" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">12-Week Plan</h3>
                                <div className="text-xs text-slate-400 font-medium">
                                    <span className="line-through decoration-slate-400 decoration-1">$105.99</span> <span className="text-slate-600">→ $34.99</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-700 text-xl">$0.42</div>
                            <div className="text-[10px] text-slate-400 uppercase font-medium">per day</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main CTA */}
            <div className="bg-[#F0E6FF] p-2 rounded-3xl mb-4">
                <button className="w-full bg-[#7000FF] text-white font-bold text-xl py-4 rounded-2xl shadow-lg shadow-purple-500/20 hover:bg-[#6000dd] transition-all transform active:scale-[0.98]">
                    GET MY PLAN
                </button>
            </div>
        </div>
    );

    const TrustAndGuarantee = () => (
        <>
            {/* Guarantee Text Only */}
            <div className="text-center mb-6">
                <span className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-2">30-day money-back guarantee</span>
            </div>

            {/* Scientific Backing - Minimal (Updated Name) */}
            <div className="flex gap-3 mb-8 px-2 justify-center text-left max-w-sm mx-auto">
                <div className="shrink-0 mt-1 text-[#7000FF]">
                    <Target size={20} />
                </div>
                <div>
                    <p className="text-slate-900 font-medium text-sm leading-snug mb-1">
                        People using plan for 12 weeks achieve twice as many results as for 4 weeks
                    </p>
                    <p className="text-[10px] text-slate-400">
                        *According to a research by Mesu, 2025
                    </p>
                </div>
            </div>

            {/* Fine Print */}
            <div className="text-[10px] text-slate-400 text-justify leading-relaxed mb-8 px-4 max-w-sm mx-auto">
                By clicking "Get My Plan" you agree to automatic renewal of subscription. First month at $19.99, then at $59.99/month. Cancel by emailing: <a href="mailto:support@mesu.com" className="underline">support@mesu.com</a>. Details in Subscription Policy. A $1 test charge will verify your payment method and be refunded immediately.
            </div>

            {/* Trust Banner with Icons (Separated) */}
            <div className="flex flex-col items-center gap-4 pb-8">
                <div className="bg-[#ECF7ED] rounded-lg py-2 px-6 flex items-center justify-center text-[#559E6D] border border-[#dff2e1] gap-2 w-full max-w-xs">
                    <Shield size={16} fill="currentColor" className="opacity-80" />
                    <span className="font-semibold text-sm">Pay safe & secure</span>
                </div>
                {/* Payment Icons */}
                <img src="/payment-icons.png" alt="Payment Methods" className="h-6 md:h-8 object-contain opacity-90 mix-blend-multiply" />
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* 1. Sticky Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-100 py-3 px-4 shadow-sm flex justify-between items-center transition-all duration-300">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900 leading-none mb-1">60% discount reserved for</span>
                    <div className="font-bold text-[#7000FF] text-2xl leading-none tracking-tight tabular-nums flex items-baseline">
                        {formatTimeComponents(timeLeft).mins}
                        <span className="animate-pulse mx-0.5 opacity-50 text-xl">:</span>
                        {formatTimeComponents(timeLeft).secs}
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#7000FF] text-white text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-[#6000dd] transition-colors shadow-lg shadow-purple-500/20"
                >
                    GET MY PLAN
                </button>
            </div>

            <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">

                {/* 2. Hero Section (Before/After) */}
                <div className="relative group">
                    <img src="/before-after.jpg" alt="Hair Transformation Before and After" className="w-full object-cover aspect-[4/3]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 text-[10px] rounded-full uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20">Before</div>
                    <div className="absolute bottom-4 right-4 bg-[#7000FF]/90 text-white px-3 py-1 text-[10px] rounded-full uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20 shadow-lg shadow-purple-500/30">After</div>
                </div>

                {/* 3. Grid Analysis */}
                <div className="p-5 border-b-8 border-slate-50">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Now -> Goal */}
                        <div className="flex flex-col gap-3 justify-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">NOW</span>
                                <span className="text-slate-800 font-bold text-sm leading-tight">Hair health problems</span>
                            </div>
                            <div className="h-px bg-slate-100 w-full"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[#7000FF] text-[9px] font-bold uppercase tracking-widest">GOAL</span>
                                <span className="text-[#7000FF] font-black text-sm leading-tight">Optimized Hair health</span>
                            </div>
                        </div>

                        {/* Effectiveness Bars */}
                        <div className="flex flex-col justify-center gap-4 pl-4 border-l border-slate-100">
                            <div>
                                <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1 leading-tight">Current Routine</h3>
                                <div className="flex gap-1">
                                    <div className="h-2 w-full rounded-full bg-red-400"></div>
                                    <div className="h-2 w-full rounded-full bg-slate-100"></div>
                                    <div className="h-2 w-full rounded-full bg-slate-100"></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[9px] font-bold text-[#7000FF] uppercase tracking-wide mb-1 leading-tight">Optimized Routine</h3>
                                <div className="flex gap-1">
                                    <div className="h-2 w-full rounded-full bg-[#7000FF]"></div>
                                    <div className="h-2 w-full rounded-full bg-[#7000FF]"></div>
                                    <div className="h-2 w-full rounded-full bg-[#7000FF]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Highlights of your plan (Vertical) */}
                <div className="p-6 pb-8 border-b-8 border-slate-50">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Highlights of your plan</h2>
                    <div className="grid gap-4">
                        <img src="/hp1.png" alt="Highlight 1" className="w-full rounded-2xl shadow-sm border border-slate-100" />
                        <img src="/hp2.jpg" alt="Highlight 2" className="w-full rounded-2xl shadow-sm border border-slate-100" />
                        <img src="/hp3.png" alt="Highlight 3" className="w-full rounded-2xl shadow-sm border border-slate-100" />
                        <img src="/hp4.png" alt="Highlight 4" className="w-full rounded-2xl shadow-sm border border-slate-100" />
                    </div>
                </div>

                {/* 5. Goal & Match */}
                <div className="p-6 border-b-8 border-slate-50">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Goal */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                            <div className="w-10 h-10 bg-white text-slate-700 rounded-full flex items-center justify-center mb-2 shadow-sm border border-slate-50">
                                <Target size={20} strokeWidth={1.5} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your hair goal</span>
                            <span className="font-bold text-slate-800 text-xs leading-tight">Healthy, Strong Hair</span>
                        </div>

                        {/* Match */}
                        <div className="bg-gradient-to-b from-purple-50 to-white p-4 rounded-2xl border border-purple-100 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-[#7000FF]/5 rounded-bl-full -mr-3 -mt-3"></div>
                            <div className="w-10 h-10 bg-[#7000FF]/10 text-[#7000FF] rounded-full flex items-center justify-center mb-2">
                                <ChartBar size={20} strokeWidth={2} />
                            </div>
                            <span className="text-[9px] font-bold text-[#7000FF]/60 uppercase tracking-widest mb-1">Plan fit for you</span>
                            <span className="font-bold text-[#7000FF] text-xs leading-tight">Personalized Match: 96%</span>
                        </div>
                    </div>
                </div>

                {/* 6. Promo Code & Plans Section (First Instance) */}
                <div id="plans-section" className="px-6 pb-6 pt-2 bg-slate-50">
                    <PlansSection />
                    <TrustAndGuarantee />
                </div>

                {/* === NEW SECTIONS === */}

                {/* 7. Discover your best haircare matches */}
                <div className="p-6 border-b-8 border-slate-50 bg-white">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center leading-tight">Discover your best<br />haircare matches</h2>
                    <img src="/DM.png" alt="Product Matches" className="w-full rounded-xl shadow-sm" />
                </div>

                {/* 8. Other products that fit your hair (OP Placeholder) */}
                <div className="p-6 border-b-8 border-slate-50 bg-white">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Other products that fit your hair</h2>
                        <p className="text-slate-500 text-sm">Check out products that match your hair type best with the product scanner</p>
                    </div>
                    {/* Placeholder for OP.png as requested */}
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
                        <span className="text-xs font-medium">Product Scanner Visual (OP.png)</span>
                    </div>
                </div>

                {/* 9. Results that makes us proud (Testimonials Carousel) */}
                <div className="p-6 border-b-8 border-slate-50 bg-white">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Results that makes us proud</h2>

                    {/* Reused Carousel Logic */}
                    <div className="w-full flex flex-col space-y-4">
                        <div className="w-full h-56 md:h-64 rounded-2xl overflow-hidden shadow-md bg-slate-100 shrink-0 relative">
                            {/* Display current testimonial image */}
                            <img
                                src={testimonials[testimonialIndex]?.beforeImage}
                                alt={testimonials[testimonialIndex]?.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-base font-bold text-slate-900">
                                        {testimonials[testimonialIndex]?.name}, {testimonials[testimonialIndex]?.age}
                                    </div>
                                    <div className="bg-[#7000FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                        {testimonials[testimonialIndex]?.timeframe}
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Check size={10} strokeWidth={3} />
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                        "{testimonials[testimonialIndex]?.result}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center space-x-1.5 pt-1">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setTestimonialIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === testimonialIndex ? 'w-6 bg-[#7000FF]' : 'w-1.5 bg-slate-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. Frequently Asked Questions */}
                <div className="p-6 border-b-8 border-slate-50 bg-white">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-4 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-sm text-slate-800 pr-4">{faq.question}</span>
                                    {openFaqIndex === index ? (
                                        <ChevronUp size={18} className="text-[#7000FF] shrink-0" />
                                    ) : (
                                        <ChevronDown size={18} className="text-slate-400 shrink-0" />
                                    )}
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 bg-white border-none">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. Users love our plans */}
                <div className="p-6 border-b-8 border-slate-50 bg-white">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Users love our plans</h2>
                    <div className="space-y-6">
                        <img src="/C1.png" alt="Beauty Plan Award" className="w-full" />
                        <div className="flex flex-col gap-4">
                            <img src="/RW1.png" alt="Review 1" className="w-full rounded-xl shadow-sm border border-slate-100" />
                            <img src="/RW2.png" alt="Review 2" className="w-full rounded-xl shadow-sm border border-slate-100" />
                            <img src="/RW3.png" alt="Review 3" className="w-full rounded-xl shadow-sm border border-slate-100" />
                        </div>
                    </div>
                </div>

                {/* 12. Final CTA Section */}
                <div className="pt-8 pb-10 bg-slate-50">
                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-6 px-6">
                        (Name),<br />your personal plan is ready!
                    </h2>

                    {/* Re-render Goal & Match */}
                    <div className="px-6 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                                <div className="w-10 h-10 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-2 shadow-sm border border-white">
                                    <Target size={20} strokeWidth={1.5} />
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your hair goal</span>
                                <span className="font-bold text-slate-800 text-xs leading-tight">Healthy, Strong Hair</span>
                            </div>
                            <div className="bg-gradient-to-b from-purple-50 to-white p-4 rounded-2xl border border-purple-100 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-12 h-12 bg-[#7000FF]/5 rounded-bl-full -mr-3 -mt-3"></div>
                                <div className="w-10 h-10 bg-[#7000FF]/10 text-[#7000FF] rounded-full flex items-center justify-center mb-2">
                                    <ChartBar size={20} strokeWidth={2} />
                                </div>
                                <span className="text-[9px] font-bold text-[#7000FF]/60 uppercase tracking-widest mb-1">Plan fit for you</span>
                                <span className="font-bold text-[#7000FF] text-xs leading-tight">Personalized Match: 96%</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6">
                        <PlansSection />
                        <TrustAndGuarantee />
                    </div>
                </div>

            </div>
        </div>
    );
};
