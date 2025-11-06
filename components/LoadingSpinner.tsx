import React, { useState, useEffect } from 'react';

const messages = [
  "디지털 커피를 내리는 중...",
  "AI에게 패션을 가르치는 중...",
  "최적의 구도를 찾는 중...",
  "멋진 프로필을 생성하는 중...",
  "완벽한 조명을 찾는 중...",
  "가상 맞춤 정장을 제작하는 중...",
];

export const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);


  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
       <div className="relative w-24 h-24">
         <svg className="w-full h-full" viewBox="0 0 100 100">
           {/* Pulsing background circle */}
           <circle
             className="text-indigo-500/20"
             strokeWidth="8"
             stroke="currentColor"
             fill="transparent"
             r="40"
             cx="50"
             cy="50"
           >
             <animate
               attributeName="r"
               values="35;45;35"
               dur="2s"
               repeatCount="indefinite"
             />
             <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
           </circle>
           {/* Rotating arc */}
           <circle
             className="text-indigo-500"
             strokeWidth="8"
             strokeDasharray="125.6"
             strokeDashoffset="94.2" /* 3/4 of circumference */
             strokeLinecap="round"
             stroke="currentColor"
             fill="transparent"
             r="40"
             cx="50"
             cy="50"
           >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="1.5s"
                repeatCount="indefinite"
              />
           </circle>
         </svg>
         {/* Icon in the middle */}
         <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
         </div>
       </div>
      <h2 className="text-2xl font-semibold mt-6 text-gray-200">이미지를 생성하는 중입니다...</h2>
      <p className="text-gray-400 mt-2" key={message}>{message}</p>
    </div>
  );
};