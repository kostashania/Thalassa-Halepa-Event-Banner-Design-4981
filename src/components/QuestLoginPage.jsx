import React from 'react';
import { QuestLogin } from '@questlabs/react-sdk';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import { useNavigate } from 'react-router-dom';
import questConfig from '../questConfig';

const QuestLoginPage = () => {
  const { login } = useQuestAuth();
  const navigate = useNavigate();

  const handleLogin = ({ userId, token, newUser }) => {
    const userData = {
      userId,
      token,
      newUser,
      onboardingComplete: !newUser
    };
    
    login(userData);
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold">TB</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access your template builder and create stunning designs with our powerful tools.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <h3 className="font-semibold">Professional Templates</h3>
                <p className="text-blue-100 text-sm">Create beautiful, responsive designs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-blue-100 text-sm">Build and deploy in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-blue-100 text-sm">Your data is safe with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Authentication */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:hidden">
                <span className="text-white text-2xl font-bold">TB</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Access your account to continue</p>
            </div>

            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestLoginPage;