
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        AI Headshot Photographer
      </h1>
      <p className="text-gray-400 mt-2">
        Transform your selfie into a professional headshot with Gemini.
      </p>
    </header>
  );
};
