import React from 'react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSaveStyle: () => void;
  disabled: boolean;
  isModified: boolean;
}

const SaveIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt, onSaveStyle, disabled, isModified }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-200">
          6. Customize Prompt
        </h2>
        <button 
          onClick={onSaveStyle}
          disabled={!isModified || disabled}
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
            <SaveIcon />
            Save as New Style
        </button>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled}
        placeholder="Select a style above to see and edit its prompt..."
        className="w-full h-36 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        aria-label="Custom prompt for headshot generation"
      />
    </div>
  );
};