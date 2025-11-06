import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ImageGrid } from './components/ImageGrid';
import { ImageEditor } from './components/ImageEditor';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateProfilePictures } from './services/geminiService';
import type { UploadedFile } from './types';

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFile(file);
    setGeneratedImages([]);
    setSelectedImage(null);
    setError(null);
  };

  const handleGeneration = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setSelectedImage(null);

    try {
      const images = await generateProfilePictures(uploadedFile.base64, uploadedFile.type);
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (imageBase64: string) => {
    setSelectedImage(imageBase64);
  };
  
  const handleBackToGrid = () => {
    setSelectedImage(null);
  };

  const resetState = () => {
    setUploadedFile(null);
    setGeneratedImages([]);
    setSelectedImage(null);
    setIsLoading(false);
    setError(null);
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (selectedImage) {
      return (
        <ImageEditor 
          baseImage={selectedImage} 
          onBack={handleBackToGrid} 
          setLoading={setIsLoading}
          setError={setError}
          onImageUpdate={setSelectedImage}
        />
      );
    }
    if (generatedImages.length > 0) {
      return <ImageGrid images={generatedImages} onSelect={handleImageSelect} onRestart={resetState}/>;
    }
    return (
      <FileUpload 
        onFileUpload={handleFileUpload} 
        onGenerate={handleGeneration} 
        uploadedFile={uploadedFile} 
      />
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto">
        <Header onLogoClick={resetState} />
        <main className="mt-8">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
              <strong className="font-bold">오류: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;