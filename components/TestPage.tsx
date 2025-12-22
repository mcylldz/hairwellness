import React, { useState, useEffect } from 'react';
import { Target, ChartBar, Shield, Check, Clock, Lock } from 'lucide-react';

export const TestPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const formatTimeVerbose = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} minutes ${secs} seconds`;
    }

    const [selectedPlan, setSelectedPlan] = useState<'1-week' | '4-week' | '12-week'>('4-week');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* 1. Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#7000FF] text-white py-3 px-4 shadow-md flex justify-between items-center transition-all duration-300">
                <div className="text-sm font-medium">
                    <span className="font-bold">60% discount</span> reserved for <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded ml-1 tabular-nums">{formatTime(timeLeft)}</span>
                </div>
                <button
                    onClick={() => document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white text-[#7000FF] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide hover:bg-slate-100 transition-colors shadow-sm"
                >
                    Get my plan
                </button>
            </div>

            <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">

                {/* 2. Hero Section (Before/After) */}
                <div className="relative group">
                    <img src="/before-after.jpg" alt="Hair Transformation Before and After" className="w-full object-cover aspect-[4/3]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 text-[10px] rounded-full uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20">Before</div>
                    <div className="absolute bottom-4 right-4 bg-[#7000FF]/90 text-white px-3 py-1 text-[10px] rounded-full uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20 shadow-lg shadow-purple-500/30">After 3 Months</div>
                </div>

                {/* 3. Grid Analysis */}
                <div className="p-0 border-b-8 border-slate-50">
                    {/* Top Row */}
                    <div className="flex border-b border-gray-100">
                        <div className="w-1/2 p-6 border-r border-gray-100 flex flex-col items-center text-center justify-center min-h-[140px]">
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">NOW</span>
                            <span className="text-slate-800 font-bold text-lg leading-tight">Hair health<br />problems</span>
                        </div>
                        <div className="w-1/2 p-6 flex flex-col items-center text-center justify-center min-h-[140px] bg-purple-50/20">
                            <span className="text-[#7000FF] text-[10px] font-bold uppercase tracking-widest mb-3">GOAL</span>
                            <span className="text-[#7000FF] font-black text-lg leading-tight">Optimized<br />Hair health</span>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex">
                        {/* Bottom Left */}
                        <div className="w-1/2 p-6 border-r border-gray-100 flex flex-col justify-center items-center min-h-[140px]">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-4 text-center leading-tight">Hair care routine<br />effectiveness</h3>
                            <div className="flex gap-1.5 justify-center">
                                <div className="h-2 w-8 rounded-full bg-red-400"></div>
                                <div className="h-2 w-8 rounded-full bg-slate-100"></div>
                                <div className="h-2 w-8 rounded-full bg-slate-100"></div>
                            </div>
                        </div>
                        {/* Bottom Right */}
                        <div className="w-1/2 p-6 flex flex-col justify-center items-center min-h-[140px] bg-purple-50/20">
                            <h3 className="text-[10px] font-bold text-[#7000FF] uppercase tracking-wide mb-4 text-center leading-tight">Optimized hair routine<br />effectiveness</h3>
                            <div className="flex gap-1.5 justify-center">
                                <div className="h-2 w-8 rounded-full bg-[#7000FF]"></div>
                                <div className="h-2 w-8 rounded-full bg-[#7000FF]"></div>
                                <div className="h-2 w-8 rounded-full bg-[#7000FF]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Highlights of your plan */}
                <div className="p-6 pb-8 border-b-8 border-slate-50">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Highlights of your plan</h2>
                    <div className="grid gap-4">
                        <img src="/hp1.png" alt="Highlight 1" className="w-full rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300" />
                        <img src="/hp2.jpg" alt="Highlight 2" className="w-full rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300" />
                        <img src="/hp3.png" alt="Highlight 3" className="w-full rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300" />
                        <img src="/hp4.png" alt="Highlight 4" className="w-full rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300" />
                    </div>
                </div>

                {/* 5. Goal & Match */}
                <div className="p-6 border-b-8 border-slate-50">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Goal */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                            <div className="w-12 h-12 bg-white text-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-50">
                                <Target size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your hair goal</span>
                            <span className="font-bold text-slate-800 text-sm leading-tight">Healthy, Strong Hair</span>
                        </div>

                        {/* Match */}
                        <div className="bg-gradient-to-b from-purple-50 to-white p-5 rounded-2xl border border-purple-100 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#7000FF]/5 rounded-bl-full -mr-4 -mt-4"></div>
                            <div className="w-12 h-12 bg-[#7000FF]/10 text-[#7000FF] rounded-full flex items-center justify-center mb-4">
                                <ChartBar size={24} strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-bold text-[#7000FF]/60 uppercase tracking-widest mb-2">Plan fit for you</span>
                            <span className="font-bold text-[#7000FF] text-sm leading-tight">Personalized Match: 96%</span>
                        </div>
                    </div>
                </div>

                {/* 6. Promo Code & Plans Section */}
                <div id="plans-section" className="p-6 bg-slate-50">

                    {/* Promo Banner */}
                    <div className="bg-[#DCFCE7] border border-green-200 rounded-xl p-5 mb-8 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-200/50 rounded-full blur-xl"></div>
                        <h3 className="font-bold text-green-800 text-center mb-4 text-sm uppercase tracking-wide">Your promo code applied!</h3>
                        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-100">
                            <div className="flex items-center gap-2.5 text-green-700 font-bold text-sm">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="tracking-wide">Can_Dec25</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-800 font-mono font-medium text-sm tabular-nums">
                                <Clock size={14} className="animate-pulse" />
                                <span>{formatTimeVerbose(timeLeft)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Plans */}
                    <div className="space-y-4 mb-8">

                        {/* 1-Week Plan */}
                        <div
                            onClick={() => setSelectedPlan('1-week')}
                            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === '1-week' ? 'border-slate-800 bg-white shadow-md transform scale-[1.01]' : 'border-gray-200 bg-white hover:border-gray-300 opacity-80 hover:opacity-100'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === '1-week' ? 'border-slate-800' : 'border-gray-300'}`}>
                                        {selectedPlan === '1-week' && <div className="w-3 h-3 rounded-full bg-slate-800" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">1-Week Plan</h3>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">Short trial</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-slate-900 text-xl">€10.49</div>
                                    <div className="text-xs text-slate-400 line-through font-medium">€59.99</div>
                                </div>
                            </div>
                            <div className="mt-3 ml-10 text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2.5 py-1 rounded-md">
                                €1.49 per day
                            </div>
                        </div>


                        {/* 4-Week Plan (Most Popular) */}
                        <div
                            onClick={() => setSelectedPlan('4-week')}
                            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === '4-week' ? 'border-[#7000FF] bg-[#F7F2FF] shadow-xl shadow-purple-100 scale-[1.02] z-10' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                        >
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#7000FF] text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md flex items-center gap-1">
                                <Star size={10} fill="currentColor" /> Most Popular
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === '4-week' ? 'border-[#7000FF]' : 'border-gray-300'}`}>
                                        {selectedPlan === '4-week' && <div className="w-3 h-3 rounded-full bg-[#7000FF]" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">4-Week Plan</h3>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">Best value standard</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-slate-900 text-2xl">€19.99</div>
                                    <div className="text-sm text-slate-400 line-through font-medium">€59.99</div>
                                </div>
                            </div>
                            <div className="mt-3 ml-10 text-xs font-bold text-[#7000FF] bg-white inline-block px-3 py-1.5 rounded-md border border-[#7000FF]/10 shadow-sm">
                                €0.71 per day
                            </div>
                        </div>

                        {/* 12-Week Plan */}
                        <div
                            onClick={() => setSelectedPlan('12-week')}
                            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === '12-week' ? 'border-slate-800 bg-white shadow-md transform scale-[1.01]' : 'border-gray-200 bg-white hover:border-gray-300 opacity-80 hover:opacity-100'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === '12-week' ? 'border-slate-800' : 'border-gray-300'}`}>
                                        {selectedPlan === '12-week' && <div className="w-3 h-3 rounded-full bg-slate-800" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">12-Week Plan</h3>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">Maximum savings</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-slate-900 text-xl">€34.99</div>
                                    <div className="text-xs text-slate-400 line-through font-medium">€105.99</div>
                                </div>
                            </div>
                            <div className="mt-3 ml-10 text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2.5 py-1 rounded-md">
                                €0.42 per day
                            </div>
                        </div>

                    </div>

                    {/* Guarantee */}
                    <div className="flex items-center justify-center gap-2.5 text-slate-600 mb-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <Shield className="fill-slate-100 text-slate-400" size={20} strokeWidth={1.5} />
                        <span className="text-sm font-semibold tracking-tight">30-day money-back guarantee</span>
                    </div>

                    {/* Scientific Backing */}
                    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 mb-8 text-center relative">
                        <div className="text-blue-200 absolute top-2 left-4 text-4xl font-serif">"</div>
                        <p className="text-blue-900 font-semibold text-sm leading-relaxed mb-3 px-4 relative z-10">
                            People using plan for 12 weeks achieve twice as many results as for 4 weeks
                        </p>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                            *According to a research by MaxBeauty, 2025
                        </p>
                    </div>

                    {/* Main CTA */}
                    <button className="w-full bg-[#7000FF] text-white font-extrabold text-lg py-4 rounded-full shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:bg-[#6000dd] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 mb-6 flex items-center justify-center gap-2">
                        <span>GET MY PLAN</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>

                    {/* Fine Print */}
                    <div className="text-[10px] text-slate-400 text-center leading-relaxed mb-8 px-2 max-w-xs mx-auto">
                        <p className="mb-3">
                            By continuing, you agree to our Terms of Service and Subscription Policy.
                            Your subscription will automatically renew at the selected plan's regular price
                            <span className="font-medium text-slate-500"> (1-Week: €59.90, 4-Week: €79.90, 12-Week: €105.90)</span> unless cancelled at least 24 hours
                            before the end of the current period.
                        </p>
                        <p>
                            Cancel anytime via <a href="mailto:support@mesullc.com" className="text-slate-500 hover:underline">support@mesullc.com</a>.
                        </p>
                    </div>

                    {/* Trust Element */}
                    <div className="flex flex-col items-center justify-center text-slate-300 gap-2 pb-8">
                        <Lock size={14} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pay safe & secure</span>
                    </div>

                </div>
            </div>
        </div>
    );
};
