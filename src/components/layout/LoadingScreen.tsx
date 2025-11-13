"use client";

import NextImage from "next/image";
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate progress over 1.5 seconds
    const duration = 1000; // 1.5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        // Start fade out
        setFadeOut(true);
        setTimeout(onLoadingComplete, 300); // Wait for fade animation
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo 或品牌標識 */}
      <div className="mb-8">
        <div className="w-40 h-40 flex items-center justify-center">
          <NextImage
            src="/icons/logo_b.png"
            alt="台灣文化影響力平台標誌"
            width={2048}
            height={2048}
            className="w-40 h-40 mr-2 sm:mr-3 "
          />
        </div>
      </div>

      {/* 主要文字 */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        文化影響力平台
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-sm">
        正在載入文化體驗...
      </p>

      {/* 進度條 */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 進度百分比 */}
      <div className="text-sm text-gray-600 mb-8">
        {Math.round(progress)}% 完成
      </div>

      {/* 載入動畫點點 */}
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
