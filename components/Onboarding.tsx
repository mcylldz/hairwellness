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
    <div className="fixed inset-0 w-full flex flex-col bg-white text-slate-900 safe-area-pb">
      {/* Top Trust Badge - Compact */}
      <div className="pt-2 px-6 flex flex-col items-center justify-center space-y-0.5 shrink-0 z-10">
        <div className="flex items-center space-x-1.5 text-cyan-600">
          <Wheat className="w-3 h-3 -scale-x-100" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">100k+ Users</span>
          <Wheat className="w-3 h-3" />
        </div>
        <div className="flex space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-2.5 h-2.5 fill-cyan-500 text-cyan-500" />
          ))}
        </div>
      </div>

      {/* Main Content - Tightly packed */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full relative">
        {/* Image - Constrained Height */}
        <div className="w-full relative flex items-center justify-center h-[45vh] max-h-[400px] shrink-0">
          {!imgError ? (
            <img
              key={currentSlide.imageSrc}
              src={currentSlide.imageSrc}
              alt={currentSlide.imageAlt}
              className="max-w-full max-h-full object-contain drop-shadow-sm p-4"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400 bg-slate-50 w-64 h-64 rounded-2xl mx-auto">
              <ImageOff className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-[10px] font-medium opacity-50">Visual Placeholder</p>
            </div>
          )}
        </div>

        {/* Text Content - Compact */}
        <div className="text-center px-6 mt-2 shrink-0 max-w-sm mx-auto">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2 text-slate-900">
            {currentSlide.title}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Bottom Section - Pinned */}
      <div className="flex flex-col items-center w-full px-6 pb-6 pt-2 shrink-0 bg-white">
        {/* Dots */}
        <div className="flex justify-center space-x-1.5 mb-4">
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

        {/* Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-sm bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-3.5 rounded-full shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};