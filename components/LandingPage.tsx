import React from 'react';

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Main Heading */}
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                        GET YOUR PERSONAL<br />HAIR CARE PLAN
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        according to your hair type and goals
                    </p>
                </div>

                {/* Quiz Badge */}
                <div className="inline-block">
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-full px-6 py-2">
                        <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                            START 1-MINUTE QUIZ
                        </span>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="/hero-image.jpg"
                        alt="Hair Care Benefits"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Continue Button */}
                <button
                    onClick={onStart}
                    className="w-full bg-[#7000FF] hover:bg-[#6000dd] text-white font-bold text-xl py-5 rounded-full shadow-lg shadow-purple-500/30 transition-all transform active:scale-[0.98] uppercase tracking-wide"
                >
                    CONTINUE
                </button>
            </div>
        </div>
    );
};
