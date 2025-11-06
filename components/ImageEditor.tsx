import React, { useState } from 'react';
import { Button } from './Button';
import { editProfilePicture } from '../services/geminiService';

interface ImageEditorProps {
  baseImage: string;
  onBack: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  onImageUpdate: (newImage: string) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ baseImage, onBack, setLoading, setError, onImageUpdate }) => {
  const [prompt, setPrompt] = useState('');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${baseImage}`;
    link.download = 'profile-picture.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleEdit = async () => {
      if (!prompt.trim()) {
          setError("편집 지시사항을 입력해주세요.");
          return;
      }
      setLoading(true);
      setError(null);
      try {
          const newImage = await editProfilePicture(baseImage, 'image/png', prompt);
          onImageUpdate(newImage);
      } catch (err) {
          console.error(err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('이미지 편집 중 알 수 없는 오류가 발생했습니다.');
          }
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="aspect-square w-full max-w-md rounded-lg overflow-hidden ring-4 ring-indigo-500/50">
          <img src={`data:image/png;base64,${baseImage}`} alt="Selected for editing" className="w-full h-full object-cover"/>
        </div>
        <div className="mt-6 flex items-center gap-4">
            <Button onClick={onBack} variant="secondary">선택 화면으로 돌아가기</Button>
            <Button onClick={handleDownload}>다운로드</Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-6 bg-gray-800 border-2 border-gray-700 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">이미지 편집하기</h3>
          <p className="text-gray-400 mb-4">원하는 변경 사항을 설명해주세요. 예: "정장 색상을 파란색으로 변경" 또는 "안경 추가".</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="예: 배경을 도서관으로 변경"
            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none text-gray-200"
            rows={4}
          />
          <Button onClick={handleEdit} className="mt-4 w-full">편집 적용하기</Button>
      </div>
    </div>
  );
};