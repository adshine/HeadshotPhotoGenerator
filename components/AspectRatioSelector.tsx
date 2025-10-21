import React from 'react';

const RATIOS = ['1:1', '3:4', '4:3', '9:16', '16:9'];
const RATIO_LABELS: { [key: string]: string } = {
  '1:1': 'Square',
  '3:4': 'Portrait',
  '4:3': 'Landscape',
  '9:16': 'Tall',
  '16:9': 'Wide',
};

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onSelect: (ratio: string) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">3. Set Aspect Ratio</h2>
      <div className="flex flex-wrap gap-3">
        {RATIOS.map((ratio) => (
          <button
            key={ratio}
            onClick={() => onSelect(ratio)}
            aria-pressed={selectedRatio === ratio}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
              selectedRatio === ratio
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {ratio} <span className="text-gray-400 ml-1 hidden sm:inline">({RATIO_LABELS[ratio]})</span>
          </button>
        ))}
      </div>
    </div>
  );
};