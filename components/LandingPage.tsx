import React from 'react';
import { AnalyticsService } from '../services/analytics';

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    const handleStart = () => {
        // Track landing page conversion
        AnalyticsService.logEvent('landing_page_continue');
        onStart();
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start px-6 pt-8 pb-12">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Main Heading - Reduced top padding */}
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                        GET YOUR PERSONAL<br />HAIR CARE PLAN
                    </h1>
                    {/* Subtitle closer to main heading */}
                    <p className="text-lg text-slate-600 font-medium pt-1">
                        according to your hair type and goals
                    </p>
                </div>

                {/* Quiz Badge - No bg/border, closer to subtitle */}
                <div className="pt-2">
                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                        START 1-MINUTE QUIZ
                    </span>
                </div>

                {/* Hero Image - No shadow, no effects */}
                <div className="w-full overflow-hidden">
                    <img
                        src="/hero-image.jpg"
                        alt="Hair Care Benefits"
                        className="w-full h-auto"
                    />
                </div>

                {/* Continue Button - Reduced radius */}
                <button
                    onClick={handleStart}
                    className="w-full bg-[#7000FF] hover:bg-[#6000dd] text-white font-bold text-xl py-5 rounded-2xl transition-all transform active:scale-[0.98] uppercase tracking-wide"
                >
                    CONTINUE
                </button>
            </div>
        </div>
    );
};
