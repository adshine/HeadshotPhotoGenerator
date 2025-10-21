import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { WardrobeSelector } from './components/WardrobeSelector';
import { FabricSelector } from './components/FabricSelector';
import { PromptEditor } from './components/PromptEditor';
import { ResultDisplay } from './components/ResultDisplay';
import { HEADSHOT_STYLES } from './constants';
import { generateHeadshot } from './services/geminiService';
import { HeadshotStyle } from './types';

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

type WardrobeOption = 'original' | 'generate_new';

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [styles, setStyles] = useState<HeadshotStyle[]>(HEADSHOT_STYLES);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [wardrobeOption, setWardrobeOption] = useState<WardrobeOption>('generate_new');
  const [fabricType, setFabricType] = useState<string>('wool');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setUploadedFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setGeneratedImageUrl(null);
  };

  const handleStyleSelect = (id: string) => {
    setSelectedStyleId(id);
    const style = styles.find(s => s.id === id);
    if (style) {
        setCustomPrompt(style.prompt);
    }
    setError(null);
  };

  const handleSaveStyle = () => {
    const styleName = window.prompt("Enter a name for your new custom style:", "My Custom Style");
    if (styleName && styleName.trim() !== "") {
      const newStyle: HeadshotStyle = {
        id: `custom-${Date.now()}`,
        name: styleName,
        description: 'A custom saved style.',
        prompt: customPrompt,
        thumbnail: `https://picsum.photos/seed/${Date.now()}/200`
      };
      const newStyles = [...styles, newStyle];
      setStyles(newStyles);
      setSelectedStyleId(newStyle.id);
    }
  };

  const handleGenerateClick = async () => {
    if (!uploadedFile || !customPrompt) {
      setError("Please upload an image, select a style, and ensure the prompt is not empty.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(uploadedFile);
      const resultBase64 = await generateHeadshot(base64, mimeType, customPrompt, aspectRatio, wardrobeOption, fabricType);
      setGeneratedImageUrl(resultBase64);
    } catch (e) {
      const err = e as Error;
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const originalPrompt = useMemo(() => {
    return styles.find(s => s.id === selectedStyleId)?.prompt || '';
  }, [selectedStyleId, styles]);
  
  const isPromptModified = customPrompt !== originalPrompt && originalPrompt !== '';
  const isGenerateDisabled = !uploadedFile || !selectedStyleId || isLoading || !customPrompt;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* === Left Column: Controls === */}
          <div className="space-y-8 flex flex-col">
            <ImageUploader onImageSelect={handleImageSelect} previewUrl={previewUrl} />
            <StyleSelector styles={styles} selectedStyleId={selectedStyleId} onSelect={handleStyleSelect} />
            <AspectRatioSelector selectedRatio={aspectRatio} onSelect={setAspectRatio} />
            <WardrobeSelector selectedOption={wardrobeOption} onSelect={setWardrobeOption} />
            {wardrobeOption === 'generate_new' && (
              <FabricSelector selectedFabric={fabricType} onSelect={setFabricType} />
            )}
            <PromptEditor 
              prompt={customPrompt} 
              setPrompt={setCustomPrompt}
              onSaveStyle={handleSaveStyle}
              disabled={!selectedStyleId}
              isModified={isPromptModified}
            />
            
            <div className="mt-auto pt-4 space-y-4">
               <div className="text-center">
                 <button
                   onClick={handleGenerateClick}
                   disabled={isGenerateDisabled}
                   className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg disabled:shadow-none w-full sm:w-auto"
                 >
                   {isLoading ? "Generating..." : "Generate Headshot"}
                 </button>
               </div>

               {error && (
                 <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
                   <strong className="font-bold">Error: </strong>
                   <span className="block sm:inline">{error}</span>
                 </div>
               )}
            </div>
          </div>

          {/* === Right Column: Result === */}
          <div className="h-full">
            <ResultDisplay originalUrl={previewUrl} generatedUrl={generatedImageUrl} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <footer className="text-center p-6 text-gray-500 text-sm">
        <p>Powered by Gemini 2.5 Flash Image. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;