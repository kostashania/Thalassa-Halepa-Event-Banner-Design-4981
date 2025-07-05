import React, { useState } from 'react';
import { OnBoarding } from '@questlabs/react-sdk';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import { useNavigate } from 'react-router-dom';
import questConfig from '../questConfig';

const QuestOnboardingPage = () => {
  const { user, completeOnboarding } = useQuestAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const userId = user?.userId || localStorage.getItem('userId');
  const token = user?.token || localStorage.getItem('token');

  const getAnswers = () => {
    // Complete onboarding and navigate to main app
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-800 text-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Let's Get Started!</h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              We're setting up your personalized experience. This will only take a moment.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <h3 className="font-semibold">Personalized Setup</h3>
                <p className="text-purple-100 text-sm">Tailored to your preferences</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold">Smart Recommendations</h3>
                <p className="text-purple-100 text-sm">Get suggestions based on your needs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🔧</span>
              </div>
              <div>
                <h3 className="font-semibold">Quick Setup</h3>
                <p className="text-purple-100 text-sm">Ready to use in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6 lg:hidden">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
              <p className="text-gray-600">Let's set up your account</p>
            </div>

            <div className="quest-onboarding-container" style={{ width: '400px', maxWidth: '100%' }}>
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;