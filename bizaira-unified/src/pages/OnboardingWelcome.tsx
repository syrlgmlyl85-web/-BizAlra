import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingWelcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f9f9f9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
      {/* Browser Interface */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-500 border">
            https://bizaira.com/onboarding
          </div>
        </div>
        {/* Browser Content */}
        <div className="flex items-center justify-center min-h-[600px] p-8">
          {/* Onboarding Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            {/* Main Title */}
            <h1 className="text-2xl font-serif font-bold text-blue-900 mb-4 leading-tight">
              Elevate and Shape your unique brand experience with BizAIra
            </h1>
            {/* Subtitle */}
            <p className="text-gray-500 text-base mb-8 leading-relaxed">
              Just 4 short questions to tailor a unique experience for your brand. It only takes a minute.
            </p>
            {/* Main Button */}
            <button
              onClick={handleGetStarted}
              className="bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;