import React from 'react';

type WardrobeOption = 'original' | 'generate_new';

interface WardrobeSelectorProps {
  selectedOption: WardrobeOption;
  onSelect: (option: WardrobeOption) => void;
}

export const WardrobeSelector: React.FC<WardrobeSelectorProps> = ({ selectedOption, onSelect }) => {
  const options: { id: WardrobeOption; label: string; description: string }[] = [
    { 
      id: 'generate_new', 
      label: 'Generate Professional Wardrobe',
      description: 'AI will create a new, professional outfit.'
    },
    { 
      id: 'original', 
      label: 'Keep Original Wardrobe',
      description: 'AI will keep the clothes from your photo.'
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">4. Wardrobe Options</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            aria-pressed={selectedOption === option.id}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
              selectedOption === option.id
                ? 'bg-indigo-600/20 border-indigo-500'
                : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
            }`}
          >
            <p className="font-semibold text-gray-100">{option.label}</p>
            <p className="text-sm text-gray-400">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};