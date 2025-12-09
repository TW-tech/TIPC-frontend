"use client";

import { useState } from 'react';
import { 
  MainVisual,
  ImageCarousel,
  CultureHighlights,
  VideoRecommendations,
  PartnerRecommendations,
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
      
        
        {/* 文化知識區塊  <CultureHighlights />*/}
        <CultureHighlights />
        
        {/* 影音推薦區塊  <VideoRecommendations /> */}
       <VideoRecommendations />
        
        {/* 合作夥伴推薦區塊 <PartnerRecommendations /> */}
        <PartnerRecommendations />

        {/* 頁尾區塊   <Footer />*/}
        <Footer />
      </div>
    </>
  );
}
