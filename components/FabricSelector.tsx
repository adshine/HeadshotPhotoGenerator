import React from 'react';

const FABRICS = [
  { id: 'wool', label: 'Wool' },
  { id: 'cotton', label: 'Cotton' },
  { id: 'linen', label: 'Linen' },
  { id: 'silk_velvet', label: 'Silk / Velvet' },
];

interface FabricSelectorProps {
  selectedFabric: string;
  onSelect: (fabric: string) => void;
}

export const FabricSelector: React.FC<FabricSelectorProps> = ({ selectedFabric, onSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">5. Choose Fabric Material</h2>
      <div className="flex flex-wrap gap-3">
        {FABRICS.map((fabric) => (
          <button
            key={fabric.id}
            onClick={() => onSelect(fabric.id)}
            aria-pressed={selectedFabric === fabric.id}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
              selectedFabric === fabric.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {fabric.label}
          </button>
        ))}
      </div>
    </div>
  );
};