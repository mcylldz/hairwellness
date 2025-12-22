import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { TestPage } from './components/TestPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Admin Route
  if (path === '/admin') {
    return <Admin />;
  }

  // Test Page Route
  if (path === '/testpage') {
    return (
      <ErrorBoundary>
        <TestPage />
      </ErrorBoundary>
    );
  }

  const handleStartQuiz = () => {
    setShowLanding(false);
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {showLanding ? (
        <LandingPage onStart={handleStartQuiz} />
      ) : !hasCompletedOnboarding ? (
        <Onboarding onComplete={handleCompleteOnboarding} />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;