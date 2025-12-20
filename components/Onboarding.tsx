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
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden text-slate-900 safe-area-pb">

      {/* Top Trust Badge */}
      <div className="pt-4 px-6 flex flex-col items-center justify-center space-y-1 shrink-0">
        <div className="flex items-center space-x-2 text-cyan-600">
          <Wheat className="w-3 h-3 -scale-x-100" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Trusted by 100k+ users</span>
          <Wheat className="w-3 h-3" />
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-cyan-500 text-cyan-500" />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-6 pt-2 min-h-0 justify-between">

        {/* Content Wrapper for centering */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          {/* Image Section - Flexible but constrained */}
          <div className="flex-1 w-full relative flex items-center justify-center min-h-0 py-4 max-h-[60vh]">
            <div className="h-full w-full flex items-center justify-center relative">
              {!imgError ? (
                <img
                  key={currentSlide.imageSrc}
                  src={currentSlide.imageSrc}
                  alt={currentSlide.imageAlt}
                  className="max-w-full max-h-full object-contain drop-shadow-sm"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400 bg-slate-50 w-full h-full rounded-2xl">
                  <ImageOff className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-[10px] font-medium opacity-50">Visual Placeholder</p>
                </div>
              )}
            </div>
          </div>

          {/* Header Text - Compact */}
          <div className="text-center mb-6 shrink-0 z-10 px-2 mt-4">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2 text-slate-900">
              {currentSlide.title}
            </h1>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto font-medium">
              {currentSlide.description}
            </p>
          </div>
        </div>


        {/* Pagination Dots */}
        <div className="flex justify-center space-x-1.5 mb-6 shrink-0">
          {ONBOARDING_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlideIndex
                ? 'w-6 bg-cyan-500'
                : 'w-1.5 bg-cyan-100'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="px-6 pb-8 pt-0 bg-white shrink-0">
        <button
          onClick={handleNext}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-3.5 rounded-full shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};