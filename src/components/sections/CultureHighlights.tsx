"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CultureHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orangeLayerRef = useRef<HTMLDivElement>(null);
  const greenLayerRef = useRef<HTMLDivElement>(null);
  const blueLayerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !orangeLayerRef.current || !greenLayerRef.current || !blueLayerRef.current || !arrowRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Initial state: all layers and arrow hidden
      gsap.set(orangeLayerRef.current, { opacity: 0, y: 100 });
      gsap.set(greenLayerRef.current, { opacity: 0, y: 100 });
      gsap.set(blueLayerRef.current, { opacity: 0, y: 100 });
      gsap.set(arrowRef.current, { opacity: 0, x: -100 });

      // Step 1: Orange layer (bottom) appears first
      tl.to(orangeLayerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      })
      
      // Step 2: Green layer (middle) appears
      .to(greenLayerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "+=0.3")
      
      // Step 3: Blue layer (top) appears
      .to(blueLayerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "+=0.3")
      
      // Step 4: Red arrow (地方創生) appears last
      .to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, "+=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#FAF9EB] flex items-center justify-center overflow-visible py-8 sm:py-12">
      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        
        {/* Layered Cake Container */}
        <div className="relative flex flex-col items-center gap-0 scale-90 sm:scale-100 md:scale-110 lg:scale-125 xl:scale-150">
          
          {/* Red Arrow - Left Side (Vertical pointing down) - positioned relative to layers */}
          <div 
            ref={arrowRef}
            className="absolute left-2 sm:left-4 md:left-6 lg:left-0 top-0 bottom-0 -translate-x-[70%] sm:-translate-x-[80%] lg:-translate-x-[100%] ml-0 lg:-ml-10 xl:-ml-12 flex flex-col items-center z-50"
          >
            {/* Arrow body (rectangle) - height matches the 3 layers */}
            <div className="flex-1 bg-red-600 rounded-t-lg px-3 sm:px-4 md:px-8 lg:px-10 xl:px-12 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl [writing-mode:vertical-rl] tracking-wide sm:tracking-wider">
                地方創生
              </span>
            </div>
            {/* Arrow head (triangle pointing down) */}
            <div className="w-0 h-0 border-t-[20px] sm:border-t-[25px] md:border-t-[35px] lg:border-t-[40px] xl:border-t-[45px] border-l-[18px] sm:border-l-[20px] md:border-l-[40px] lg:border-l-[50px] xl:border-l-[62px] border-r-[18px] sm:border-r-[20px] md:border-r-[40px] lg:border-r-[50px] xl:border-r-[62px] border-t-red-600 border-l-transparent border-r-transparent"></div>
          </div>
          
          {/* Blue Layer (Top - Narrowest) */}
          <div 
            ref={blueLayerRef}
            className="w-[65%] sm:w-[60%] md:w-[62%] lg:w-[65%] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 bg-blue-500 rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center relative z-30 cursor-pointer group"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-center px-3 sm:px-4">
              產業 / 品牌
            </span>
          </div>

          {/* Green Layer (Middle) */}
          <div 
            ref={greenLayerRef}
            className="w-[82%] sm:w-[78%] md:w-[80%] lg:w-[82%] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 bg-green-500 rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center relative z-20 -mt-2 sm:-mt-3 cursor-pointer group"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-center px-3 sm:px-4">
              文化資產 + 文化活動
            </span>
          </div>

          {/* Orange Layer (Bottom - Widest) */}
          <div 
            ref={orangeLayerRef}
            className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 bg-orange-500 rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center relative z-10 -mt-2 sm:-mt-3 cursor-pointer group"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-center px-3 sm:px-4">
              共享（文化記憶）
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}