import React, { useState, useCallback, useRef } from 'react';
import type { UploadedFile } from '../types';
import { Button } from './Button';

interface FileUploadProps {
  onFileUpload: (file: UploadedFile) => void;
  onGenerate: () => void;
  uploadedFile: UploadedFile | null;
}

const UploadIcon = () => (
    <svg className="w-12 h-12 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onGenerate, uploadedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        onFileUpload({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg">
      {!uploadedFile ? (
        <>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">1. 사진 업로드하기</h2>
            <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">클릭하여 업로드</span>하거나 파일을 드래그하세요</p>
                    <p className="text-xs text-gray-500">PNG, JPG 또는 WEBP (최대 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e.target.files)} ref={fileInputRef}/>
            </label>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">업로드한 사진</h2>
          <div className="w-64 h-64 mb-4 rounded-lg overflow-hidden ring-4 ring-indigo-500/50">
            <img src={`data:${uploadedFile.type};base64,${uploadedFile.base64}`} alt="Uploaded preview" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-gray-300">{uploadedFile.name}</p>
            <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
             <Button onClick={() => fileInputRef.current?.click()} variant="secondary">
                 사진 변경
             </Button>
            <Button onClick={onGenerate}>
              프로필 사진 5개 생성하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};