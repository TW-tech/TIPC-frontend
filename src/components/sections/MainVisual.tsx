"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Navigation from '@/components/navigation/Navigation';
import LoadingScreen from '@/components/layout/LoadingScreen';

// 引入模組化配置
import { 
  BREAKPOINTS, 
  ANIMATION_DELAYS,
  IMAGES_TO_PRELOAD,
  SCALE_SETTINGS,
  getDynamicAnimationConfig,
  type Breakpoint 
} from './MainVisual/animationConfigs';

import { getDynamicMountainConfig, COMMON_IMAGE_STYLES } from './MainVisual/mountainConfigs';
import { getCurrentBreakpoint, calculateDynamicScale } from './MainVisual/utils';

export default function MainVisual() {
  // Loading 狀態管理
  const [isLoading, setIsLoading] = useState(true);
  
  // 響應式狀態管理
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');
  const [isClient, setIsClient] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Loading 完成處理函數
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Text content refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // SVG element refs
  const mountainBackRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  // Single elements refs - organized
  const rightTempleRef = useRef<HTMLImageElement>(null);
  const leftTempleRef = useRef<HTMLImageElement>(null);
  const villiageRef = useRef<HTMLImageElement>(null);
  const leopardRef = useRef<HTMLImageElement>(null);
  const bearRef = useRef<HTMLImageElement>(null);
  const boatRef = useRef<HTMLImageElement>(null);
  const noodleRef = useRef<HTMLImageElement>(null);
  const redRef = useRef<HTMLImageElement>(null);
  const taiwanRef = useRef<HTMLImageElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);

  const elementRefs = useMemo(() => ({
    rightTemple: rightTempleRef,
    leftTemple: leftTempleRef,
    villiage: villiageRef,
    leopard: leopardRef,
    bear: bearRef,
    boat: boatRef,
    noodle: noodleRef,
    red: redRef,
    taiwan: taiwanRef,
    blue: blueRef,
  }), []);

  // 客戶端檢測和響應式狀態管理
  useEffect(() => {
    setIsClient(true);
    
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 計算基於標準尺寸的縮放比例
      const scaleX = width / SCALE_SETTINGS.BASE_WIDTH;
      const scaleY = height / SCALE_SETTINGS.BASE_HEIGHT;
      const scale = Math.min(scaleX, scaleY); // 取較小值保持比例
      
      // 當螢幕寬度 > 1080px 或高度 > 1200px 時，固定縮放為 1，不隨螢幕變化
      if (width > SCALE_SETTINGS.LARGE_SCREEN_WIDTH || height > SCALE_SETTINGS.LARGE_SCREEN_HEIGHT) {
        setScaleFactor(1); // 固定縮放比例為 1，動畫不會移動或縮放
      } else if (width >= BREAKPOINTS.TABLET) {
        setScaleFactor(scale);
      } else {
        // 小於1024的設備保持原有邏輯
        setScaleFactor(Math.max(scale, SCALE_SETTINGS.MIN_SCALE)); // 限制最小縮放為0.5倍
      }
      
      if (width < BREAKPOINTS.MOBILE) {
        setCurrentBreakpoint('mobile');
      } else if (width < BREAKPOINTS.TABLET) {
        setCurrentBreakpoint('tablet');
      } else if (width < BREAKPOINTS.BIG_TABLET) {
        setCurrentBreakpoint('bigTablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // RWD Animation configurations - 根據螢幕尺寸調整
  const getResponsiveAnimationConfigs = useMemo(() => {
    return (breakpoint: Breakpoint) => {
      console.log('Current breakpoint:', breakpoint); // Debug log
      
      // 使用動態配置來處理bigscreen的scale調整
      const config = getDynamicAnimationConfig(breakpoint, calculateDynamicScale);
      console.log('Config for', breakpoint, ':', config); // Debug log
      
      // 基礎動畫 - 根據裝置類型顯示不同元素
      const baseAnimations = [];

      // tablet、bigTablet 和 desktop 才顯示廟宇元素
      if (breakpoint !== 'mobile') {
        const fullConfig = config;
        baseAnimations.push(
          {
            ref: elementRefs.rightTemple,
            to: { ...fullConfig.rightTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (fullConfig.rightTemple.to.scale || 1) * scaleFactor },
            delay: ANIMATION_DELAYS.DESKTOP.RIGHT_TEMPLE
          },
          {
            ref: elementRefs.leftTemple,
            to: { ...fullConfig.leftTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.leftTemple.to.scale || 1) * scaleFactor },
            delay: ANIMATION_DELAYS.DESKTOP.LEFT_TEMPLE
          }
        );
      }

      // 所有裝置都顯示村莊元素
      baseAnimations.push(
        {
          ref: elementRefs.villiage,
          to: { ...config.villiage.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (config.villiage.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.VILLAGE : ANIMATION_DELAYS.DESKTOP.VILLAGE
        }
      );

      // desktop 和 bigscreen 才顯示 leopard 和 bear 元素
      if (breakpoint === 'desktop' || breakpoint === 'bigscreen') {
        const fullConfig = config;
        console.log('Leopard/Bear config check:', { breakpoint, hasLeopard: !!fullConfig?.leopard, hasBear: !!fullConfig?.bear }); // Debug log
        
        if (fullConfig?.leopard) {
          baseAnimations.push({
            ref: elementRefs.leopard,
            to: { ...fullConfig.leopard.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.leopard.to.scale || 1) * scaleFactor },
            delay: ANIMATION_DELAYS.DESKTOP.LEOPARD
          });
        }
        
        if (fullConfig?.bear) {
          baseAnimations.push({
            ref: elementRefs.bear,
            to: { ...fullConfig.bear.to, opacity: 1, zIndex: 5, duration: 0.3, ease: "power1.out", scale: (fullConfig.bear.to.scale || 1) * scaleFactor },
            delay: ANIMATION_DELAYS.DESKTOP.BEAR
          });
        }
      }

      // tablet、bigTablet 和 desktop 都顯示其他元素，包括 boat
      if (breakpoint !== 'mobile') {
        const fullConfig = config;
        baseAnimations.push(
          {
            ref: elementRefs.boat,
            to: { ...fullConfig.boat.to, opacity: 1, zIndex: 20, duration: 0.4, ease: "power2.out", scale: (fullConfig.boat.to.scale || 1) * scaleFactor },
            delay: ANIMATION_DELAYS.DESKTOP.BOAT
          }
        );
      }

      // 只有 desktop 和 bigscreen 才顯示 noodle 元素
      if (breakpoint === 'desktop' || breakpoint === 'bigscreen') {
        const fullConfig = config;
        if (fullConfig.noodle) {
          baseAnimations.push(
            {
              ref: elementRefs.noodle,
              to: { ...fullConfig.noodle.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power1.out", scale: (fullConfig.noodle.to.scale || 1) * scaleFactor },
              delay: ANIMATION_DELAYS.DESKTOP.NOODLE
            }
          );
        }
      }

      // Red, blue, taiwan 元素 - 所有裝置都顯示
      baseAnimations.push(
        {
          ref: elementRefs.red,
          to: { ...config.red.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.red.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.RED : ANIMATION_DELAYS.DESKTOP.RED
        },
        {
          ref: elementRefs.blue,
          to: { ...config.blue.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.blue.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.BLUE : ANIMATION_DELAYS.DESKTOP.BLUE
        },
        {
          ref: elementRefs.taiwan,
          to: { ...config.taiwan.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power2.out", scale: (config.taiwan.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.TAIWAN : ANIMATION_DELAYS.DESKTOP.TAIWAN
        }
      );

      return baseAnimations;
    };
  }, [elementRefs, scaleFactor]);

  // 動態取得當前螢幕對應的動畫配置
  const animationConfigs = useMemo(() => {
    const breakpoint = getCurrentBreakpoint();
    return getResponsiveAnimationConfigs(breakpoint);
  }, [getResponsiveAnimationConfigs]);

  // SVG configurations - 根據裝置類型顯示不同元素 (SSR 安全)
  const getResponsiveSvgConfigs = useCallback(() => {
    const isMobile = isClient && currentBreakpoint === 'mobile';
    const isTablet = isClient && currentBreakpoint === 'tablet';
    const isBigTablet = isClient && currentBreakpoint === 'bigTablet';
    
    // 手機版本顯示台灣、村莊、魚、紅色、藍色元素
    const mobileConfigs = [
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", width: 300, height: 300, mobileWidth: 300, mobileHeight: 300 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", width: 110, height: 110, mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 平板版本 (不包含 leopard, bear, 和 noodle)
    const tabletConfigs = [
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.boat, src: "/animation/boatWIthWaveAndFish.svg", alt: "boat animation", mobileWidth: 90, mobileHeight: 90 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 大平板版本 (不包含 leopard, bear, 和 noodle，尺寸較大)
    const bigTabletConfigs = [
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 140, mobileHeight: 140 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 150, mobileHeight: 150 },
      { ref: elementRefs.boat, src: "/animation/boatWIthWaveAndFish.svg", alt: "boat animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 75, mobileHeight: 75 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 75, mobileHeight: 75 },
    ];
    
    // 桌面版本 (包含所有元素)
    const desktopConfigs = [
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.leopard, src: "/animation/leopard.svg", alt: "leopard animation", mobileWidth: 80, mobileHeight: 80 },
      { ref: elementRefs.bear, src: "/animation/bear.svg", alt: "bear animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.boat, src: "/animation/boatWIthWaveAndFish.svg", alt: "boat animation", mobileWidth: 90, mobileHeight: 90 },
      { ref: elementRefs.noodle, src: "/animation/noodle.svg", alt: "noodle animation", mobileWidth: 80, mobileHeight: 80 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 60, mobileHeight: 60 },
    ];
    
    if (isMobile) {
      return mobileConfigs;
    }
    if (isTablet) {
      return tabletConfigs;
    }
    if (isBigTablet) {
      return bigTabletConfigs;
    }
    return desktopConfigs;
  }, [isClient, currentBreakpoint, elementRefs]);

  const svgConfigs = useMemo(() => getResponsiveSvgConfigs(), [getResponsiveSvgConfigs]);

  // Mountain back configurations - RWD 支援
  const getResponsiveMountainBackConfigs = useMemo(() => {
    return (breakpoint: Breakpoint) => {
      // 使用動態配置來處理bigscreen的scale調整
      const mountainBackConfig = getDynamicMountainConfig(breakpoint, calculateDynamicScale);
      
      if (!mountainBackConfig || !mountainBackConfig.to) {
        return [];
      }
      
      // 當螢幕寬度 > 1080px 或高度 > 1200px 時，山脈也固定縮放為 1
      const currentWidth = typeof window !== 'undefined' ? window.innerWidth : SCALE_SETTINGS.BASE_WIDTH;
      const currentHeight = typeof window !== 'undefined' ? window.innerHeight : SCALE_SETTINGS.BASE_HEIGHT;
      let mountainScaleFactor;
      
      if (currentWidth > SCALE_SETTINGS.LARGE_SCREEN_WIDTH || currentHeight > SCALE_SETTINGS.LARGE_SCREEN_HEIGHT) {
        mountainScaleFactor = 1; // 固定為 1，不隨螢幕變化
      } else {
        // 山脈縮放邏輯：與其他元素保持一致，但有合理的上下限
        mountainScaleFactor = Math.max(Math.min(scaleFactor, 1.5), 0.7); // 限制在 0.7x - 1.5x 之間
      }
      
      return [{
        x: mountainBackConfig.to.x,
        y: mountainBackConfig.to.x, // Starting position same as end position for simplified animation
        endX: mountainBackConfig.to.x,
        endY: mountainBackConfig.to.y,
        scale: mountainBackConfig.to.scale * mountainScaleFactor,
        delay: 0,
        zIndex: 12,
        xPercent: mountainBackConfig.to.xPercent,
        yPercent: mountainBackConfig.to.yPercent
      }];
    };
  }, [scaleFactor]);

  // 動態取得當前螢幕對應的山脈背景配置
  const mountainBackConfigs = useMemo(() => {
    const breakpoint = getCurrentBreakpoint();
    return getResponsiveMountainBackConfigs(breakpoint);
  }, [getResponsiveMountainBackConfigs]);

  // Initialize animations - 只在loading完成後執行
  useEffect(() => {
    // 如果還在loading，不執行動畫
    if (isLoading) {
      return;
    }
    
    const ctx = gsap.context(() => {
      // 設定 GSAP 效能優化 - 針對卡頓問題的改進，保持連貫性
      gsap.config({ 
        force3D: true,
        nullTargetWarn: false,
        autoSleep: 30,
        units: { rotation: "rad", x: "px", y: "px" } // 統一單位提升效能
      });

      // 效能檢測 - 如果偵測到低效能設備，降低動畫複雜度
      const isLowPerformance = () => {
        // 簡單的效能檢測邏輯：基於CPU核心數
        const { deviceMemory } = navigator as {deviceMemory?: number};
        return navigator.hardwareConcurrency < 4 || 
               (deviceMemory && deviceMemory < 4); // 記憶體小於4GB
      };

      const lowPerf = isLowPerformance();

      // 創建優化的動畫時間軸，保持連貫性但減少同時渲染的元素
      const tlBatch1 = gsap.timeline({ 
        defaults: { ease: "power2.out" },
        paused: false,
        autoRemoveChildren: true
      });
      
      const tlBatch2 = gsap.timeline({ 
        defaults: { ease: lowPerf ? "power1.out" : "power2.out" },
        paused: false,
        autoRemoveChildren: true,
        delay: 0.5 // 更小的延遲以保持連貫性
      });

      const tlText = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        paused: false,
        autoRemoveChildren: true
      });

      // 立即設置 mountain back 的初始狀態，避免閃現
      gsap.set(mountainBackRefs.current.filter(Boolean), { 
        opacity: 0,
        visibility: "hidden" 
      });

      // 設置所有元素的初始狀態 - 優化渲染效能
      const allElementRefs = [
        ...mountainBackRefs.current.filter(Boolean),
        ...Object.values(elementRefs).map(ref => ref.current).filter(Boolean)
      ];
      
      // 設定初始狀態時就啟用硬體加速優化
      gsap.set(allElementRefs, { 
        opacity: 0,
        force3D: true,
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d"
      });
      gsap.set(allElementRefs, { 
        opacity: 0,
        force3D: false, // 避免過度的3D加速影響品質
        backfaceVisibility: "hidden",
        willChange: "transform, opacity", // 提前告知瀏覽器
        transformStyle: "preserve-3d" // 優化3D變換
      });

      // part 1: 分階段執行山脈動畫 (避免同時執行太多) - 效能優化
      const mountainTimeline = gsap.timeline({
        // 山脈動畫完成後清理資源
        onComplete: () => {
          mountainBackRefs.current.forEach(el => {
            if (el) {
              gsap.set(el, { willChange: "auto" });
            }
          });
        }
      });
      
      mountainBackConfigs.forEach((config, index) => {
        const mountainElement = mountainBackRefs.current[index];
        if (mountainElement) {
          mountainTimeline.to(mountainElement, { 
            x: config.endX,
            y: config.endY,
            scale: config.scale,
            opacity: 1,
            visibility: "visible",
            zIndex: config.zIndex,
            xPercent: config.xPercent,
            yPercent: config.yPercent,
            duration: 0.5,
            ease: "power2.out",
            force3D: true, // 啟用硬體加速
            transformOrigin: "center center",
            onComplete: () => {
              gsap.set(mountainElement, { willChange: "auto" });
            }
          }, index * 0.1);
        }
      });

      // part 2: 優化的分批次動畫 - 保持緊湊節奏
      animationConfigs.forEach(config => {
        if (config.ref.current) {
          // 根據動畫複雜度和時間點分配timeline，配合緊湊時間
          const isComplexAnimation = config.to.scale !== undefined && config.to.scale > 1.5;
          const timeline = isComplexAnimation || config.delay > 2.0 ? tlBatch2 : tlBatch1;
          const adjustedDelay = timeline === tlBatch2 ? config.delay - 0.5 : config.delay;
          
          timeline.to(config.ref.current,
            { 
              ...config.to,
              force3D: true,
              transformOrigin: "center center",
              willChange: "transform, opacity",
              // 針對卡頓優化：減少不必要的重繪
              rotationZ: 0.01, // 強制使用transform3d
              onComplete: () => {
                if (config.ref.current) {
                  gsap.set(config.ref.current, { willChange: "auto" });
                }
              }
            }, adjustedDelay);
        }
      });


      // Set initial states for text elements - 效能優化
      gsap.set([titleRef.current, descriptionRef.current], { 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        force3D: false, // 文字也保持高品質
        willChange: "transform, opacity",
        transformOrigin: "center center"
      });

      // Main text animation sequence - 配合更緊湊的動畫時間
      const textDelay = getCurrentBreakpoint() === 'mobile' ? 2.2 : ANIMATION_DELAYS.DESKTOP.TEXT;
      tlText.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        delay: textDelay,  // 根據裝置調整文字出現時間
        onComplete: () => {
          if (titleRef.current) {
            gsap.set(titleRef.current, { willChange: "auto" });
          }
        }
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { willChange: "auto" });
          }
        }
      }, textDelay + 0.2);

    });

    return () => ctx.revert();
  }, [isLoading, mountainBackConfigs, animationConfigs, elementRefs]);

  // 效能監控和清理 useEffect
  useEffect(() => {
    let rafId: number;
    
    const optimizePerformance = () => {
      // 檢查是否有動畫正在執行
      const hasRunningAnimations = gsap.globalTimeline.getChildren().length > 0;
      
      if (!hasRunningAnimations) {
        // 所有動畫完成後，清理 willChange 屬性
        const allElements = [
          ...mountainBackRefs.current.filter(Boolean),
          ...Object.values(elementRefs).map(ref => ref.current).filter(Boolean),
          titleRef.current,
          descriptionRef.current
        ].filter(Boolean);
        
        allElements.forEach(element => {
          if (element) {
            gsap.set(element, { willChange: "auto" });
          }
        });
      }
    };

    // 延遲執行優化，確保所有動畫都有機會完成
    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(optimizePerformance);
    }, 10000); // 10秒後檢查並優化

    return () => {
      clearTimeout(timeoutId);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [elementRefs]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen 
          images={[...IMAGES_TO_PRELOAD]}
          onLoadingComplete={handleLoadingComplete}
        />
      )}
      
      {/* Main Content */}
      <section 
        className="relative w-full h-screen overflow-hidden"
        style={{ backgroundColor: '#F09F6F' }}
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
            className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-shadow-lg leading-tight text-amber-100 opacity-0"
          >
            文化記憶庫
          </h1>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="font-body text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 text-shadow-md max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed text-slate-100 opacity-0"
          >
            踏上一段穿越時空的文化旅程，發現各民族獨特的傳統、藝術與智慧
          </p>
        </div>
        
        {/* Animated Elements - 高效能優化，保持高畫質 */}
        {mountainBackConfigs.map((config, index) => {
          const isMobile = isClient && currentBreakpoint === 'mobile';
          const width = isMobile ? 200 : 700;
          const height = isMobile ? 240 : 833;
          
          return (
            <img
              key={`mountainBack-${index}`}
              ref={(el) => {
                mountainBackRefs.current[index] = el;
              }}
              src="/animation/mountainBack3.svg"
              alt={`Mountain back animation ${index + 1}`}
              width={width}
              height={height}
              className="absolute inset-0 opacity-0"
              style={{ 
                ...COMMON_IMAGE_STYLES,
                contain: 'layout style paint', // 優化重排和重繪
              }}
              loading={index < 2 ? "eager" : "lazy"}
            />
          );
        })}
        
        {/* Single SVG Elements - 使用響應式配置，效能優化 */}
        {svgConfigs.map((config, index) => {
          const isMobile = isClient && currentBreakpoint === 'mobile';
          const width = isMobile ? (config.mobileWidth || 300) : 400;
          const height = isMobile ? (config.mobileHeight || 300) : 400;
          
          return (
            <Image
              key={`element-${config.alt}-${index}`}
              ref={config.ref}
              src={config.src}
              alt={config.alt}
              width={width}
              height={height}
              className="absolute inset-0 opacity-0"
              style={{
                ...COMMON_IMAGE_STYLES,
                contain: 'layout style paint',
              }}
              priority={index < 3} // 核心元素優先載入
              quality={100}
              loading={index < 3 ? "eager" : "lazy"}
              sizes={isMobile ? "(max-width: 768px) 50vw" : "(max-width: 1024px) 30vw, 25vw"}
            />
          );
        })}

        

      </div>
    </section>
    </>
  );
}
