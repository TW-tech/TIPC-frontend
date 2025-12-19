"use client";

import { useState, useEffect } from 'react';
import { 
  MainVisual,
  ImageCarousel,
  CakeDiagram,
  VideoRecommendations,
  EditorPick,
  Footer,
  FirstCakeInstruction,
  SecondCakeInstruction,
  LoadingScreen
} from '@/components';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    
    if (!hasSeenLoading) {
      setIsLoading(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    // Mark that the user has seen the loading screen
    sessionStorage.setItem('hasSeenLoading', 'true');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      <div className="min-h-screen overflow-x-hidden">

        {/* 主視覺區塊 - <MainVisual /> 手繪大圖 */}
        <MainVisual />
        {/* 輪播圖片區塊 - <ImageCarousel /> 在手繪大圖底下 */}
        <ImageCarousel />
        {/* 初次造訪蛋糕說明區塊*/}
        <FirstCakeInstruction/>
        
        {/* 蛋糕圖區塊  <CakeDiagram />*/}
        <CakeDiagram />

        <SecondCakeInstruction />
        
        {/* 影音推薦區塊  <VideoRecommendations /> */}
        <VideoRecommendations />
        
        {/* 編輯精選區塊 <EditorPick /> */}
        <EditorPick />

        {/* 頁尾區塊   <Footer />*/}
        <Footer />
      </div>
    </>
  );
}
