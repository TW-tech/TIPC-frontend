// 主視覺圖
"use client";

import Navigation from '@/components/navigation/Navigation';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MainVisual() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Set initial state - hidden
    gsap.set([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 50
    });

    // Create animation timeline after images load
    const timer = setTimeout(() => {
      const tl = gsap.timeline();
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6'); // Start 0.6s before previous animation ends
    }, 500); // Wait 0.5s for a quicker text appearance

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Navigation */}
        <Navigation/>

        {/* Responsive Background Images using CSS */}
        <div 
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/mainVisual/phone_main.jpg)',
          }}
        >
          <style jsx>{`
            @media (min-width: 768px) and (max-width: 1023px) {
              div {
                background-image: url(/mainVisual/ipad_main.jpg) !important;
              }
            }
            @media (min-width: 1024px) {
              div {
                background-image: url(/mainVisual/PC_main.jpg) !important;
              }
            }
          `}</style>
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-amber-50 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 [text-shadow:8px_8px_6px_rgba(0,0,0,0.6)] leading-tight text-amber-100"
            >
              探索記憶．洞見未來
            </h1>
            
            {/* Description */}
            <p 
              ref={descriptionRef}
              className="font-body text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-12 [text-shadow:0px_0px_16px_rgba(0,0,0,0.8)] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto leading-relaxed text-slate-100 font-black"
            >
              透過對話與思辨讓台灣文化影響力被看見
            </p>
          </div>
          
         
        </div>
      </section>
  );
}
