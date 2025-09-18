'use client';

import Masonry from "react-masonry-css";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Metadata } from 'next';
import { PageLayout } from '@/components';
import type { GalleryImage } from "@/types";
/*export const metadata: Metadata = {
  title: '影像藝廊 - 文化記憶庫',
  description: '瀏覽豐富的文化影像收藏，包括歷史照片、藝術作品和文物紀錄',
};*/

// 影像資料（local）
const imageCount = 28;

const allImages: GalleryImage[] = Array.from({ length: imageCount }, (_, index) => ({
  id: index + 1,
  title: `文化影像 ${index + 1}`,
  src: `/images/gallery/${index + 1}.jpg`
}));

export default function StoryPage() {
  const [visibleCount, setVisibleCount] = useState(12); // 初始顯示數量
  const imagesToShow = allImages.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const breakpointColumnsObj = {
    default: 4, // 4 columns desktop
    1280: 4,
    1024: 3,
    768: 2,
    500: 2,
  };

  //viewpanel
  const VideoRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
    const backgroundref = useRef<HTMLDivElement>(null);
  
    // 圖片欄開關
      const openPanel = (e: React.MouseEvent, image: GalleryImage) => {
        setInitialRect(e.currentTarget.getBoundingClientRect());
        setCurrentImage(image);
        setIsOpen(true);
      };
    
      //圖片欄動畫
      const zoom = () => {
        if (panelRef.current && initialRect && backgroundref.current)
        {
          const panelRect = panelRef.current.getBoundingClientRect();
          const scaleX = initialRect.width / panelRect.width;
          const scaleY = initialRect.height / panelRect.height;
          const translateX = initialRect.left + initialRect.width / 2 - (panelRect.left + panelRect.width / 2);
          const translateY = initialRect.top + initialRect.height / 2 - (panelRect.top + panelRect.height / 2);
          
          //panelRef.current.style.transition = 'none';
          panelRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
          panelRef.current.style.opacity = '0';
          backgroundref.current.style.opacity = '0';
        }
      };
    
      // 圖片欄開啟
      useEffect(() => {
        if (isOpen && panelRef.current && initialRect && backgroundref.current) {
    
          zoom();
          
          requestAnimationFrame(() => {
            if (panelRef.current && backgroundref.current)
            {
              panelRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
              panelRef.current.style.transform = 'none';
              panelRef.current.style.opacity = '1';
              backgroundref.current.style.transition = 'opacity 0.5s ease-in-out';
              backgroundref.current.style.opacity = '1';
            }
          });
    
          // 圖片欄背景不可滑動 scrollbar-width: none;
          if (isOpen) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
          return () => {
            document.body.style.overflow = '';
          };
        }
      }, [isOpen, initialRect]);
    
      //圖片欄關閉
      const closePanel = () => {
        document.body.style.overflow = '';
        if (!panelRef.current || !initialRect) {
          setIsOpen(false);
          setCurrentImage(null);
          setInitialRect(null);
          return;
        }
    
        zoom();
        
        // Wait for the transition to finish before unmounting the component
        setTimeout(() => {
          setIsOpen(false);
          setCurrentImage(null);
          setInitialRect(null);
          if (panelRef.current) {
            panelRef.current.style.transform = '';
            panelRef.current.style.opacity = '';
          }
        }, 500); 
      };

  return (
    <PageLayout title="光影故事" subtitle="Stories">
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="flex flex-col gap-6"
      >
        {imagesToShow.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-xl shadow-lg"
            onClick={(e) => openPanel(e, image)}>
            <Image
              src={image.src}
              alt={`Gallery ${image.id}`}
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </Masonry>
      
      {/* 圖片欄 */}
      {isOpen && currentImage && (
        
        <div
          
          className="fixed inset-0 z-50 lg:p-50 flex items-center justify-center "
          onClick={closePanel}
        >
          <div
            ref={backgroundref}
            className="fixed inset-0 bg-[rgba(0,0,0,0.8)]"
          >
          </div>
          <div
            ref={panelRef}
            className="p-6 rounded-lg relative  [&::-webkit-scrollbar]:hidden scrollbar-hide "
            
          >
            {/* 關閉鍵 */} 
            <button
              className="absolute top-1 right-1 text-xl font-bold text-gray-500 hover:text-gray-800 rounded-full shadow hover:bg-white/10"
              onClick={closePanel}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* 圖片本體 */}
            
            <div key={currentImage.id} className="flex items-center justify-center ">
              <Image
                src={currentImage.src}
                alt={`Gallery ${currentImage.id}`}
                width={1200}
                height={800}
                className="  max-h-[80vh] object-contain"
                
              />
            </div>
            
            {/* 圖片欄說明 */}
            <div className="text-lg space-y-4 mt-4">
              
            </div>
          </div>
        </div>
      )}
      {/* 載入更多按鈕 */}
      {visibleCount < allImages.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="bg-[#833416] text-white px-8 py-3 rounded-lg hover:bg-[#a0471f] transition-colors font-semibold"
          >
            載入更多
          </button>
        </div>
      )}
    </div>
      </div>
    </PageLayout>
  );
}
