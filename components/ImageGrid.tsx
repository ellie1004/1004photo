import React from 'react';
import { Button } from './Button';

interface ImageGridProps {
  images: string[];
  onSelect: (imageBase64: string) => void;
  onRestart: () => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onSelect, onRestart }) => {
  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-bold text-gray-100 mb-2">새로운 프로필 사진</h2>
      <p className="text-gray-400 mb-6">편집하거나 다운로드할 사진을 선택하세요.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group ring-2 ring-gray-700 hover:ring-indigo-500 focus-within:ring-indigo-500 relative"
            onClick={() => onSelect(img)}
          >
            <img 
              src={`data:image/png;base64,${img}`} 
              alt={`Generated profile ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 font-semibold">선택</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={onRestart} variant="secondary">처음부터 다시하기</Button>
      </div>
    </div>
  );
};