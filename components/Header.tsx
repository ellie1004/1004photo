import React from 'react';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface HeaderProps {
    onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="text-center w-full cursor-pointer" onClick={onLogoClick}>
      <div className="flex items-center justify-center">
        <CameraIcon />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          누구나AI 프로필 사진 생성기
        </h1>
      </div>
      <p className="mt-2 text-md text-gray-400">
        단 몇 초 만에 멋진 전문가 프로필을 만들어보세요.
      </p>
    </header>
  );
};