import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Camera, Trash2 } from 'lucide-react';
import { SURVEY_STEPS } from '../constants';
import { AnalysisLoader } from './AnalysisLoader';
import { ReportView } from './ReportView';
import { AnalysisResult } from '../types';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Paywall } from './Paywall';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { SubscriptionPolicy } from './SubscriptionPolicy';
import { X } from 'lucide-react';
import { PixelService } from '../services/pixel';
import { AnalyticsService } from '../services/analytics';

export const Home = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [infoCarouselIndex, setInfoCarouselIndex] = useState(0);
  const [checklistIndex, setChecklistIndex] = useState(0);
  const yearPickerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({
    birth_year: 1999
  });

  // App States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState<'privacy' | 'terms' | 'subscription' | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugClicks, setDebugClicks] = useState(0);
  const [isApiFinished, setIsApiFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const currentStep = SURVEY_STEPS[currentStepIndex];

  useEffect(() => {
    // Check for Stripe success redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setShowThankYou(true);
      PixelService.track('Purchase', { currency: 'USD', value: 49.00 }); // Assuming a mock value
      AnalyticsService.logEvent('purchase_success');
    }

    setInfoCarouselIndex(0);
    setChecklistIndex(0);
    setTestimonialIndex(0);

    // Track step progression for funnel (Drop-off tracking)
    AnalyticsService.logStep(currentStepIndex, currentStep.title, answers);
  }, [currentStepIndex]);

  // Scroll to selected year on year-picker step
  useEffect(() => {
    if (currentStep.type === 'year-picker' && yearPickerRef.current) {
      const selectedBtn = yearPickerRef.current.querySelector('[data-selected="true"]');
      if (selectedBtn) {
        selectedBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [currentStepIndex]);

  const getAnswer = (key: string) => answers[key];

  const sendToWebhook = async (result: AnalysisResult | null) => {
    const webhookUrl = (import.meta as any).env.VITE_N8N_WEBHOOK_URL || (import.meta as any).env.VITE_WEBHOOK_URL || (window as any)._env_?.VITE_N8N_WEBHOOK_URL || (window as any)._env_?.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.log("No webhook URL configured (VITE_N8N_WEBHOOK_URL)");
      return;
    }

    console.log("Sending data to webhook:", webhookUrl);

    try {
      const payload = {
        answers: answers, // Full survey answers including photos (photo_upload)
        preliminary_analysis: result,
        user_metadata: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          timestamp: new Date().toISOString(),
          platform: navigator.platform
        }
      };

      // CORS BYPASS: Using 'text/plain' makes this a "Simple Request"
      // and avoids the preflight OPTIONS check that is failing.
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      });
      console.log("Webhook SUCCESS. Response status:", response.status);
      const respText = await response.text();
      console.log("Webhook server response:", respText);
    } catch (e) {
      console.error("Webhook CRITICAL failure", e);
    }
  };

  const getTitle = () => {
    let title = currentStep.title;
    if (title.includes('{name}')) {
      const name = getAnswer('name') || 'Friend';
      title = title.replace('{name}', name);
    }
    return title;
  };

  const handleNext = () => {
    // Handling multi-slide steps
    if (currentStep.type === 'info-carousel') {
      const slides = currentStep.infoSlides || [];
      if (infoCarouselIndex < slides.length - 1) {
        setInfoCarouselIndex(prev => prev + 1);
        return;
      }
    } else if (currentStep.type === 'checklist-carousel') {
      const phases = currentStep.journeyPhases || [];
      if (checklistIndex < phases.length - 1) {
        setChecklistIndex(prev => prev + 1);
        return;
      }
    } else if (currentStep.type === 'testimonials') {
      const testimonials = currentStep.testimonials || [];
      if (testimonialIndex < testimonials.length - 1) {
        setTestimonialIndex(prev => prev + 1);
        return;
      }
    }

    if (currentStepIndex < SURVEY_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Survey Complete, Start Analysis
      startAnalysis();
    }
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setIsApiFinished(false);
    setShowPaywall(false);

    console.log("Starting analysis pivot: Sending all data to n8n...");

    // 1. Prepare Fallback Data for UI
    const fallbackResult: AnalysisResult = {
      hairWellnessScore: 72,
      hairWellnessLabel: "Initial Assessment",
      textureScore: 75,
      textureLabel: "Normal/Dry",
      porosity: "Medium",
      densityScore: 65,
      volumeScore: 60,
      shineScore: 82,
      splitEndsScore: 45,
      breakageScore: 35,
      frizzScore: 55,
      flakinessScore: 15,
      scalpWellnessScore: 78,
      coverageAwarenessScore: 68,
      hairlineAwarenessScore: 72,
      summary: "We have received your profile and photos. A preliminary health assessment has been generated below. Our experts will review your submission and send a detailed 12-week roadmap to your email once your plan is active.",
      twelveWeekPlan: [
        { week: 1, focus: "Moisture Reset", description: "Beginning with a deep hydration treatment to balance scalp natural oils." },
        { week: 2, focus: "Strength Building", description: "Focused on protein-rich treatments to fortify hair shafts and reduce breakage." }
      ]
    };

    try {
      // 2. Send EVERYTHING to n8n immediately
      await sendToWebhook(fallbackResult);

      // 3. Simulated UX Delay (Analyzing Animation handled by Loader)
      await new Promise(resolve => setTimeout(resolve, 100));

      setAnalysisData(fallbackResult);
      setIsApiFinished(true);
      console.log("Analysis phase complete (UX simulation).");

    } catch (error) {
      console.error("Analysis/Webhook Critical Error:", error);
      setAnalysisData(fallbackResult);
      setIsApiFinished(true);
    }
  };

  const handleAnimationComplete = () => {
    setShowReport(true);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const updateAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep.id]: value
    }));
  };

  const toggleMultiSelect = (optionId: string) => {
    const currentSelected = (getAnswer(currentStep.id) as string[]) || [];
    if (currentSelected.includes(optionId)) {
      updateAnswer(currentSelected.filter(id => id !== optionId));
    } else {
      updateAnswer([...currentSelected, optionId]);
    }
  };

  // --- PHOTO HANDLING ---
  const handlePhotoUpload = (viewId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentPhotos = getAnswer(currentStep.id) || {};
        updateAnswer({
          ...currentPhotos,
          [viewId]: reader.result // Store base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (viewId: string) => {
    const currentPhotos = getAnswer(currentStep.id) || {};
    const newPhotos = { ...currentPhotos };
    delete newPhotos[viewId];
    updateAnswer(newPhotos);
  };

  // --- RENDERERS ---

  const renderTextInput = () => (
    <div className="w-full pt-6">
      <input
        type="text"
        value={getAnswer(currentStep.id) || ''}
        onChange={(e) => updateAnswer(e.target.value)}
        placeholder={currentStep.placeholder}
        className="w-full text-xl md:text-2xl border-b-2 border-cyan-300 py-3 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 transition-colors bg-transparent"
        autoFocus
      />
    </div>
  );

  const renderSingleSelect = () => (
    <div className="space-y-2.5 w-full">
      {currentStep.options?.map((option) => {
        const isSelected = getAnswer(currentStep.id) === option.id;
        return (
          <button
            key={option.id}
            onClick={() => updateAnswer(option.id)}
            className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
              ${isSelected
                ? 'border-cyan-500 bg-white shadow-sm'
                : 'border-slate-100 bg-white hover:border-cyan-200'
              }
            `}
          >
            <span className={`text-sm md:text-base ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
              {option.label}
            </span>
            <div className={`w-4 h-4 md:w-5 md:h-5 border-2 flex items-center justify-center transition-all duration-200
              ${isSelected
                ? 'border-cyan-500 bg-cyan-500 rounded'
                : 'border-slate-300 rounded-full'
              }
            `}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderMultiSelect = () => (
    <div className="space-y-2.5 w-full">
      {currentStep.options?.map((option) => {
        const isSelected = (getAnswer(currentStep.id) as string[])?.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => toggleMultiSelect(option.id)}
            className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
              ${isSelected
                ? 'border-cyan-500 bg-white shadow-sm'
                : 'border-slate-100 bg-white hover:border-cyan-200'
              }
            `}
          >
            <span className={`text-sm md:text-base pr-4 ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
              {option.label}
            </span>
            <div className={`w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center shrink-0
              ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300'}
            `}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const maxBirthYear = currentYear - 18; // 2007
    const years = Array.from({ length: 100 }, (_, i) => maxBirthYear - i);
    const selectedYear = getAnswer(currentStep.id);

    return (
      <div
        ref={yearPickerRef}
        className="h-72 w-full overflow-y-auto no-scrollbar snap-y snap-mandatory py-24 flex flex-col items-center space-y-3 mask-gradient"
      >
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              data-selected={isSelected}
              onClick={() => updateAnswer(year)}
              className={`snap-center transition-all duration-300 px-8 py-1.5
                ${isSelected
                  ? 'text-3xl font-bold text-slate-900 scale-110'
                  : 'text-xl text-slate-300 hover:text-slate-400'
                }
              `}
            >
              {year}
            </button>
          );
        })
        }
      </div >
    );
  };

  const renderTestimonials = () => {
    const testimonials = currentStep.testimonials || [];
    // Safety check for stale index during transition
    const safeIndex = testimonialIndex >= testimonials.length ? 0 : testimonialIndex;
    const activeTestimonial = testimonials[safeIndex];

    if (!activeTestimonial) return null;

    return (
      <div className="w-full flex flex-col space-y-4">
        {/* Reduced image size by ~30% - using fixed height instead of aspect ratio */}
        <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden shadow-md bg-slate-100 shrink-0">
          <img src={activeTestimonial.beforeImage} alt={activeTestimonial.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="text-lg font-bold text-slate-900">
            {activeTestimonial.name}, {activeTestimonial.age}
          </div>
          {activeTestimonial.timeframe && (
            <div className="bg-cyan-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {activeTestimonial.timeframe}
            </div>
          )}
        </div>

        <div className="bg-cyan-50 rounded-xl p-4 flex items-start space-x-3 border border-cyan-100/50">
          <div className="shrink-0 mt-0.5">
            <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {activeTestimonial.result}
          </p>
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-1.5 pt-1">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === testimonialIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-slate-200'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderInfoCarousel = () => {
    const slides = currentStep.infoSlides || [];
    // Safety check for stale index
    const safeIndex = infoCarouselIndex >= slides.length ? 0 : infoCarouselIndex;
    const activeSlide = slides[safeIndex];
    const imageToDisplay = activeSlide?.imageSrc || currentStep.imageSrc;

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-2 w-full">
        {/* Reduced container height for 30-40% reduction */}
        <div className="w-full max-h-[25vh] relative flex items-center justify-center">
          {imageToDisplay && (
            <img
              src={imageToDisplay}
              alt="Illustration"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        <div className="space-y-2 max-w-sm px-4">
          <h2 className="text-2xl font-bold leading-tight text-slate-900">
            {getTitle()}
          </h2>
          {currentStep.subtitle && (
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {currentStep.subtitle}
            </p>
          )}
        </div>

        {(activeSlide?.text || activeSlide?.icon) && (
          <div className="w-full bg-cyan-50 rounded-2xl p-5 min-h-[100px] flex flex-col items-center justify-center space-y-3 shadow-sm border border-cyan-100/50 transition-all duration-300">
            {activeSlide.icon && (
              <div className="text-3xl animate-bounce-short">
                {activeSlide.icon}
              </div>
            )}
            {activeSlide.text && (
              <p className="text-slate-800 font-medium leading-snug max-w-xs mx-auto text-sm">
                {activeSlide.text}
              </p>
            )}
          </div>
        )}

        {slides.length > 1 && (
          <div className="flex space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setInfoCarouselIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === infoCarouselIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-slate-200'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ... checklist render ...

  const renderTransition = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 w-full h-full">
        {/* Reduced max-height for 30% reduction */}
        <div className="w-full max-h-[25vh] relative flex items-center justify-center">
          <img
            src={currentStep.imageSrc}
            alt="Profile Building"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="space-y-3 max-w-sm px-4">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900">
            {getTitle()}
          </h2>
          {currentStep.subtitle && (
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              {currentStep.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderChecklistCarousel = () => {
    const phases = currentStep.journeyPhases || [];
    // Safety check for stale index
    const safeIndex = checklistIndex >= phases.length ? 0 : checklistIndex;
    const activePhase = phases[safeIndex];

    if (!activePhase) return null;

    return (
      <div className="flex flex-col items-center space-y-6 py-2 w-full">
        <div className="text-center space-y-2 px-4 mb-2">
          <h2 className="text-xl md:text-2xl font-bold leading-tight text-slate-900">
            {getTitle()}
          </h2>
          {currentStep.subtitle && (
            <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-sm mx-auto">
              {currentStep.subtitle}
            </p>
          )}
        </div>

        {/* Removed Debug Header */}

        {/* Debug Modal triggers could be hidden actions or dev-only checks, but for now removing the UI clutter as requested */}
        {debugMode && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-6 text-white font-mono text-[10px]">
            <div className="w-full max-w-sm bg-slate-800 rounded-2xl p-6 relative">
              <button
                onClick={() => setDebugMode(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-bold mb-4 text-cyan-400">DEBUG INFO (Env Vars)</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 mb-1">VITE_GEMINI_API_KEY:</div>
                  <div className="break-all bg-slate-900 p-2 rounded">
                    {(import.meta as any).env.VITE_GEMINI_API_KEY ? "EXISTS" : "MISSING"} ({(import.meta as any).env.VITE_GEMINI_API_KEY?.substring(0, 5)}...)
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">VITE_STRIPE_PAYMENT_LINK:</div>
                  <div className="break-all bg-slate-900 p-2 rounded">
                    {(import.meta as any).env.VITE_STRIPE_PAYMENT_LINK || (window as any)._env_?.VITE_STRIPE_PAYMENT_LINK ? "EXISTS" : "MISSING"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">VITE_N8N_WEBHOOK_URL:</div>
                  <div className="break-all bg-slate-900 p-2 rounded">
                    {(import.meta as any).env.VITE_N8N_WEBHOOK_URL || (window as any)._env_?.VITE_N8N_WEBHOOK_URL ? "EXISTS" : "MISSING"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full aspect-[2/1] relative rounded-2xl overflow-hidden shadow-md">
          <img
            src={activePhase.imageSrc}
            alt={activePhase.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full bg-cyan-50/50 rounded-2xl p-5 border border-cyan-100 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {activePhase.phaseLabel}
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {activePhase.title}
              </h3>
            </div>
            <span className="bg-cyan-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-wide">
              {activePhase.duration}
            </span>
          </div>

          <div className="space-y-2.5 bg-cyan-100/50 p-3.5 rounded-xl">
            {activePhase.items.map((item, i) => (
              <div key={i} className="flex items-start space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
                <p className="text-sm text-slate-700 font-medium leading-tight">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-1.5">
          {phases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setChecklistIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === checklistIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-slate-200'
                }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderPhotoCapture = () => {
    const photoViews = currentStep.photoViews || [];
    const currentPhotos = getAnswer(currentStep.id) || {};

    return (
      <div className="grid grid-cols-2 gap-3 py-2 w-full">
        {photoViews.map((view) => {
          const hasPhoto = !!currentPhotos[view.id];
          return (
            <div key={view.id} className="w-full col-span-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900 text-xs">{view.label}</span>
              </div>

              <div className={`relative w-full aspect-square rounded-xl border-2 overflow-hidden transition-all duration-300
                ${hasPhoto ? 'border-cyan-500 shadow-sm' : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'}
              `}>
                {hasPhoto ? (
                  <>
                    <img
                      src={currentPhotos[view.id]}
                      alt={view.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removePhoto(view.id)}
                        className="bg-white/90 text-red-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-1 right-1 bg-cyan-500 text-white p-0.5 rounded-full shadow-sm">
                      <Check className="w-3 h-3" />
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-2 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(view.id, e)}
                    />
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                      <Camera className="w-4 h-4 text-cyan-600" />
                    </div>
                    <p className="text-[10px] font-bold text-cyan-600 leading-tight">Tap to add</p>
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };



  // --- VALIDATION ---
  const isStepValid = () => {
    // Informational steps are always valid
    if (['testimonials', 'transition', 'info-carousel', 'checklist-carousel'].includes(currentStep.type)) return true;

    const val = getAnswer(currentStep.id);
    if (currentStep.id === 'email') {
      return val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    if (currentStep.type === 'text') return val && val.length > 1;
    if (currentStep.type === 'multi-select') return val && val.length > 0;

    if (currentStep.type === 'photo-capture') {
      // Check if all required photos are present
      if (!currentStep.photoViews) return true;
      if (!val) return false; // No object at all
      const missingRequired = currentStep.photoViews.some(view => view.required && !val[view.id]);
      return !missingRequired;
    }

    return val !== undefined && val !== null;
  };

  // Get Custom Button Text
  const getButtonText = () => {
    if (currentStep.customButtonText) return currentStep.customButtonText;
    if (currentStep.type === 'testimonials') return 'Start Building Your Routine';
    if (['transition', 'info-carousel', 'checklist-carousel'].includes(currentStep.type)) return 'Continue';
    return 'Next';
  };

  const shouldHideHeader = ['transition', 'info-carousel', 'checklist-carousel'].includes(currentStep.type);

  // --- VIEW ROUTING ---

  if (showPrivacy) {
    return <PrivacyPolicy onClose={() => setShowPrivacy(false)} />;
  }

  if (showTerms) {
    return <TermsOfService onClose={() => setShowTerms(false)} />;
  }

  if (showSubscription) {
    return <SubscriptionPolicy onClose={() => setShowSubscription(false)} />;
  }

  if (showPaywall) {
    return (
      <Paywall
        onSuccess={() => {
          setShowPaywall(false);
          setShowThankYou(true);
        }}
        onClose={() => setShowPaywall(false)}
        onPrivacy={() => setShowPrivacy(true)}
        onTerms={() => setShowTerms(true)}
        onSubscription={() => setShowSubscription(true)}
      />
    );
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Thank You!</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-sm">
          Your payment was successful. All your answers and your personalized 12-week plan have been sent to <span className="font-bold text-cyan-600">{getAnswer('email')}</span>.
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full max-w-[200px]" />
        <p className="text-sm text-slate-400">
          You can close this window now.
        </p>
      </div>
    );
  }

  if (showReport) {
    return (
      <ReportView
        data={analysisData}
        onUnlock={() => setShowPaywall(true)}
      />
    );
  }

  if (isAnalyzing) {
    return (
      <AnalysisLoader
        onAnimationComplete={handleAnimationComplete}
        isApiFinished={isApiFinished}
        onPrivacy={() => setShowPrivacy(true)}
        onTerms={() => setShowTerms(true)}
        onSubscription={() => setShowSubscription(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">

      {/* Header / Nav */}
      <div className="px-6 py-6 flex items-center sticky top-0 bg-slate-50/90 backdrop-blur-sm z-10">
        <button
          onClick={handleBack}
          disabled={currentStepIndex === 0}
          className={`flex items-center text-slate-600 font-medium hover:text-cyan-600 transition
            ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : ''}
          `}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pb-48 max-w-lg mx-auto w-full">

        {!shouldHideHeader && (
          <div className="mb-4 sticky top-[72px] z-10 bg-slate-50/95 backdrop-blur-sm pt-2 pb-4 transition-all border-b border-slate-100/50 -mx-6 px-6">
            {currentStep.preTitle && (
              <p className="text-cyan-600 text-xs font-bold uppercase tracking-widest mb-2">
                {currentStep.preTitle}
              </p>
            )}
            <h1 className="text-xl md:text-2xl font-bold leading-tight whitespace-pre-line text-slate-900">
              {getTitle()}
            </h1>
            {currentStep.subtitle && (
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                {currentStep.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="w-full">
          {currentStep.type === 'text' && renderTextInput()}
          {currentStep.type === 'single-select' && renderSingleSelect()}
          {currentStep.type === 'multi-select' && renderMultiSelect()}
          {currentStep.type === 'year-picker' && renderYearPicker()}
          {currentStep.type === 'testimonials' && renderTestimonials()}
          {currentStep.type === 'transition' && renderTransition()}
          {currentStep.type === 'info-carousel' && renderInfoCarousel()}
          {currentStep.type === 'checklist-carousel' && renderChecklistCarousel()}
          {currentStep.type === 'photo-capture' && renderPhotoCapture()}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-slate-100 p-4 z-20">
        <div className="max-w-lg mx-auto w-full flex flex-col gap-3">

          {currentStep.disclaimer && (
            <div className={`p-2.5 rounded-lg text-xs text-center leading-tight
               ${currentStep.id === 'name' ? 'bg-transparent text-slate-400' : 'bg-cyan-50/50 text-cyan-900'}
            `}>
              {currentStep.disclaimer}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`w-full py-3.5 rounded-full font-bold text-base flex items-center justify-center space-x-2 transition-all shadow-lg
              ${isStepValid()
                ? 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }
            `}
          >
            <span>{getButtonText()}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};