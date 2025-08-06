"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Navigation from '@/components/navigation/Navigation';

export default function MainVisual() {
  // Text content refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // SVG element refs
  const boat = useRef<HTMLImageElement>(null);
  const taiwan = useRef<HTMLImageElement>(null);
  const wave = useRef<HTMLImageElement>(null);
  const noodle = useRef<HTMLImageElement>(null);
  const mountainBackRefs = useRef<(HTMLImageElement | null)[]>([]);
  const mountainRefs = useRef<(HTMLImageElement | null)[]>([]);
  const fish = useRef<HTMLImageElement>(null);
  const villiage = useRef<HTMLImageElement>(null);
  const red = useRef<HTMLImageElement>(null);
  const leopard = useRef<HTMLImageElement>(null);
  const bear = useRef<HTMLImageElement>(null);
  const rightTemple = useRef<HTMLImageElement>(null);
  const leftTemple = useRef<HTMLImageElement>(null);
  const blue = useRef<HTMLImageElement>(null);

  // Mountain configurations - memoized to prevent unnecessary re-renders
  const mountainBackConfigs = useMemo(() => [
    { x: "10vw", y: "6vh", endX: "32vw", endY: "15vh", scale: 1.9, delay: 0, zIndex: 12 },
    { x: "10vw", y: "25vh", endX: "32vw", endY: "35vh", scale: 1.7, delay: 0, zIndex: 14 },
    { x: "10vw", y: "40vh", endX: "30vw", endY: "53vh", scale: 1.9, delay: 0, zIndex: 16 }
  ], []);
  const mountainConfigs = useMemo(() => [
    { x: "15vw", y: "6vh", endX: "47vw", endY: "30vh", scale: 1, delay: 0, zIndex: 13 },
    { x: "15vw", y: "35vh", endX: "47vw", endY: "49.5vh", scale: 1, delay: 0, zIndex: 15 },
    { x: "10vw", y: "40vh", endX: "14vw", endY: "58vh", scale: 1.3, delay: 0, zIndex: 18 }
  ], []);

  // Initialize animations
  useEffect(() => {
      const ctx = gsap.context(() => {
      const tlText = gsap.timeline({ defaults: { ease: "power3.out" } });
      const tlMain = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 設置所有元素的初始狀態 (保持高品質)
      gsap.set([
        ...mountainBackRefs.current.filter(Boolean),
        ...mountainRefs.current.filter(Boolean),
        rightTemple.current,
        leftTemple.current,
        taiwan.current,
        villiage.current,
        leopard.current,
        bear.current,
      ], { 
        opacity: 0,
        force3D: false, // 避免過度的3D加速影響品質
        backfaceVisibility: "hidden"
      });

      // part 1: 分階段執行山脈動畫 (避免同時執行太多)
      const mountainTimeline = gsap.timeline();
      
      mountainBackConfigs.forEach((config, index) => {
        const mountainElement = mountainBackRefs.current[index];
        if (mountainElement) {
          mountainTimeline.fromTo(mountainElement, 
            { 
              x: config.x,
              y: config.y,
              scale: 0.8,
              opacity: 0,
              zIndex: config.zIndex,
              force3D: false // 保持品質
            },
            { 
              x: config.endX,
              y: config.endY,
              scale: config.scale,
              opacity: 1,
              zIndex: config.zIndex,
              duration: 0.8,
              ease: "power2.out"
            }, index * 0.1);
        }
      });

      mountainConfigs.forEach((config, index) => {
        const mountainElement = mountainRefs.current[index];
        if (mountainElement) {
          mountainTimeline.fromTo(mountainElement, 
            { 
              x: config.x,
              y: config.y,
              scale: 0.8,
              opacity: 0,
              zIndex: config.zIndex,
              force3D: false
            },
            { 
              x: config.endX,
              y: config.endY,
              scale: config.scale,
              opacity: 1,
              zIndex: config.zIndex,
              duration: 0.8,
              ease: "power2.out"
            }, index * 0.1 + 0.3);
        }
      });      

      // part 2: 主要元素動畫 (優化temple和village的流暢度)
      tlMain
        .fromTo(rightTemple.current, 
          { 
            x: "60vw",
            y: "35vh",
            scale: 0.9, // 從更接近最終大小開始
            opacity: 0,
            force3D: false
          },
          { 
            x: "60vw",
            y: "25vh",
            scale: 1.4,
            opacity: 1,
            duration: 1.0, // 稍微延長時間讓動畫更順暢
            zIndex: 17,
            ease: "power2.out" // 改用更流暢的緩動
          }, 1.2)
        .fromTo(leftTemple.current, 
          { 
            x: "20vw",
            y: "40vh",
            scale: 1.0, // 從更接近最終大小開始，減少縮放幅度
            opacity: 0,
            force3D: false
          },
          { 
            x: "20vw",
            y: "35vh",
            scale: 1.3, // 減少最終縮放，從1.4降到1.3
            opacity: 1,
            duration: 1, // 延長時間讓動畫更平順
            zIndex: 17,
            ease: "power1.out" // 使用更溫和的緩動函數
          }, 1.8) // 進一步延後，給更多時間間隔
        .fromTo(villiage.current, 
          { 
            x: "50vw",
            y: "45vh",
            scale: 0.9,
            opacity: 0,
            force3D: false
          },
          { 
            x: "55vw",
            y: "50vh",
            scale: 1.4,
            opacity: 1,
            duration: 1.0,
            zIndex: 17,
            ease: "power2.out"
          }, 3)
        .fromTo(leopard.current, 
          { 
            x: "10vw",
            y: "50vh",
            scale: 0.7, // 添加起始縮放
            opacity: 0,
            force3D: false
          },
          { 
            x: "7vw",
            y: "50vh",
            scale: 0.8,
            opacity: 1,
            duration: 1.0,
            zIndex: 17,
            ease: "power1.out" // 添加缺失的緩動
          }, 3.5) // 調整時間避免與village衝突
        .fromTo(bear.current, 
          { 
            x: "65vw",
            y: "-10vh", // 使用負值讓熊從螢幕上方開始
            scale: 0.35, // 添加起始縮放
            opacity: 0,
            force3D: false
          },
          { 
            x: "65vw",
            y: "-5vh", // 最終位置也可以用負值讓熊在更上方
            scale: 0.3,
            opacity: 1,
            duration: 1.0,
            zIndex: 5,
            ease: "power1.out"
          }, 4.0) 
        .fromTo(taiwan.current, 
          { 
            x: "38vw",
            y: "19vh",
            rotation: 0,
            scale: 1.0, // 稍微調整起始大小
            opacity: 0,
            force3D: false
          },
          { 
            x: "38vw",
            y: "19vh",
            rotation: 0,
            scale: 1.3,
            opacity: 1,
            zIndex:30,
            duration: 1.4, // 稍微延長讓大幅縮放更順暢
            ease: "power2.out"
          }, 5.0); // 確保與其他動畫不重疊

      // wave animation with dynamic z-index changes
      // gsap.timeline()
      //   .fromTo(wave.current, 
      //     {
      //       x: "0vw",
      //       y: "15vh",
      //       opacity: 0,
      //       zIndex: 15  // Start below boat (z-20) and taiwan (z-30)
      //     },
      //     {
      //       x: "25vw", // Flow across screen
      //       y: "15vh",
      //       opacity: 1,
      //       duration: 4,
      //       ease: "none", // Linear flow for wave
      //       delay: 2.5
      //     }
      //   )
      //   // When wave reaches boat area, keep it below boat
      //   .to(wave.current, {
      //     zIndex: 15, // Stay below boat (z-20)
      //     duration: 0.1
      //   }, 3) // At 3 seconds into wave animation
        
      //   // When wave reaches taiwan area, move it above taiwan
      //   .to(wave.current, {
      //     zIndex: 35, // Move above taiwan (z-30)
      //     duration: 0.1
      //   }, 3.8) // At 3.8 seconds into wave animation
        
      //   // After passing taiwan, can go back to lower level
      //   .to(wave.current, {
      //     zIndex: 15,
      //     duration: 0.1
      //   }, 4.5);

      // Set initial states for text elements
      gsap.set([titleRef.current, descriptionRef.current], { 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        force3D: false // 文字也保持高品質
      });

      // Main text animation sequence - 調整時間避免與temple/village衝突
      tlText.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out", // 與其他動畫統一緩動
        delay: 6.0  // 稍微延後開始避免衝突
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8, // 稍微延長
        ease: "power2.out"
      }, 6.3);

    });

    return () => ctx.revert();
  }, [mountainBackConfigs, mountainConfigs]);

  return (
    <section 
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden bg-white"
    >
      {/* Navigation */}
      <Navigation variant="main" />

      {/* Background Layer */}
      <div 
        className="absolute inset-0 origin-center"
      >
        {/* Add your background image here if needed */}
      </div>
      
      
      
      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-amber-50 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-shadow-lg leading-tight text-amber-100"
          >
            文化記憶庫
          </h1>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="font-body text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 text-shadow-md max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed text-slate-100"
          >
            踏上一段穿越時空的文化旅程，發現各民族獨特的傳統、藝術與智慧
          </p>
        </div>
        
        {/* Animated Elements - 保持高畫質 */}
        {mountainBackConfigs.map((config, index) => (
          <Image
            key={index}
            ref={(el) => {
              mountainBackRefs.current[index] = el;
            }}
            src="/animation/mountainBack.svg"
            alt={`Mountain back animation ${index + 1}`}
            width={700}
            height={833}
            className="absolute inset-0 opacity-0"
            style={{ 
              imageRendering: 'auto', // 保持高品質渲染
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)', // 更溫和的GPU加速
            }}
            priority
            quality={100} // 最高品質
          />
        ))};
        {mountainConfigs.map((config, index) => (
          <Image
            key={index}
            ref={(el) => {
              mountainRefs.current[index] = el;
            }}
            src="/animation/mountain.svg"
            alt={`Mountain animation ${index + 1}`}
            width={400}
            height={400}
            className="absolute inset-0 opacity-0"
            style={{ 
              imageRendering: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)',
            }}
            priority
            quality={100}
          />
        ))};
        <Image
          ref={rightTemple}
          src="/animation/rightTemple.svg"
          alt="right temple animation"
          width={400}
          height={400}
          className="absolute inset-0 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}/>
        <Image
          ref={leftTemple}
          src="/animation/leftTemple.svg"
          alt="left temple animation"
          width={400}
          height={400}
          className="absolute inset-0 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}/>
        <Image
          ref={villiage}
          src="/animation/villiage.svg"
          alt="villiage animation"
          width={400}
          height={400}
          className="absolute inset-0 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}/>
        <Image
        ref={leopard}
        src="/animation/leopard.svg"
        alt="leopard animation"
        width={400}
        height={400}
        className="absolute inset-0 opacity-0"
        style={{ 
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
        priority
        quality={100}/>
        <Image
        ref={bear}
        src="/animation/bear.svg"
        alt="bear animation"
        width={400}
        height={400}
        className="absolute inset-0 opacity-0"
        style={{ 
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
        priority
        quality={100}/>
        <Image
          ref={boat}
          src="/animation/boat.svg"
          alt="Boat animation"
          width={400}
          height={400}
          className="absolute z-20 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}/>

        <Image
          ref={taiwan}
          src="/animation/taiwan.svg"
          alt="Taiwan animation"
          width={400}
          height={400}
          className="absolute inset-0 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}
        />

        <Image
          ref={wave}
          src="/animation/wave.svg"
          alt="Wave animation"
          width={2270}
          height={833}
          className="absolute inset-0 w-full h-full z-15 opacity-0"
          style={{ 
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
          }}
          priority
          quality={100}
        />

      </div>
    </section>
  );
}
