import React, { useState, useRef } from 'react';

interface ResultDisplayProps {
  originalUrl: string | null;
  generatedUrl: string | null;
  isLoading: boolean;
}

const Spinner: React.FC = () => (
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
);

const DownloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalUrl, generatedUrl, isLoading }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const showComparison = originalUrl && generatedUrl && !isLoading;

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">Result: Your AI Headshot</h2>
      <div className="relative w-full aspect-square bg-gray-800/50 rounded-lg flex justify-center items-center overflow-hidden">
        {isLoading && <Spinner />}
        {!isLoading && !originalUrl && (
          <p className="text-gray-500 text-center px-4">Upload an image and select a style to generate your headshot.</p>
        )}
        {!isLoading && originalUrl && !generatedUrl && (
           <img src={originalUrl} alt="Original selfie" className="w-full h-full object-contain rounded-lg" />
        )}

        {showComparison && (
          <div className="relative w-full h-full select-none">
            {/* Before Image */}
            <div className="absolute top-0 left-0 w-full h-full">
                <img 
                    src={originalUrl!} 
                    alt="Original" 
                    className="w-full h-full object-cover"
                    draggable="false"
                />
                 <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
            </div>

            {/* After Image (clipped) */}
            <div 
              className="absolute top-0 left-0 w-full h-full overflow-hidden" 
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img 
                src={`data:image/jpeg;base64,${generatedUrl!}`}
                alt="Generated" 
                className="absolute top-0 left-0 w-full h-full object-cover"
                draggable="false"
              />
               <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">AFTER</div>
            </div>
            
            {/* Slider Handle and Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white/50 pointer-events-none" 
              style={{ left: `calc(${sliderPos}% - 0.5px)` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg grid place-items-center cursor-ew-resize">
                 <svg className="w-6 h-6 text-gray-700 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
              </div>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full cursor-ew-resize opacity-0"
              aria-label="Image comparison slider"
            />
          </div>
        )}

        {generatedUrl && !isLoading && (
             <a
                href={`data:image/jpeg;base64,${generatedUrl}`}
                download="ai-headshot.jpg"
                className="absolute bottom-4 right-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center z-10"
            >
                <DownloadIcon />
                Download
            </a>
        )}
      </div>
    </div>
  );
};