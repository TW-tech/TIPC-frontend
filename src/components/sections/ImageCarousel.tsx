// 活動跑馬燈
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventData, setEventData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const result = await response.json();
        if (result.success) {
          // Filter for current events only
          const currentEvents = result.data.filter((event: any) => 
            new Date(event.eventDate) > new Date()
          );
          setEventData(currentEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // 自動輪播
  useEffect(() => {
    // Only run on client-side and when we have events
    if (typeof window === 'undefined' || eventData.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventData.length);
    }, 4000); // 4秒切換一次

    return () => clearInterval(timer);
  }, [eventData.length]);

  // GSAP Animations
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return;
    }
    
    const ctx = gsap.context(() => {
      // Carousel animation
      if (carouselRef.current) {
        const slides = carouselRef.current.querySelectorAll('.carousel-slide');
        const navDots = carouselRef.current.querySelectorAll('.nav-dot');
        
        console.log('Found slides:', slides.length, 'Found navDots:', navDots.length); // Debug
        
        // Simply make everything visible without complex animation for now
        gsap.set(slides, { opacity: 1, scale: 1, y: 0 });
        gsap.set(navDots, { opacity: 1, scale: 1, y: 0 });
      }
    }, sectionRef);    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventData.length) % eventData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-8 sm:py-10 lg:py-12 bg-[#FAF9EB]">
        <div className="relative w-full h-[14rem] sm:h-[18rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[44rem] flex items-center justify-center">
          <p className="text-gray-500">載入中...</p>
        </div>
      </section>
    );
  }

  // No events state
  if (eventData.length === 0) {
    return (
      <section className="py-8 sm:py-10 lg:py-12 bg-[#FAF9EB]">
        <div className="relative w-full h-[14rem] sm:h-[18rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[44rem] flex items-center justify-center">
          <p className="text-gray-500">目前沒有進行中的活動</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 lg:py-12 bg-[#FAF9EB]">
      {/* 滿寬輪播容器 */}
      <div ref={carouselRef} className="relative w-full group">
        {/* 三圖輪播區域 - 寬扁比例 */}
        <div className="relative h-[14rem] sm:h-[18rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[44rem] flex items-center justify-center gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8">
            
            {/* 左側預覽圖 */}
            <div className="carousel-slide hidden sm:block relative w-[18%] h-[60%] lg:h-[70%] xl:h-[75%] 2xl:h-[80%] opacity-60 hover:opacity-80 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden"
                   onClick={prevSlide}>
                <Image
                  src={eventData[(currentSlide - 1 + eventData.length) % eventData.length].mainImage}
                  alt={eventData[(currentSlide - 1 + eventData.length) % eventData.length].alt || `Event ${(currentSlide - 1 + eventData.length) % eventData.length + 1}`}
                  fill
                  className="object-cover"
                  sizes="18vw"
                />
                {/* 左箭頭覆蓋層 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 中間主圖 */}
            <div className="carousel-slide relative w-full sm:w-[64%] h-full">
              <Link href={`/event/${eventData[currentSlide].id}`} className="block relative w-full h-full rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image
                  src={eventData[currentSlide].mainImage}
                  alt={eventData[currentSlide].alt || `Event ${currentSlide + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 64vw"
                  priority
                />
              </Link>
            </div>

            {/* 右側預覽圖 */}
            <div className="carousel-slide hidden sm:block relative w-[18%] h-[60%] lg:h-[70%] xl:h-[75%] 2xl:h-[80%] opacity-60 hover:opacity-80 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden"
                   onClick={nextSlide}>
                <Image
                  src={eventData[(currentSlide + 1) % eventData.length].mainImage}
                  alt={eventData[(currentSlide + 1) % eventData.length].alt || `Event ${((currentSlide + 1) % eventData.length) + 1}`}
                  fill
                  className="object-cover"
                  sizes="18vw"
                />
                {/* 右箭頭覆蓋層 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 手機版控制按鈕 */}
          <button
            onClick={prevSlide}
            className="sm:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="上一張圖片"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="sm:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="下一張圖片"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 輪播指示器 */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
            {eventData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`nav-dot transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-orange-500 rounded-full'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
                aria-label={`前往第 ${index + 1} 張圖片`}
              />
            ))}
          </div>

        </div>
    </section>
  );
}
