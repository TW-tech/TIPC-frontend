"use client";

import NextImage from "next/image";
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  images: string[];
}

export default function LoadingScreen({ onLoadingComplete, images }: LoadingScreenProps) {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isGsapReady, setIsGsapReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 檢查 GSAP 是否準備好
    const checkGsapReady = () => {
      if (typeof gsap !== 'undefined' && gsap.version) {
        setIsGsapReady(true);
      } else {
        setTimeout(checkGsapReady, 50);
      }
    };
    
    checkGsapReady();
  }, []);

  useEffect(() => {
    if (images.length === 0) {
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          setProgress((loadedCount / images.length) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          setProgress((loadedCount / images.length) * 100);
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      console.log('All images loaded successfully');
    });
  }, [images]);

  useEffect(() => {
    // 當 GSAP 準備好且所有圖片載入完成時，等待額外的緩衝時間後開始動畫
    if (isGsapReady && progress === 100) {
      const timer = setTimeout(() => {
        // 淡出 loading 畫面
        gsap.to('.loading-screen', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: onLoadingComplete
        });
      }, 500); // 額外等待 500ms 確保一切準備就緒
      return () => clearTimeout(timer);
    }
  }, [isGsapReady, progress, onLoadingComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center z-50">
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

      {/* 載入狀態文字 */}
      <div className="text-xs text-gray-500 text-center">
        {!isGsapReady ? (
          <span>正在初始化動畫引擎...</span>
        ) : progress < 100 ? (
          <span>正在載入文化素材 ({loadedImages}/{images.length})</span>
        ) : (
          <span>準備就緒，即將開始文化之旅...</span>
        )}
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
