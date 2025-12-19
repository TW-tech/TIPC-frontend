// 主頁的影片推薦區
"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  videosData  from "@/data/video.json";
import { VideoRecommendation } from "@/types";
import { VideoBlock } from "@/components";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoRecommendations() {
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation states
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoRecommendation | null>(null);
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);
  const backgroundref = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    if (!isClient) {
      return;
    }
    
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Video cards animation
      if (videoContainerRef.current) {
        const cards = videoContainerRef.current.querySelectorAll('.video-card');
        
        gsap.fromTo(cards,
          {
            opacity: 0,
            x: 80,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate navigation buttons
        const navButtons = videoContainerRef.current.querySelectorAll('.nav-button');
        gsap.fromTo(navButtons,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.3,
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  // 影片瀏覽箭頭顯示
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  //每次移動距離固定
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.4;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };
    
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
    <section
      ref={sectionRef}
      className="relative pt-14 pb-8 sm:pt-18 sm:pb-10 lg:pt-22 lg:pb-12 bg-[#CC6915]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 標題區塊 */}
      <div ref={titleRef} className="absolute top-4 sm:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-10 text-black text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
        TIPC影音
      </div>
      <div ref={videoContainerRef} className=" mx-auto px-0 sm:px-0 lg:px-0 relative">
      {/* 漸層遮罩 */}
      <div className="absolute left-0 w-16 sm:w-12 lg:w-60 h-full bg-gradient-to-r from-[#CC6915] to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 w-16 sm:w-12 lg:w-60 h-full bg-gradient-to-l from-[#CC6915] to-transparent pointer-events-none z-10"></div>
      {/* 箭頭 */}
      {isHovered && showLeft && (
        <button
          className="nav-button absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/0 rounded-full shadow hover:bg-white/10"
          onClick={() => scroll("left")}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {isHovered && showRight && (
        <button
          className="nav-button absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/0 rounded-full shadow hover:bg-white/10"
          onClick={() => scroll("right")}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* 可滑動影片列 */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scrollbar-hide"
      >
        {videosData.map((video) => (
          <VideoBlock
            key={video.id}
            video={video}
            onClick={(e) => openPanel(e, video)}
            showTextAlways={true}
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] first:ml-30 last:mr-30"
          />
        ))}
      </div>
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
    </section>
  );
}