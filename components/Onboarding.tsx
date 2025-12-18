import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Wheat, ImageOff } from 'lucide-react';
import { ONBOARDING_SLIDES } from '../constants';
import { OnboardingProps } from '../types';

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Reset error state when slide changes
  useEffect(() => {
    setImgError(false);
  }, [currentSlideIndex]);

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden text-slate-900">
      
      {/* Top Trust Badge */}
      <div className="pt-6 px-6 flex flex-col items-center justify-center space-y-1 shrink-0">
        <div className="flex items-center space-x-2 text-cyan-600">
           <Wheat className="w-4 h-4 -scale-x-100" /> 
           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Trusted by 100k+ users</span>
           <Wheat className="w-4 h-4" />
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-cyan-500 text-cyan-500" />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-6 pt-4 min-h-0">
        
        {/* Header Text */}
        <div className="text-center mb-2 shrink-0 z-10">
          <h1 className="text-2xl font-bold leading-tight mb-2">
            {currentSlide.title}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            {currentSlide.description}
          </p>
        </div>

        {/* Dynamic Image Area */}
        <div className="flex-1 w-full relative flex items-center justify-center min-h-0 py-4">
          <div className="h-full w-auto aspect-[9/16] bg-slate-100 rounded-[2rem] border-4 border-slate-50 shadow-xl overflow-hidden flex items-center justify-center relative max-w-full">
             {!imgError ? (
               <img 
                 key={currentSlide.imageSrc} 
                 src={currentSlide.imageSrc} 
                 alt={currentSlide.imageAlt}
                 className="w-full h-full object-cover"
                 onError={() => setImgError(true)}
               />
             ) : (
               <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400 bg-slate-50 w-full h-full">
                  <ImageOff className="w-12 h-12 mb-4 opacity-50" />
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest border border-slate-300 rounded px-2 py-1 inline-block">
                      Visual Not Found
                  </div>
                  <p className="text-xs px-2 mb-2">
                      {currentSlide.imageAlt}
                  </p>
                  <p className="text-[10px] text-red-400 bg-red-50 px-2 py-1 rounded">
                    Missing: {currentSlide.imageSrc}
                  </p>
               </div>
             )}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mb-4 shrink-0">
          {ONBOARDING_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlideIndex 
                  ? 'w-6 bg-cyan-500' 
                  : 'w-1.5 bg-cyan-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="px-6 pb-8 pt-0 bg-white shrink-0">
        <button
          onClick={handleNext}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 rounded-full shadow-lg shadow-cyan-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};