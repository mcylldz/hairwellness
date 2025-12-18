export interface SlideData {
  id: number;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
}

export interface OnboardingProps {
  onComplete: () => void;
}

export interface SurveyOption {
  id: string;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  age: number;
  timeframe: string;
  result: string;
  beforeImage: string;
  afterImage: string;
}

export interface InfoSlide {
  id: number;
  icon?: string; // Emoji
  text?: string;
  imageSrc?: string; // Optional image for the slide (overrides main image)
}

export interface JourneyPhase {
  id: number;
  phaseLabel: string; // e.g., "Phase 1"
  title: string;      // e.g., "Foundation"
  duration: string;   // e.g., "Weeks 1-4"
  items: string[];
  imageSrc: string;
}

export interface PhotoView {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
}

export type InputType = 'text' | 'single-select' | 'multi-select' | 'year-picker' | 'testimonials' | 'transition' | 'info-carousel' | 'checklist-carousel' | 'photo-capture';

export interface SurveyQuestion {
  id: string;
  type: InputType;
  title: string;
  preTitle?: string;
  subtitle?: string;
  placeholder?: string;
  options?: SurveyOption[];
  disclaimer?: string;
  testimonials?: Testimonial[];
  imageSrc?: string;
  infoSlides?: InfoSlide[];
  journeyPhases?: JourneyPhase[];
  photoViews?: PhotoView[]; // For photo-capture step
  customButtonText?: string; // To override the "Next" or "Continue" text
}

// AI Analysis Result Types
export interface WeekPlan {
  week: number;
  focus: string;
  description: string;
}

export interface AnalysisResult {
  hairWellnessScore: number; // 0-100
  hairWellnessLabel: string; // e.g. "Developing"
  textureScore: number; // 0-100
  textureLabel: string; // e.g. "Balanced"
  porosity: 'Low' | 'Medium' | 'High';
  densityScore: number;
  volumeScore: number;
  shineScore: number;
  splitEndsScore: number;
  breakageScore: number;
  frizzScore: number;
  flakinessScore: number;
  scalpWellnessScore: number;
  coverageAwarenessScore: number;
  hairlineAwarenessScore: number;
  summary: string;
  twelveWeekPlan: WeekPlan[];
}