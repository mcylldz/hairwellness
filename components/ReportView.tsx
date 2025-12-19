import React from 'react';
import { Lock, Droplets, Sparkles, Scissors, Zap, Snowflake, Sprout, ChevronDown, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ReportViewProps {
   data: AnalysisResult | null;
   onUnlock: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ data, onUnlock }) => {
   if (!data) return null;

   const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

   const renderLockedMetric = (icon: React.ReactNode, label: string) => (
      <button
         onClick={onUnlock}
         className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-start w-full transition-all active:scale-[0.98] group"
      >
         <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center space-x-2 text-slate-400 font-medium">
               {icon}
               <span>{label}</span>
            </div>
            <Lock className="w-4 h-4 text-cyan-300 group-hover:text-cyan-500 transition-colors" />
         </div>
         <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden flex space-x-1">
            <div className="h-full w-1/3 bg-slate-200" />
            <div className="h-full w-1/4 bg-slate-100" />
         </div>
      </button>
   );

   return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-32">
         {/* Header */}
         <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 px-6 py-4 flex justify-between items-center border-b border-slate-100 font-sans">
            <div>
               <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Your Hair Report</p>
               <h1 className="text-xl font-bold">{currentDate}</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
               <img src="/image_4.png" alt="User" className="w-full h-full object-cover" />
            </div>
         </div>

         <div className="px-6 py-6 space-y-8 font-sans">

            {/* 12-Week Plan (Locked) */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-cyan-100 border border-cyan-50 group">
               {/* Background Decorative Gradient */}
               <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-100/50 blur-3xl transition-all group-hover:scale-150 duration-700" />
               <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-blue-50/50 blur-3xl transition-all group-hover:scale-150 duration-700" />

               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 shadow-inner">
                     <Lock className="h-8 w-8" />
                  </div>

                  <span className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                     12-Week Transformation Plan
                  </span>

                  <h3 className="mb-4 text-3xl font-black text-slate-900 leading-tight">
                     Your Routine is<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Locked</span>
                  </h3>

                  <p className="mb-8 max-w-[240px] text-sm font-medium text-slate-400 leading-relaxed">
                     Unlock your day-by-day roadmap, personalized product list, and expert growth guides.
                  </p>

                  <button
                     onClick={onUnlock}
                     className="group/btn relative w-full overflow-hidden rounded-full bg-cyan-500 p-[2px] transition-all hover:shadow-cyan-200 active:scale-95 shadow-xl shadow-cyan-100/50"
                  >
                     <div className="relative z-10 rounded-full bg-cyan-500 px-8 py-4 text-base font-black uppercase tracking-widest text-white transition-colors group-hover/btn:bg-transparent">
                        Reveal My Plan
                     </div>
                  </button>
               </div>

               {/* Mock Content underneath for depth */}
               <div className="mt-8 space-y-4 blur-[4px] pointer-events-none opacity-10 select-none">
                  {[1, 2].map(i => (
                     <div key={i} className="flex items-start space-x-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />
                        <div className="flex-1 space-y-2 py-1">
                           <div className="h-3 w-24 bg-slate-200 rounded" />
                           <div className="h-2 w-full bg-slate-100 rounded" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Core Insights (Open) */}
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4">Core Insights</h3>
               <div className="grid grid-cols-1 gap-4">

                  {/* Wellness Score */}
                  <div className="bg-red-50 rounded-2xl p-5 border border-red-100 shadow-sm">
                     <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                           <Sprout className="w-5 h-5 text-green-600" />
                           <span className="font-semibold text-slate-900">Health Score</span>
                        </div>
                     </div>
                     <div className="relative h-3 w-full bg-white rounded-full mb-2 overflow-hidden">
                        <div className="absolute h-full bg-red-500 rounded-full" style={{ width: `${data.hairWellnessScore}%` }} />
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-900">{data.hairWellnessScore}/100</span>
                        <span className="text-red-500">{data.hairWellnessLabel}</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 shadow-sm">
                        <p className="text-[10px] uppercase font-bold text-blue-400 mb-1">Porosity</p>
                        <p className="text-lg font-bold text-blue-700">{data.porosity}</p>
                     </div>
                     <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 shadow-sm">
                        <p className="text-[10px] uppercase font-bold text-orange-400 mb-1">Texture</p>
                        <p className="text-lg font-bold text-orange-700">{data.textureLabel}</p>
                     </div>
                  </div>

               </div>
            </div>

            {/* Detailed Health Markers (Locked) */}
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 font-black">Detailed Indicators</h3>
               <div className="grid grid-cols-2 gap-4">
                  {renderLockedMetric(<div className="w-4 h-4 bg-amber-700 rounded-sm"></div>, "Density")}
                  {renderLockedMetric(<div className="w-4 h-4 bg-red-500 rounded-full"></div>, "Volume")}
                  {renderLockedMetric(<Sparkles className="w-4 h-4 text-yellow-500" />, "Shine")}
                  {renderLockedMetric(<Scissors className="w-4 h-4 text-slate-400" />, "Split Ends")}
                  {renderLockedMetric(<Zap className="w-4 h-4 text-yellow-500" />, "Frizz")}
                  {renderLockedMetric(<Snowflake className="w-4 h-4 text-cyan-300" />, "Flakiness")}
                  {renderLockedMetric(<Sprout className="w-4 h-4 text-green-500" />, "Scalp Health")}
                  {renderLockedMetric(<Lock className="w-4 h-4 text-slate-400" />, "Coverage")}
               </div>
            </div>

            {/* Expert Summary */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
               <h4 className="text-cyan-400 font-bold mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Expert Summary</span>
               </h4>
               <p className="text-slate-300 text-sm leading-relaxed italic pr-4">
                  "{data.summary}"
               </p>
            </div>

            {/* Bottom CTA */}
            <button
               onClick={onUnlock}
               className="w-full bg-[#00E5FF] hover:bg-cyan-500 text-white font-black text-lg py-5 rounded-full shadow-2xl shadow-cyan-100 transition-all flex items-center justify-center space-x-2"
            >
               <CheckCircle className="w-6 h-6" />
               <span>Get Full PRO Analysis</span>
            </button>

         </div>
      </div>
   );
};