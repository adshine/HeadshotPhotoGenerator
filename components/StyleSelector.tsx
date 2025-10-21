import React from 'react';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyleId: string | null;
  onSelect: (id: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyleId, onSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">2. Choose a Base Style</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            role="button"
            aria-pressed={selectedStyleId === style.id}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(style.id)}
            className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              selectedStyleId === style.id ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20' : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <img src={style.thumbnail} alt={style.name} className="w-full h-24 object-cover rounded-md" />
            <div className="mt-2 text-center">
              <h3 className="font-semibold text-sm text-gray-200">{style.name}</h3>
              <p className="text-xs text-gray-400 hidden sm:block">{style.description}</p>
            </div>
            {selectedStyleId === style.id && (
                <div className="absolute top-1 right-1 bg-indigo-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};