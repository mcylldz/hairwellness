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
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
               <div className="flex items-center space-x-2 mb-4 text-cyan-600 font-bold">
                  <Lock className="w-5 h-5" />
                  <span>12-Week Transformation Plan</span>
               </div>

               <div className="space-y-4 blur-[3px] pointer-events-none opacity-40">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="border-l-2 border-slate-200 pl-4 py-1">
                        <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
                        <div className="h-2 w-full bg-slate-100 rounded" />
                     </div>
                  ))}
               </div>

               <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-black text-slate-900 mb-2">Routine Locked</h3>
                  <p className="text-sm text-slate-500 mb-6">Unlock to see your day-by-day roadmap and product recommendations.</p>
                  <button
                     onClick={onUnlock}
                     className="bg-cyan-500 text-white font-black py-4 px-10 rounded-full shadow-lg shadow-cyan-100 active:scale-95 transition-all text-sm uppercase tracking-wider"
                  >
                     Reveal My Plan
                  </button>
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