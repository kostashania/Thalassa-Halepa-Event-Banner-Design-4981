import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuestAuth } from '../contexts/QuestAuthContext';

const ProtectedRoute = ({ children, requireOnboarding = false }) => {
  const { isAuthenticated, user, loading } = useQuestAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && user?.newUser && !user?.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;