import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';

const App: React.FC = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {!hasCompletedOnboarding ? (
        <Onboarding onComplete={handleCompleteOnboarding} />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;