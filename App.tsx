import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Admin } from './components/Admin';

const App: React.FC = () => {
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