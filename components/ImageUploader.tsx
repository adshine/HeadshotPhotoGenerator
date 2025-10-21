import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">1. Upload a Selfie</h2>
      <div 
        onClick={handleClick}
        className="relative w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-center cursor-pointer hover:border-indigo-500 transition-colors duration-300 bg-gray-800/50 p-4"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          aria-label="Upload your selfie"
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Selfie preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        ) : (
          <>
            <UploadIcon />
            <p className="mt-2 text-gray-400">Click to upload an image</p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </>
        )}
      </div>
    </div>
  );
};