"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Navigation from '@/components/navigation/Navigation';

export default function MainVisual() {
  // 響應式狀態管理
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'bigTablet' | 'desktop'>('desktop');
  const [isClient, setIsClient] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Text content refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // SVG element refs
  const mountainBackRefs = useRef<(HTMLImageElement | null)[]>([]);
  const mountainRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  // Single elements refs - organized
  const rightTempleRef = useRef<HTMLImageElement>(null);
  const leftTempleRef = useRef<HTMLImageElement>(null);
  const villiageRef = useRef<HTMLImageElement>(null);
  const leopardRef = useRef<HTMLImageElement>(null);
  const bearRef = useRef<HTMLImageElement>(null);
  const boatRef = useRef<HTMLImageElement>(null);
  const waveRef = useRef<HTMLImageElement>(null);
  const fishRef = useRef<HTMLImageElement>(null);
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
    wave: waveRef,
    fish: fishRef,
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
      
      // 計算基於標準尺寸的縮放比例 (以1920x966為基準)
      const baseWidth = 1920;
      const baseHeight = 966;
      const scaleX = width / baseWidth;
      const scaleY = height / baseHeight;
      const scale = Math.min(scaleX, scaleY); // 取較小值保持比例
      
      // 測試：當螢幕寬度 > 1080px 或高度 > 1200px 時，固定縮放為 1，不隨螢幕變化
      if (width > 1080 || height > 1200) {
        setScaleFactor(1); // 固定縮放比例為 1，動畫不會移動或縮放
      } else if (width >= 1024) {
        setScaleFactor(scale);
      } else {
        // 小於1024的設備保持原有邏輯
        setScaleFactor(Math.max(scale, 0.5)); // 限制最小縮放為0.5倍
      }
      
      if (width < 768) {
        setCurrentBreakpoint('mobile');
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
      } else if (width < 1400) {
        setCurrentBreakpoint('bigTablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // 檢測螢幕尺寸並返回對應配置 (SSR 安全)
  const getCurrentBreakpoint = useCallback(() => {
    return isClient ? currentBreakpoint : 'desktop';
  }, [isClient, currentBreakpoint]);

  // RWD Animation configurations - 根據螢幕尺寸調整
  const getResponsiveAnimationConfigs = useMemo(() => {
    // 根據不同螢幕尺寸的配置
    const configs = {
      mobile: {
        // Mobile 配置 (< 768px) - 顯示台灣、村莊、魚、紅色、藍色元素
        taiwan: { 
          from: { x: "50vw", y: "50vh", scale: 1.2, xPercent: -50, yPercent: -50 }, 
          to: { x: "50vw", y: "50vh", scale: 2.5, xPercent: -50, yPercent: -50 } 
        },
        villiage: { 
          from: { x: "30vw", y: "65vh", scale: 0.6, xPercent: -50, yPercent: -50 }, 
          to: { x: "98vw", y: "65vh", scale: 8, xPercent: -50, yPercent: -50 } 
        },
        fish: { 
          from: { x: "70vw", y: "60vh", scale: 0.5, xPercent: -50, yPercent: -50 }, 
          to: { x: "20vw", y: "80vh", scale: 5, xPercent: -50, yPercent: -50 } 
        },
        red: { 
          from: { x: "20vw", y: "20vh", scale: 0.4, xPercent: -50, yPercent: -50 }, 
          to: { x: "90vw", y: "80vh", scale: 4, xPercent: -50, yPercent: -50 } 
        },
        blue: { 
          from: { x: "80vw", y: "25vh", scale: 0.4, xPercent: -50, yPercent: -50 }, 
          to: { x: "20vw", y: "25vh", scale: 5, xPercent: -50, yPercent: -50 } 
        }
      },
      tablet: {
        // Tablet 配置 (768px - 1024px) - 按比例縮小所有元素 (約0.8倍) 並左移
        rightTemple: { from: { x: "42vw", y: "32vh", scale: 0.72, xPercent: -50, yPercent: -50 }, to: { x: "88vw", y: "50vh", scale: 2.4, xPercent: -50, yPercent: -50 } },
        leftTemple: { from: { x: "20vw", y: "37vh", scale: 0.8, xPercent: -50, yPercent: -50 }, to: { x: "16vw", y: "45vh", scale: 2.4, xPercent: -50, yPercent: -50 } },
        villiage: { from: { x: "38vw", y: "42vh", scale: 0.72, xPercent: -50, yPercent: -50 }, to: { x: "80vw", y: "75vh", scale: 2.4, xPercent: -50, yPercent: -50 } },
        boat: { from: { x: "20vw", y: "50vh", scale: 0.56, xPercent: -50, yPercent: -50 }, to: { x: "22vw", y: "80vh", scale: 1.7, xPercent: -50, yPercent: -50 } },
        wave: { from: { x: "30vw", y: "79vh", scale: 0.72, xPercent: -50, yPercent: -50 }, to: { x: "22vw", y: "90vh", scale: 15, xPercent: -50, yPercent: -50 } },
        fish: { from: { x: "24vw", y: "47vh", scale: 0.4, xPercent: -50, yPercent: -50 }, to: { x: "23vw", y: "75vh", scale: 1, xPercent: -50, yPercent: -50 } },
        red: { from: { x: "20vw", y: "7vh", scale: 0.24, xPercent: -50, yPercent: -50 }, to: { x: "20vw", y: "22vh", scale: 0.7, xPercent: -50, yPercent: -50 } },
        blue: { from: { x: "36vw", y: "10vh", scale: 0.28, xPercent: -50, yPercent: -50 }, to: { x: "88vw", y: "22vh", scale: 1, xPercent: -50, yPercent: -50 } },
        taiwan: { from: { x: "50vw", y: "50vh", scale: 0.8, xPercent: -50, yPercent: -50 }, to: { x: "50vw", y: "50vh", scale: 2.5, xPercent: -50, yPercent: -50 } },
      },
      bigTablet: {
        // BigTablet 配置 (1024px - 1400px) - 介於 tablet 和 desktop 之間
        rightTemple: { from: { x: "55vw", y: "38vh", scale: 0.85, xPercent: -50, yPercent: -50 }, to: { x: "79vw", y: "46vh", scale: 1.9, xPercent: -50, yPercent: -50 } },
        leftTemple: { from: { x: "15vw", y: "37vh", scale: 0.9, xPercent: -50, yPercent: -50 }, to: { x: "28vw", y: "46vh", scale: 1.8, xPercent: -50, yPercent: -50 } },
        villiage: { from: { x: "45vw", y: "48vh", scale: 0.85, xPercent: -50, yPercent: -50 }, to: { x: "79vw", y: "70vh", scale: 2, xPercent: -50, yPercent: -50 } },
        boat: { from: { x: "22vw", y: "58vh", scale: 0.65, xPercent: -50, yPercent: -50 }, to: { x: "28vw", y: "78vh", scale: 1.4, xPercent: -50, yPercent: -50 } },
        wave: { from: { x: "38vw", y: "88vh", scale: 0.85, xPercent: -50, yPercent: -50 }, to: { x: "30vw", y: "91vh", scale: 13, xPercent: -50, yPercent: -50 } },
        fish: { from: { x: "26vw", y: "58vh", scale: 0.48, xPercent: -50, yPercent: -50 }, to: { x: "31vw", y: "72vh", scale: 0.8, xPercent: -50, yPercent: -50 } },
        red: { from: { x: "22vw", y: "2vh", scale: 0.28, xPercent: -50, yPercent: -50 }, to: { x: "38vw", y: "23vh", scale: 0.6, xPercent: -50, yPercent: -50 } },
        blue: { from: { x: "8vw", y: "2vh", scale: 0.32, xPercent: -50, yPercent: -50 }, to: { x: "18vw", y: "28vh", scale: 0.9, xPercent: -50, yPercent: -50 } },
        taiwan: { from: { x: "42vw", y: "15vh", scale: 0.95, xPercent: -50, yPercent: -50 }, to: { x: "51vw", y: "50vh", scale: 1.8, xPercent: -50, yPercent: -50 } }
      },
      desktop: {
        // Desktop 配置 (> 1400px) - 原本的配置
        rightTemple: { from: { x: "60vw", y: "40vh", scale: 0.9, xPercent: -50, yPercent: -50 }, to: { x: "75vw", y: "44vh", scale: 1.5, xPercent: -50, yPercent: -50 } },
        leftTemple: { from: { x: "12vw", y: "37vh", scale: 1.0, xPercent: -50, yPercent: -50 }, to: { x: "32vw", y: "47vh", scale: 1.5, xPercent: -50, yPercent: -50 } },
        villiage: { from: { x: "50vw", y: "50vh", scale: 0.9, xPercent: -50, yPercent: -50 }, to: { x: "75vw", y: "70vh", scale: 1.5, xPercent: -50, yPercent: -50 } },
        leopard: { from: { x: "5vw", y: "50vh", scale: 0.7, xPercent: -50, yPercent: -50 }, to: { x: "12vw", y: "64vh", scale: 1, xPercent: -50, yPercent: -50 } },
        bear: { from: { x: "65vw", y: "-10vh", scale: 0.35, xPercent: -50, yPercent: -50 }, to: { x: "80vw", y: "30vh", scale: 0.5, xPercent: -50, yPercent: -50 } },
        boat: { from: { x: "20vw", y: "62vh", scale: 0.7, xPercent: -50, yPercent: -50 }, to: { x: "30vw", y: "80vh", scale: 1.15, xPercent: -50, yPercent: -50 } },
        wave: { from: { x: "40vw", y: "94vh", scale: 0.9, xPercent: -50, yPercent: -50 }, to: { x: "31vw", y: "93vh", scale: 11.0, xPercent: -50, yPercent: -50 } },
        fish: { from: { x: "25vw", y: "61vh", scale: 0.5, xPercent: -50, yPercent: -50 }, to: { x: "33vw", y: "73vh", scale: 0.6, xPercent: -50, yPercent: -50 } },
        noodle: { from: { x: "73vw", y: "47vh", scale: 0.6, xPercent: -50, yPercent: -50 }, to: { x: "85vw", y: "80vh", scale: 0.65, xPercent: -50, yPercent: -50 } },
        red: { from: { x: "20vw", y: "0vh", scale: 0.3, xPercent: -50, yPercent: -50 }, to: { x: "42vw", y: "24vh", scale: 0.45, xPercent: -50, yPercent: -50 } },
        blue: { from: { x: "2vw", y: "1vh", scale: 0.35, xPercent: -50, yPercent: -50 }, to: { x: "16vw", y: "30vh", scale: 0.75, xPercent: -50, yPercent: -50 } },
        taiwan: { from: { x: "38vw", y: "10vh", scale: 1.0, xPercent: -50, yPercent: -50 }, to: { x: "53vw", y: "51vh", scale: 1.5, xPercent: -50, yPercent: -50 } }
      }
    };

    return (breakpoint: 'mobile' | 'tablet' | 'bigTablet' | 'desktop') => {
      const config = configs[breakpoint] || configs['desktop']; // 如果 bigTablet 沒有特定配置，則使用 desktop 配置
      
      // 基礎動畫 - 根據裝置類型顯示不同元素
      const baseAnimations = [];

      // tablet、bigTablet 和 desktop 才顯示廟宇元素
      if (breakpoint === 'tablet' || breakpoint === 'bigTablet' || breakpoint === 'desktop') {
        const fullConfig = configs[breakpoint] || configs['desktop'];
        baseAnimations.push(
          {
            ref: elementRefs.rightTemple,
            from: { ...fullConfig.rightTemple.from, opacity: 0 },
            to: { ...fullConfig.rightTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (fullConfig.rightTemple.to.scale || 1) * scaleFactor },
            delay: 1.0
          },
          {
            ref: elementRefs.leftTemple,
            from: { ...fullConfig.leftTemple.from, opacity: 0 },
            to: { ...fullConfig.leftTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.leftTemple.to.scale || 1) * scaleFactor },
            delay: 1.3
          }
        );
      }

      // 所有裝置都顯示村莊元素
      baseAnimations.push(
        {
          ref: elementRefs.villiage,
          from: { ...config.villiage.from, opacity: 0 },
          to: { ...config.villiage.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (config.villiage.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? 1.0 : 1.6
        }
      );

      // 只有 desktop 才顯示 leopard 和 bear 元素
      if (breakpoint === 'desktop') {
        const fullConfig = configs[breakpoint];
        baseAnimations.push(
          {
            ref: elementRefs.leopard,
            from: { ...fullConfig.leopard.from, opacity: 0 },
            to: { ...fullConfig.leopard.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.leopard.to.scale || 1) * scaleFactor },
            delay: 1.9
          },
          {
            ref: elementRefs.bear,
            from: { ...fullConfig.bear.from, opacity: 0 },
            to: { ...fullConfig.bear.to, opacity: 1, zIndex: 5, duration: 0.3, ease: "power1.out", scale: (fullConfig.bear.to.scale || 1) * scaleFactor },
            delay: 2.2
          },
        );
      }

      // tablet、bigTablet 和 desktop 都顯示其他元素
      if (breakpoint === 'tablet' || breakpoint === 'bigTablet' || breakpoint === 'desktop') {
        const fullConfig = configs[breakpoint] || configs['desktop'];
        baseAnimations.push(
          {
            ref: elementRefs.boat,
            from: { ...fullConfig.boat.from, opacity: 0 },
            to: { ...fullConfig.boat.to, opacity: 1, zIndex: 20, duration: 0.3, ease: "power2.out", scale: (fullConfig.boat.to.scale || 1) * scaleFactor },
            delay: 2.5
          },
          {
            ref: elementRefs.wave,
            from: { ...fullConfig.wave.from, opacity: 0 },
            to: { ...fullConfig.wave.to, opacity: 1, zIndex: 21, duration: 0.3, ease: "power2.out", scale: (fullConfig.wave.to.scale || 1) * scaleFactor },
            delay: 2.8
          }
        );
      }

      // 只有 desktop 才顯示 noodle 元素
      if (breakpoint === 'desktop') {
        const fullConfig = configs[breakpoint];
        baseAnimations.push(
          {
            ref: elementRefs.noodle,
            from: { ...fullConfig.noodle.from, opacity: 0 },
            to: { ...fullConfig.noodle.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power1.out", scale: (fullConfig.noodle.to.scale || 1) * scaleFactor },
            delay: 3.4
          }
        );
      }

      // Fish, red, blue, taiwan 元素 - 所有裝置都顯示
      baseAnimations.push(
        {
          ref: elementRefs.fish,
          from: { ...config.fish.from, opacity: 0 },
          to: { ...config.fish.to, opacity: 1, zIndex: 20, duration: 0.3, ease: "power2.out", scale: (config.fish.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? 1.3 : 3.1
        },
        {
          ref: elementRefs.red,
          from: { ...config.red.from, opacity: 0 },
          to: { ...config.red.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.red.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? 1.6 : 3.7
        },
        {
          ref: elementRefs.blue,
          from: { ...config.blue.from, opacity: 0 },
          to: { ...config.blue.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.blue.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? 1.9 : 4.0
        },
        {
          ref: elementRefs.taiwan,
          from: { ...config.taiwan.from, opacity: 0 },
          to: { ...config.taiwan.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power2.out", scale: (config.taiwan.to.scale || 1) * scaleFactor },
          delay: breakpoint === 'mobile' ? 2.2 : 4.3
        }
      );

      return baseAnimations;
    };
  }, [elementRefs, scaleFactor]);

  // 動態取得當前螢幕對應的動畫配置
  const animationConfigs = useMemo(() => {
    const breakpoint = getCurrentBreakpoint();
    return getResponsiveAnimationConfigs(breakpoint);
  }, [getResponsiveAnimationConfigs, getCurrentBreakpoint]);

  // SVG configurations - 根據裝置類型顯示不同元素 (SSR 安全)
  const getResponsiveSvgConfigs = useCallback(() => {
    const isMobile = isClient && currentBreakpoint === 'mobile';
    const isTablet = isClient && currentBreakpoint === 'tablet';
    const isBigTablet = isClient && currentBreakpoint === 'bigTablet';
    
    // 手機版本顯示台灣、村莊、魚、紅色、藍色元素
    const mobileConfigs = [
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", width: 300, height: 300, mobileWidth: 300, mobileHeight: 300 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", width: 110, height: 110, mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.fish, src: "/animation/fish.svg", alt: "fish animation", width: 70, height: 70, mobileWidth: 70, mobileHeight: 70 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 平板版本 (不包含 leopard, bear, 和 noodle)
    const tabletConfigs = [
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.boat, src: "/animation/boat.svg", alt: "Boat animation", mobileWidth: 90, mobileHeight: 90 },
      { ref: elementRefs.fish, src: "/animation/fish.svg", alt: "fish animation", mobileWidth: 70, mobileHeight: 70 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.wave, src: "/animation/wave.svg", alt: "wave animation", width: 50, height: 50, mobileWidth: 40, mobileHeight: 40 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 大平板版本 (不包含 leopard, bear, 和 noodle，尺寸較大)
    const bigTabletConfigs = [
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 140, mobileHeight: 140 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.villiage, src: "/animation/villiage.svg", alt: "villiage animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.boat, src: "/animation/boat.svg", alt: "Boat animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.fish, src: "/animation/fish.svg", alt: "fish animation", mobileWidth: 85, mobileHeight: 85 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 150, mobileHeight: 150 },
      { ref: elementRefs.wave, src: "/animation/wave.svg", alt: "wave animation", width: 60, height: 60, mobileWidth: 50, mobileHeight: 50 },
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
      { ref: elementRefs.boat, src: "/animation/boat.svg", alt: "Boat animation", mobileWidth: 90, mobileHeight: 90 },
      { ref: elementRefs.fish, src: "/animation/fish.svg", alt: "fish animation", mobileWidth: 70, mobileHeight: 70 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.wave, src: "/animation/wave.svg", alt: "wave animation", width: 50, height: 50, mobileWidth: 40, mobileHeight: 40 },
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

  // 共用的樣式配置 - 優化效能
  const commonImageStyles = useMemo(() => ({
    imageRendering: 'auto' as const,
    backfaceVisibility: 'hidden' as const,
    transform: 'translate3d(0,0,0)',
    willChange: 'transform, opacity' as const, // 提前告知瀏覽器將要變化的屬性
    isolation: 'isolate' as const, // 創建新的堆疊上下文，優化重繪
  }), []);

  // Mountain configurations - RWD 支援
  const getResponsiveMountainConfigs = useMemo(() => {
    const mountainBackConfigs = {
      mobile: [
        { x: "50vw", y: "20vh", endX: "55vw", endY: "25vh", scale: 6, delay: 0, zIndex: 12, xPercent: -50, yPercent: -50 },
        { x: "40vw", y: "45vh", endX: "45vw", endY: "45vh", scale: 6, delay: 0, zIndex: 14, xPercent: -50, yPercent: -50 },
        { x: "30vw", y: "70vh", endX: "35vw", endY: "70vh", scale: 6, delay: 0, zIndex: 16, xPercent: -50, yPercent: -50 }
      ],
      tablet: [
        { x: "2vw", y: "7vh", endX: "30vw", endY: "20vh", scale: 3, delay: 0, zIndex: 12, xPercent: -50, yPercent: -50 },
        { x: "2vw", y: "28vh", endX: "35vw", endY: "40vh", scale: 3, delay: 0, zIndex: 14, xPercent: -50, yPercent: -50 },
        { x: "2vw", y: "45vh", endX: "30vw", endY: "60vh", scale: 3, delay: 0, zIndex: 16, xPercent: -50, yPercent: -50 }
      ],
      bigTablet: [
        { x: "15vw", y: "8vh", endX: "38vw", endY: "30vh", scale: 2.7, delay: 0, zIndex: 12, xPercent: -50, yPercent: -50 },
        { x: "15vw", y: "30vh", endX: "35vw", endY: "65vh", scale: 2.5, delay: 0, zIndex: 14, xPercent: -50, yPercent: -50 },
        { x: "15vw", y: "48vh", endX: "32vw", endY: "90vh", scale: 2.7, delay: 0, zIndex: 16, xPercent: -50, yPercent: -50 }
      ],
      desktop: [
        { x: "25vw", y: "6vh", endX: "30vw", endY: "18vh", scale: 2.3, delay: 0, zIndex: 12, xPercent: -50, yPercent: -50 },
        { x: "25vw", y: "27vh", endX: "32vw", endY: "38vh", scale: 2.2, delay: 0, zIndex: 14, xPercent: -50, yPercent: -50 },
        { x: "25vw", y: "44vh", endX: "30vw", endY: "58vh", scale: 2.3, delay: 0, zIndex: 16, xPercent: -50, yPercent: -50 }
      ]
    };

    const mountainConfigs = {
      mobile: [
      ],
      tablet: [
      ],
      bigTablet: [
      ],
      desktop: [
        { x: "8vw", y: "55vh", endX: "10vw", endY: "68vh", scale: 1.5, delay: 0, zIndex: 18, xPercent: -50, yPercent: -50 }
      ]
    };

    return (breakpoint: 'mobile' | 'tablet' | 'bigTablet' | 'desktop') => {
      // 測試：當螢幕寬度 > 1080px 或高度 > 1200px 時，山脈也固定縮放為 1
      const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const currentHeight = typeof window !== 'undefined' ? window.innerHeight : 966;
      let mountainScaleFactor;
      
      if (currentWidth > 1080 || currentHeight > 1200) {
        mountainScaleFactor = 1; // 固定為 1，不隨螢幕變化
      } else {
        // 山脈縮放邏輯：與其他元素保持一致，但有合理的上下限
        mountainScaleFactor = Math.max(Math.min(scaleFactor, 1.5), 0.7); // 限制在 0.7x - 1.5x 之間
      }
      
      return {
        mountainBackConfigs: mountainBackConfigs[breakpoint].map(config => ({
          ...config,
          scale: config.scale * mountainScaleFactor,
          // 位置保持原始 vw/vh 值，不再額外調整，讓山脈與其他元素行為一致
          x: config.x,
          endX: config.endX,
          y: config.y,
          endY: config.endY
        })),
        mountainConfigs: mountainConfigs[breakpoint].map(config => ({
          ...config,
          scale: config.scale * mountainScaleFactor,
          // 位置保持原始 vw/vh 值，不再額外調整，讓山脈與其他元素行為一致
          x: config.x,
          endX: config.endX,
          y: config.y,
          endY: config.endY
        }))
      };
    };
  }, [scaleFactor]);

  // 動態取得當前螢幕對應的山脈配置
  const { mountainBackConfigs, mountainConfigs } = useMemo(() => {
    const breakpoint = getCurrentBreakpoint();
    return getResponsiveMountainConfigs(breakpoint);
  }, [getResponsiveMountainConfigs, getCurrentBreakpoint]);

  // Initialize animations
  useEffect(() => {
      const ctx = gsap.context(() => {
      // 設定 GSAP 效能優化
      gsap.config({ 
        force3D: false, // 避免不必要的 3D 加速
        nullTargetWarn: false,
        autoSleep: 60 // 60秒後自動休眠未使用的動畫
      });

      const tlText = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        paused: false,
        // 啟用智能渲染優化
        autoRemoveChildren: true
      });
      
      const tlMain = gsap.timeline({ 
        defaults: { ease: "power2.out" },
        paused: false,
        autoRemoveChildren: true
      });

      // 設置所有元素的初始狀態 (保持高品質)
      const allElementRefs = [
        ...mountainBackRefs.current.filter(Boolean),
        ...mountainRefs.current.filter(Boolean),
        ...Object.values(elementRefs).map(ref => ref.current).filter(Boolean)
      ];
      
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
          mountainRefs.current.forEach(el => {
            if (el) {
              gsap.set(el, { willChange: "auto" });
            }
          });
        }
      });
      
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
              xPercent: config.xPercent,
              yPercent: config.yPercent,
              force3D: false, // 保持品質
              transformOrigin: "center center" // 明確設定變換原點
            },
            { 
              x: config.endX,
              y: config.endY,
              scale: config.scale,
              opacity: 1,
              zIndex: config.zIndex,
              xPercent: config.xPercent,
              yPercent: config.yPercent,
              duration: 0.5,
              ease: "power2.out",
              // 動畫完成後優化
              onComplete: () => {
                gsap.set(mountainElement, { 
                  willChange: "auto",
                  transform: `translate(${config.endX}, ${config.endY}) scale(${config.scale})`
                });
              }
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
              xPercent: config.xPercent,
              yPercent: config.yPercent,
              force3D: false,
              transformOrigin: "center center"
            },
            { 
              x: config.endX,
              y: config.endY,
              scale: config.scale,
              opacity: 1,
              zIndex: config.zIndex,
              xPercent: config.xPercent,
              yPercent: config.yPercent,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(mountainElement, { 
                  willChange: "auto",
                  transform: `translate(${config.endX}, ${config.endY}) scale(${config.scale})`
                });
              }
            }, index * 0.1 + 0.3);
        }
      });      

      // part 2: 主要元素動畫 (使用配置化方式) - 效能優化
      animationConfigs.forEach(config => {
        if (config.ref.current) {
          tlMain.fromTo(config.ref.current,
            { 
              ...config.from,
              force3D: false,
              transformOrigin: "center center",
              willChange: "transform, opacity"
            },
            { 
              ...config.to,
              // 動畫完成後清理 willChange
              onComplete: () => {
                if (config.ref.current) {
                  gsap.set(config.ref.current, { willChange: "auto" });
                }
              }
            }, config.delay);
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

      // Main text animation sequence - 配合響應式動畫時間
      const textDelay = getCurrentBreakpoint() === 'mobile' ? 1.5 : 4.8;
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
  }, [mountainBackConfigs, mountainConfigs, animationConfigs, commonImageStyles, elementRefs, getCurrentBreakpoint]);

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
          ...mountainRefs.current.filter(Boolean),
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
    <section 
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden"
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
            <Image
              key={`mountainBack-${index}`}
              ref={(el) => {
                mountainBackRefs.current[index] = el;
              }}
              src="/animation/mountainBack.svg"
              alt={`Mountain back animation ${index + 1}`}
              width={width}
              height={height}
              className="absolute inset-0 opacity-0"
              style={{ 
                ...commonImageStyles,
                contain: 'layout style paint', // 優化重排和重繪
              }}
              priority={index < 2} // 只對前兩個元素設定 priority
              quality={100} // 最高品質
              loading={index < 2 ? "eager" : "lazy"} // 分階段載入
            />
          );
        })}
        {mountainConfigs.map((config, index) => {
          const isMobile = isClient && currentBreakpoint === 'mobile';
          const width = isMobile ? 150 : 400;
          const height = isMobile ? 150 : 400;
          
          return (
            <Image
              key={`mountain-${index}`}
              ref={(el) => {
                mountainRefs.current[index] = el;
              }}
              src="/animation/mountain.svg"
              alt={`Mountain animation ${index + 1}`}
              width={width}
              height={height}
              className="absolute inset-0 opacity-0"
              style={{ 
                ...commonImageStyles,
                contain: 'layout style paint',
              }}
              priority={index < 2}
              quality={100}
              loading={index < 2 ? "eager" : "lazy"}
            />
          );
        })}
        
        {/* Single SVG Elements - 使用響應式配置，效能優化 */}
        {svgConfigs.map((config, index) => {
          const isMobile = isClient && currentBreakpoint === 'mobile';
          const width = isMobile ? (config.mobileWidth || 300) : (config.width || 400);
          const height = isMobile ? (config.mobileHeight || 300) : (config.height || 400);
          
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
                ...commonImageStyles,
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
  );
}
