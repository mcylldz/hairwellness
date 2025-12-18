import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AnalysisLoaderProps {
  onAnimationComplete: () => void;
  isApiFinished: boolean; // True when API data is ready
  onPrivacy: () => void;
  onTerms: () => void;
  onSubscription: () => void;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({
  onAnimationComplete,
  isApiFinished,
  onPrivacy,
  onTerms,
  onSubscription
}) => {
  const [steps, setSteps] = useState([
    { label: "Analyzing your answers...", progress: 0, status: 'pending' },
    { label: "Scanning your hair for key issues...", progress: 0, status: 'pending' },
    { label: "Evaluating your hair on all metrics...", progress: 0, status: 'pending' },
    { label: "Gathering insights and recommendations...", progress: 0, status: 'pending' },
    { label: "Finalizing your personalized report...", progress: 0, status: 'pending' },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      // All steps visually done. Wait for API if not finished, or proceed.
      if (isApiFinished) {
        setTimeout(onAnimationComplete, 500);
      }
      return;
    }

    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentStep = newSteps[currentStepIndex];

        if (currentStep.progress < 100) {
          // Increment progress
          // Randomize speed a bit for realism
          currentStep.progress += Math.floor(Math.random() * 5) + 2;
          currentStep.status = 'active';

          if (currentStep.progress >= 100) {
            currentStep.progress = 100;
            currentStep.status = 'completed';
          }
        }
        return newSteps;
      });
    }, 50);

    // If current step reached 100%, move to next
    if (steps[currentStepIndex].progress >= 100) {
      clearInterval(interval);
      // Small delay before starting next step
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 200);
    }

    return () => clearInterval(interval);
  }, [currentStepIndex, steps, isApiFinished, onAnimationComplete]);

  // Force finish animation if API is super fast (optional logic, keeping it linear for now)

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12 text-slate-900 pb-32">
      <div className="mb-8">
        <p className="text-slate-500 text-sm font-medium mb-1">Hair Report</p>
        <h1 className="text-3xl font-bold mb-2">Creating your detailed report...</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Please stay on this page while we create your report. It will only take a moment.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        {steps.map((step, index) => (
          <div key={index} className={`transition-opacity duration-500 ${index > currentStepIndex + 1 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex justify-between items-end mb-2">
              <span className={`font-medium text-sm ${step.status === 'completed' ? 'text-cyan-600' : 'text-slate-700'}`}>
                {step.label}
              </span>
              <span className="text-xs font-bold text-cyan-600">{step.progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-75 ease-out rounded-full"
                style={{ width: `${step.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Legal Links */}
      <div className="flex justify-center space-x-8 mt-12 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
        <button onClick={onPrivacy}>Privacy</button>
        <button onClick={onTerms}>Terms</button>
        <button onClick={onSubscription}>Restore</button>
      </div>
    </div>
  );
};