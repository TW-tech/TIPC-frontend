"use client";

import { useState } from 'react';
import { 
  MainVisual,
  ImageCarousel,
  CakeDiagram,
  VideoRecommendations,
  EditorPick,
  Footer,
  LoadingScreen
} from '@/components';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      
      <div className="min-h-screen overflow-x-hidden">

        {/* 主視覺區塊 - <MainVisual /> 手繪大圖 */}
        <MainVisual />
        {/* 輪播圖片區塊 - <ImageCarousel /> 在手繪大圖底下 */}
        <ImageCarousel />
      
        
        {/* 蛋糕圖區塊  <CakeDiagram />*/}
        <CakeDiagram />
        
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
