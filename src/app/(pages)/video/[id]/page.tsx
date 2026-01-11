// 影像藝廊
'use client';

import { useRef, useState, useEffect } from "react";
import { PageLayout, VideoBlock } from '@/components';
import { VideoRecommendation } from "@/types";



export default function VideoPage() {
  const [videosData, setVideosData] = useState<VideoRecommendation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoRecommendation | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
  const backgroundref = useRef<HTMLDivElement>(null);

  // Fetch videos from API
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        const result = await response.json();
        if (result.success) {
          // Transform the database structure to match VideoRecommendation type
          const transformedVideos = result.data.map((video: any) => ({
            id: video.id,
            src: video.url,
            thumbnail: video.mainImg,
            title: video.title,
            description: video.description,
            keywords: video.keyWords?.map((kw: any) => kw.keyWord.name) || [],
            author: video.author,
            videoDate: video.videoDate,
          }));
          setVideosData(transformedVideos);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    }
    fetchVideos();
  }, []);

  // 影片欄開關
    const openPanel = (e: React.MouseEvent, video: VideoRecommendation) => {
      setInitialRect(e.currentTarget.getBoundingClientRect());
      setCurrentVideo(video);
      setIsOpen(true);
    };
  
    //影片欄動畫
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
  
    // 影片欄開啟
    useEffect(() => {
      if (isOpen && panelRef.current && initialRect && backgroundref.current) {
  
        zoom();
        
        window.requestAnimationFrame(() => {
          if (panelRef.current && backgroundref.current)
          {
            panelRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
            panelRef.current.style.transform = 'none';
            panelRef.current.style.opacity = '1';
            backgroundref.current.style.transition = 'opacity 0.5s ease-in-out';
            backgroundref.current.style.opacity = '1';
          }
        });
  
        // 影片欄背景不可滑動 scrollbar-width: none;
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
  
    //影片欄關閉
    const closePanel = () => {
      document.body.style.overflow = '';
      if (!panelRef.current || !initialRect) {
        setIsOpen(false);
        setCurrentVideo(null);
        setInitialRect(null);
        return;
      }
  
      zoom();
      
      // Wait for the transition to finish before unmounting the component
      setTimeout(() => {
        setIsOpen(false);
        setCurrentVideo(null);
        setInitialRect(null);
        if (panelRef.current) {
          panelRef.current.style.transform = '';
          panelRef.current.style.opacity = '';
        }
      }, 500); 
    };

  return (
    <PageLayout title="TIPC影音" subtitle="TIPC Videos" headerpic="/images/header/video.jpeg">
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">

          {/* 影像展示區域 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6">
            {videosData.map((video) => (
              <VideoBlock
                key={video.id}
                video={video}
                onClick={(e) => openPanel(e, video)}
                showTextAlways={true}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px]"
              />
            ))}
            
          </div>

            {/* 影片播放欄 */}
          {isOpen && currentVideo && (
            
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
                className="bg-[#833416] p-6 rounded-lg w-[90%] max-h-[90vh] overflow-y-auto relative [&::-webkit-scrollbar]:hidden scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
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
                {/* 影片本體 */}
                <iframe
                  className="w-full aspect-video rounded"
                  src={currentVideo.src}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                {/* 影片欄說明 */}
                <div className="text-lg space-y-4 mt-4">
                  <p>{currentVideo.title}</p> 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
