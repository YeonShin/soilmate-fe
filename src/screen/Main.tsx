// src/screen/Main.tsx
import React from 'react';

const Main: React.FC = () => {
  return (
    <div
      className="
        relative
        w-full
        min-h-[calc(100vh-64px)] 
        bg-[url('/background.png')]
        bg-center
        bg-cover
        bg-no-repeat
        py-32
      "
    >
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* 중앙 텍스트 */}
      <div className="relative z-10 flex flex-col items-center justify-baseline h-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Improve your crops with&nbsp;
          <span className="text-green-300">SoilMate</span>
        </h1>
        <button
          className="
            mt-8
            px-6 py-3
            bg-green-600 hover:bg-green-700
            text-white font-medium
            rounded-full
            transition
          "
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Main;
