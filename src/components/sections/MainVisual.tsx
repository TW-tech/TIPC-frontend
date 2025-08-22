"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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

interface AnimationConfig {
  to: {
    x: string;
    y: string;
    scale: number;
    xPercent: number;
    yPercent: number;
  };
}

interface ConfigObject {
  taiwan: AnimationConfig;
  general: AnimationConfig;
  red: AnimationConfig;
  blue: AnimationConfig;
  lion?: AnimationConfig;
  rightTemple?: AnimationConfig;
  leftTemple?: AnimationConfig;
  leopard?: AnimationConfig;
  bear?: AnimationConfig;
  boat?: AnimationConfig;
  noodle?: AnimationConfig;
  [key: string]: AnimationConfig | undefined;
}

export default function MainVisual() {
  // Loading 狀態管理
  const [isLoading, setIsLoading] = useState(true);
  
  // 響應式狀態管理
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');
  const [isClient, setIsClient] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  
  // Windows效能優化狀態
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  
  // 添加視窗大小變化追踪
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shouldReplayAnimation, setShouldReplayAnimation] = useState(false);

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
  const lionRef = useRef<HTMLImageElement>(null);
  const rightTempleRef = useRef<HTMLImageElement>(null);
  const leftTempleRef = useRef<HTMLImageElement>(null);
  const generalRef = useRef<HTMLImageElement>(null);
  const leopardRef = useRef<HTMLImageElement>(null);
  const bearRef = useRef<HTMLImageElement>(null);
  const boatRef = useRef<HTMLImageElement>(null);
  const noodleRef = useRef<HTMLImageElement>(null);
  const redRef = useRef<HTMLImageElement>(null);
  const taiwanRef = useRef<HTMLImageElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);

  const elementRefs = useMemo(() => ({
    lion: lionRef,
    rightTemple: rightTempleRef,
    leftTemple: leftTempleRef,
    general: generalRef,
    leopard: leopardRef,
    bear: bearRef,
    boat: boatRef,
    noodle: noodleRef,
    red: redRef,
    taiwan: taiwanRef,
    blue: blueRef,
  }), []);

  // 客戶端檢測和響應式狀態管理 + 僅Windows效能監控
  useEffect(() => {
    setIsClient(true);
    let resizeTimeout: NodeJS.Timeout;
    
    // 只對Windows用戶進行效能監控，Mac用戶跳過
    const userAgent = navigator.userAgent.toLowerCase();
    const isWindows = userAgent.includes('windows');
    const isMac = userAgent.includes('mac') || userAgent.includes('darwin');
    
    const monitorPerformance = () => {
      // Mac用戶直接設為高效能模式，不需要監控
      if (isMac) {
        setPerformanceMode('high');
        return;
      }
      
      // 只有Windows用戶才需要效能監控
      if (isWindows) {
        const now = performance.now();
        const elapsed = now - lastTimeRef.current;
        frameCountRef.current++;
        
        // 每2秒檢查一次幀率
        if (elapsed >= 2000) {
          const fps = (frameCountRef.current / elapsed) * 1000;
          
          // 根據幀率調整效能模式
          if (fps < 30) {
            setPerformanceMode('low');
          } else if (fps < 50) {
            setPerformanceMode('medium');
          } else {
            setPerformanceMode('high');
          }
          
          frameCountRef.current = 0;
          lastTimeRef.current = now;
        }
        
        if (!isLoading) {
          requestAnimationFrame(monitorPerformance);
        }
      } else {
        // 其他系統默認高效能
        setPerformanceMode('high');
      }
    };
    
    if (!isLoading) {
      requestAnimationFrame(monitorPerformance);
    }
    
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 檢查視窗大小是否有顯著變化
      const previousWidth = windowSize.width;
      const previousHeight = windowSize.height;
      const widthChange = Math.abs(width - previousWidth);
      const heightChange = Math.abs(height - previousHeight);
      
      // 更新視窗大小
      setWindowSize({ width, height });
      
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
      } else if (width < BREAKPOINTS.BIGSCREEN) {
        setCurrentBreakpoint('desktop');
      } else {
        setCurrentBreakpoint('bigscreen');
      }
      
      // 節流處理：如果視窗大小變化超過100px，且不在loading狀態，延遲觸發動畫重播
      // 同時檢查斷點是否實際改變，避免相同斷點內的小幅調整
      if ((widthChange > 100 || heightChange > 100) && previousWidth > 0 && !isLoading) {
        // 清除之前的timeout
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        
        // 延遲500ms執行，避免頻繁觸發
        resizeTimeout = setTimeout(() => {
          setShouldReplayAnimation(true);
        }, 500);
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => {
      window.removeEventListener('resize', updateBreakpoint);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [windowSize.width, windowSize.height, isLoading]);

  // RWD Animation configurations - 根據螢幕尺寸調整
  const animationConfigs = useMemo(() => {
    console.log('Current breakpoint:', currentBreakpoint); // Debug log
    
    // 使用動態配置來處理bigscreen的scale調整
    const config = getDynamicAnimationConfig(currentBreakpoint, calculateDynamicScale);
    console.log('Config for', currentBreakpoint, ':', config); // Debug log
    
    // 基礎動畫 - 根據裝置類型顯示不同元素
    const baseAnimations = [];

    // tablet、bigTablet 和 desktop 才顯示廟宇元素
    if (currentBreakpoint !== 'mobile') {
      const fullConfig = config as ConfigObject;
      if (fullConfig.lion) {
        baseAnimations.push({
          ref: elementRefs.lion,
          to: { ...fullConfig.lion.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (fullConfig.lion.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.RIGHT_TEMPLE
        });
      }
      if (fullConfig.leftTemple) {
        baseAnimations.push({
          ref: elementRefs.leftTemple,
          to: { ...fullConfig.leftTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.leftTemple.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.LEFT_TEMPLE
        });
      }
      if (fullConfig.rightTemple) {
        baseAnimations.push({
          ref: elementRefs.rightTemple,
          to: { ...fullConfig.rightTemple.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power1.out", scale: (fullConfig.rightTemple.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.RIGHT_TEMPLE
        });
      }
    }

    // 只有非手機裝置顯示村莊元素
    if (currentBreakpoint !== 'mobile') {
      // 其他裝置使用完整配置的 general
      const fullConfig = config as ConfigObject;
      if (fullConfig.general) {
        baseAnimations.push({
          ref: elementRefs.general,
          to: { ...fullConfig.general.to, opacity: 1, zIndex: 17, duration: 0.3, ease: "power2.out", scale: (fullConfig.general.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.VILLAGE
        });
      }
    }

    // desktop、bigTablet 和 bigscreen 才顯示 leopard 和 bear 元素
    if (currentBreakpoint === 'desktop' || currentBreakpoint === 'bigscreen' || currentBreakpoint === 'bigTablet') {
      const fullConfig = config as ConfigObject;
      console.log('Leopard/Bear config check:', { currentBreakpoint, hasLeopard: !!fullConfig?.leopard, hasBear: !!fullConfig?.bear }); // Debug log
      
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
    if (currentBreakpoint !== 'mobile') {
      const fullConfig = config as ConfigObject;
      if (fullConfig.boat) {
        baseAnimations.push({
          ref: elementRefs.boat,
          to: { ...fullConfig.boat.to, opacity: 1, zIndex: 20, duration: 0.4, ease: "power2.out", scale: (fullConfig.boat.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.BOAT
        });
      }
    }

    // 只有 desktop、bigTablet 和 bigscreen 才顯示 noodle 元素
    if (currentBreakpoint === 'desktop' || currentBreakpoint === 'bigscreen' || currentBreakpoint === 'bigTablet') {
      const fullConfig = config as ConfigObject;
      if (fullConfig.noodle) {
        baseAnimations.push({
          ref: elementRefs.noodle,
          to: { ...fullConfig.noodle.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power1.out", scale: (fullConfig.noodle.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.NOODLE
        });
      }
    }

    // Red, blue, taiwan, noodle 元素 - 根據裝置顯示
    baseAnimations.push(
      {
        ref: elementRefs.red,
        to: { ...config.red.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.red.to.scale || 1) * scaleFactor },
        delay: currentBreakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.RED : ANIMATION_DELAYS.DESKTOP.RED
      },
      {
        ref: elementRefs.blue,
        to: { ...config.blue.to, opacity: 1, zIndex: 30, duration: 0.3, ease: "power2.out", scale: (config.blue.to.scale || 1) * scaleFactor },
        delay: currentBreakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.BLUE : ANIMATION_DELAYS.DESKTOP.BLUE
      },
      {
        ref: elementRefs.taiwan,
        to: { ...config.taiwan.to, opacity: 1, zIndex: 30, duration: 0.35, ease: "power2.out", scale: (config.taiwan.to.scale || 1) * scaleFactor },
        delay: currentBreakpoint === 'mobile' ? ANIMATION_DELAYS.MOBILE.TAIWAN : ANIMATION_DELAYS.DESKTOP.TAIWAN
      }
    );

    // Add noodle for mobile or desktop+ devices that have it
    if (currentBreakpoint === 'mobile') {
      // Mobile noodle - cast to extended config type
      const mobileConfig = config as ConfigObject;
      if (mobileConfig.noodle) {
        baseAnimations.push({
          ref: elementRefs.noodle,
          to: { ...mobileConfig.noodle.to, opacity: 1, zIndex: 25, duration: 0.3, ease: "power2.out", scale: (mobileConfig.noodle.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.MOBILE.TAIWAN + 0.3
        });
      }
    } else {
      // Desktop+ noodle
      const fullConfig = config as ConfigObject;
      if (fullConfig.noodle) {
        baseAnimations.push({
          ref: elementRefs.noodle,
          to: { ...fullConfig.noodle.to, opacity: 1, zIndex: 25, duration: 0.3, ease: "power2.out", scale: (fullConfig.noodle.to.scale || 1) * scaleFactor },
          delay: ANIMATION_DELAYS.DESKTOP.NOODLE
        });
      }
    }

    return baseAnimations;
  }, [currentBreakpoint, elementRefs, scaleFactor]);

  // SVG configurations - 根據裝置類型顯示不同元素 (SSR 安全)
  const getResponsiveSvgConfigs = useCallback(() => {
    const isMobile = isClient && currentBreakpoint === 'mobile';
    const isTablet = isClient && currentBreakpoint === 'tablet';
    const isBigTablet = isClient && currentBreakpoint === 'bigTablet';
    
    // 手機版本顯示台灣、麵條、紅色、藍色元素
    const mobileConfigs = [
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", width: 300, height: 300, mobileWidth: 300, mobileHeight: 300 },
      { ref: elementRefs.noodle, src: "/animation/noodle.svg", alt: "noodle animation", width: 80, height: 80, mobileWidth: 80, mobileHeight: 80 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", width: 60, height: 60, mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 平板版本 (不包含 leopard, bear, 和 noodle)
    const tabletConfigs = [
      { ref: elementRefs.lion, src: "/animation/lion.svg", alt: "lion animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.general, src: "/animation/general.svg", alt: "general animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.boat, src: "/animation/boatWithWaveAndFish.svg", alt: "boat animation", mobileWidth: 90, mobileHeight: 90 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 60, mobileHeight: 60 },
    ];
    
    // 大平板版本 (包含所有元素，尺寸較大)
    const bigTabletConfigs = [
      { ref: elementRefs.lion, src: "/animation/lion.svg", alt: "lion animation", mobileWidth: 140, mobileHeight: 140 },
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.general, src: "/animation/general.svg", alt: "general animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.leopard, src: "/animation/leopard.svg", alt: "leopard animation", mobileWidth: 85, mobileHeight: 85 },
      { ref: elementRefs.bear, src: "/animation/bear.svg", alt: "bear animation", mobileWidth: 65, mobileHeight: 65 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 150, mobileHeight: 150 },
      { ref: elementRefs.boat, src: "/animation/boatWithWaveAndFish.svg", alt: "boat animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.noodle, src: "/animation/noodle.svg", alt: "noodle animation", mobileWidth: 85, mobileHeight: 85 },
      { ref: elementRefs.red, src: "/animation/red.svg", alt: "red animation", mobileWidth: 75, mobileHeight: 75 },
      { ref: elementRefs.blue, src: "/animation/blue.svg", alt: "blue animation", mobileWidth: 75, mobileHeight: 75 },
    ];
    
    // 桌面版本 (包含所有元素)
    const desktopConfigs = [
      { ref: elementRefs.lion, src: "/animation/lion.svg", alt: "lion animation", mobileWidth: 120, mobileHeight: 120 },
      { ref: elementRefs.rightTemple, src: "/animation/rightTemple.svg", alt: "right temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.leftTemple, src: "/animation/leftTemple.svg", alt: "left temple animation", mobileWidth: 100, mobileHeight: 100 },
      { ref: elementRefs.general, src: "/animation/general.svg", alt: "general animation", mobileWidth: 110, mobileHeight: 110 },
      { ref: elementRefs.leopard, src: "/animation/leopard.svg", alt: "leopard animation", mobileWidth: 80, mobileHeight: 80 },
      { ref: elementRefs.bear, src: "/animation/bear.svg", alt: "bear animation", mobileWidth: 60, mobileHeight: 60 },
      { ref: elementRefs.taiwan, src: "/animation/taiwan.svg", alt: "Taiwan animation", mobileWidth: 130, mobileHeight: 130 },
      { ref: elementRefs.boat, src: "/animation/boatWithWaveAndFish.svg", alt: "boat animation", mobileWidth: 90, mobileHeight: 90 },
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
  
  // Windows效能優化CSS樣式 - 避免SSR hydration mismatch
  const optimizedStyles = useMemo(() => {
    // 只在客戶端執行時才應用平台特定樣式，避免SSR mismatch
    if (!isClient) {
      return {
        container: {},
        animation: {}
      };
    }
    
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const isWindows = userAgent.includes('windows');
    const isMac = userAgent.includes('mac') || userAgent.includes('darwin');
    
    return {
      container: {
        // Mac用戶保持最佳效能設定
        ...(isMac && {
          backfaceVisibility: 'hidden' as const,
          perspective: '1000px',
          transformStyle: 'preserve-3d' as const,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }),
        // Windows用戶才需要條件性優化
        ...(isWindows && {
          backfaceVisibility: 'hidden' as const,
          perspective: '1000px',
          transformStyle: 'preserve-3d' as const,
          // 只在高效能模式下使用GPU加速
          ...(performanceMode === 'high' && {
            willChange: 'transform',
            transform: 'translateZ(0)',
          })
        })
      },
      animation: {
        // Mac用戶保持最佳動畫設定
        ...(isMac && {
          animationFillMode: 'forwards' as const,
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          backfaceVisibility: 'hidden' as const,
          willChange: 'transform, opacity',
        }),
        // Windows用戶才需要條件性優化
        ...(isWindows && performanceMode !== 'high' && {
          animationFillMode: 'forwards' as const,
          animationTimingFunction: 'ease-out',
          backfaceVisibility: 'hidden' as const,
        })
      }
    };
  }, [performanceMode, isClient]);

  // Initialize animations - 只在loading完成後執行
  useGSAP(() => {
    // 如果還在loading，不執行動畫
    if (isLoading) {
      return;
    }
    
    // 清除之前的動畫重播標記
    if (shouldReplayAnimation) {
      setShouldReplayAnimation(false);
    }
    
    // 只清除 MainVisual 相關的動畫
    const mainVisualElements = [
      ...mountainBackRefs.current.filter(Boolean),
      ...Object.values(elementRefs).map(ref => ref.current).filter(Boolean),
      titleRef.current,
      descriptionRef.current
    ].filter(Boolean);
    
    // 只清除 MainVisual 元素的動畫
    gsap.killTweensOf(mainVisualElements);

    // 增強的效能檢測 - 只針對Windows用戶優化，避免SSR mismatch
    const isLowPerformance = () => {
      // 只在客戶端執行時才進行檢測，避免SSR mismatch
      if (!isClient) {
        return false;
      }
      
      // 用戶系統檢測
      const { deviceMemory } = navigator as {deviceMemory?: number};
      const userAgent = navigator.userAgent.toLowerCase();
      const isWindows = userAgent.includes('windows');
      const isMac = userAgent.includes('mac') || userAgent.includes('darwin');
      
      // Mac用戶永遠不被認為是低效能 - 保持原有的高品質動畫
      if (isMac) {
        return false;
      }
      
      // 只對Windows用戶進行嚴格的效能檢測
      if (isWindows) {
        const baseThreshold = 6; // Windows用戶需要更多核心才算高效能
        const memoryThreshold = 6; // Windows用戶需要更多記憶體
        
        // 結合即時效能監控結果（僅Windows）
        const realTimePerformanceIssue = performanceMode === 'low';
        
        return navigator.hardwareConcurrency < baseThreshold || 
               (deviceMemory && deviceMemory < memoryThreshold) ||
               (!navigator.userAgent.toLowerCase().includes('chrome') && !navigator.userAgent.toLowerCase().includes('firefox')) || // 非主流瀏覽器在Windows上表現較差
               realTimePerformanceIssue; // 即時效能監控結果
      }
      
      // 其他系統使用原有的寬鬆檢測
      return navigator.hardwareConcurrency < 4 || 
             (deviceMemory && deviceMemory < 4);
    };

    const lowPerf = isLowPerformance();

    // 創建優化的動畫時間軸，針對Windows用戶進行優化，避免SSR mismatch
    const tlBatch1 = gsap.timeline({ 
      defaults: { ease: isClient && lowPerf ? "power1.out" : "power2.out" },
      paused: false,
      autoRemoveChildren: true
    });
    
    const tlBatch2 = gsap.timeline({ 
      defaults: { ease: isClient && lowPerf ? "none" : "power2.out" }, // 只在客戶端應用優化
      paused: false,
      autoRemoveChildren: true,
      delay: isClient && lowPerf ? 0.3 : 0.5 // 只在客戶端調整延遲
    });

    const tlText = gsap.timeline({ 
      defaults: { ease: isClient && lowPerf ? "power1.out" : "power3.out" },
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
    
    // 設定初始狀態時就啟用硬體加速優化 - 針對Windows優化，避免SSR mismatch
    gsap.set(allElementRefs, { 
      opacity: 0,
      force3D: isClient ? !lowPerf : false, // 只在客戶端才應用平台特定設定
      backfaceVisibility: "hidden",
      willChange: isClient && !lowPerf ? "transform, opacity" : "auto", // 避免SSR時預先設定willChange
      transformStyle: isClient && !lowPerf ? "preserve-3d" : "flat",
      webkitBackfaceVisibility: "hidden", // 針對Webkit引擎優化
      mozBackfaceVisibility: "hidden" // 針對Firefox優化
    });

      // part 1: 分階段執行山脈動畫 - Windows效能優化
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
            duration: isClient && lowPerf ? 0.3 : 0.5, // 只在客戶端才應用效能調整
            ease: isClient && lowPerf ? "power1.out" : "power2.out",
            force3D: isClient ? !lowPerf : false, // 避免SSR mismatch
            transformOrigin: "center center",
            onComplete: () => {
              gsap.set(mountainElement, { willChange: "auto" });
            }
            }, index * (isClient && lowPerf ? 0.05 : 0.1)); // 只在客戶端才調整交錯延遲
        }
      });

      // part 2: 優化的分批次動畫 - 保持緊湊節奏
      animationConfigs.forEach(config => {
        if (config.ref.current) {
          // 根據動畫複雜度和時間點分配timeline，配合緊湊時間
          const isComplexAnimation = config.to.scale !== undefined && config.to.scale > 1.5;
          const timeline = isComplexAnimation || config.delay > 2.0 ? tlBatch2 : tlBatch1;
          const adjustedDelay = timeline === tlBatch2 ? config.delay - (isClient && lowPerf ? 0.3 : 0.5) : config.delay;
          
          timeline.to(config.ref.current,
            { 
              ...config.to,
              force3D: isClient ? !lowPerf : false, // 避免SSR mismatch
              transformOrigin: "center center",
              willChange: isClient && !lowPerf ? "transform, opacity" : "auto",
              // 針對Windows卡頓優化：減少不必要的重繪
              rotationZ: isClient && !lowPerf ? 0.01 : 0, // 避免SSR時設定rotationZ
              duration: isClient && lowPerf ? (config.to.duration || 0.7) * 0.7 : config.to.duration, // 只在客戶端調整動畫時間
              onComplete: () => {
                if (config.ref.current) {
                  gsap.set(config.ref.current, { willChange: "auto" });
                }
              }
            }, adjustedDelay);
        }
      });


      // Set initial states for text elements - Windows效能優化，避免SSR mismatch
      gsap.set([titleRef.current, descriptionRef.current], { 
        opacity: 0, 
        y: isClient && lowPerf ? 30 : 50, // 只在客戶端調整移動距離
        scale: isClient && lowPerf ? 0.95 : 0.9, // 只在客戶端調整縮放幅度
        force3D: isClient ? !lowPerf : false, // 避免SSR mismatch
        willChange: isClient && !lowPerf ? "transform, opacity" : "auto",
        transformOrigin: "center center"
      });

      // Main text animation sequence - 針對Windows用戶優化時間
      const textDelay = getCurrentBreakpoint() === 'mobile' ? 2.2 : ANIMATION_DELAYS.DESKTOP.TEXT;
      tlText.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isClient && lowPerf ? 0.15 : 0.25, // 只在客戶端調整動畫時間
        ease: isClient && lowPerf ? "power1.out" : "power2.out",
        delay: textDelay,
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
        duration: isClient && lowPerf ? 0.15 : 0.25, // 只在客戶端調整動畫時間
        ease: isClient && lowPerf ? "power1.out" : "power2.out",
        onComplete: () => {
          if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { willChange: "auto" });
          }
        }
      }, textDelay + (isClient && lowPerf ? 0.1 : 0.2)); // 只在客戶端調整間隔

  }, [isLoading, mountainBackConfigs, animationConfigs, elementRefs, shouldReplayAnimation]);

  // 效能監控和清理 useEffect - 只針對 MainVisual 元素
  useEffect(() => {
    let rafId: number;
    
    const optimizePerformance = () => {
      // 只檢查 MainVisual 相關的元素
      const mainVisualElements = [
        ...mountainBackRefs.current.filter(Boolean),
        ...Object.values(elementRefs).map(ref => ref.current).filter(Boolean),
        titleRef.current,
        descriptionRef.current
      ].filter(Boolean);
      
      // 檢查 MainVisual 元素是否還有動畫在執行
      const hasMainVisualAnimations = mainVisualElements.some(element => 
        gsap.isTweening(element)
      );
      
      if (!hasMainVisualAnimations) {
        // MainVisual 動畫完成後，清理 willChange 屬性
        mainVisualElements.forEach(element => {
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
        style={{ 
          backgroundColor: '#F09F6F',
          ...optimizedStyles.container
        }}
      >
      {/* Navigation */}
      <Navigation/>

      {/* Background Layer */}
      <div 
        className="absolute inset-0 origin-center"
      >
        {/* Add your background image here if needed */}
      </div>
      
      
      
      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-amber-50 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          {/* Main Title ．*/}
          <h1 
            ref={titleRef}
            className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 [text-shadow:8px_8px_6px_rgba(0,0,0,0.6)] leading-tight text-amber-100 opacity-0"
          >
            探索記憶．洞見未來
          </h1>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="font-body text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-12 [text-shadow:0px_0px_16px_rgba(0,0,0,0.8)] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto leading-relaxed text-slate-100 opacity-0 font-black"
          >
            透過對話與思辨讓台灣文化影響力被看見
          </p>
        </div>
        
        {/* Animated Elements - Windows效能優化，保持高畫質 */}
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
              src="/animation/mountainBack3.svg"
              alt={`Mountain back animation ${index + 1}`}
              width={width}
              height={height}
              className="absolute inset-0 opacity-0"
              style={{ 
                ...COMMON_IMAGE_STYLES,
                ...optimizedStyles.animation,
                contain: 'layout style paint', // 優化重排和重繪
                // 提高SVG渲染品質但不改變尺寸
                filter: 'contrast(1.05) saturate(1.1)', // 輕微提升對比度和飽和度
              }}
              priority={index < 2} // 前兩張圖片優先載入
              quality={100} // 強制使用最高品質
              unoptimized={true} // SVG不需要優化
            />
          );
        })}
        
        {/* Single SVG Elements - Windows效能優化，使用響應式配置 */}
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
                ...optimizedStyles.animation,
                contain: 'layout style paint',
                // 針對SVG的高品質渲染設定但不改變尺寸
                filter: 'contrast(1.05) saturate(1.1)', // 輕微提升對比度和飽和度
              }}
              priority={index < 3} // 核心元素優先載入
              quality={100} // 強制使用最高品質
              loading={index < 3 ? "eager" : "lazy"}
              sizes={isMobile ? "(max-width: 768px) 50vw" : "(max-width: 1024px) 30vw, 25vw"}
              unoptimized={true} // SVG不需要優化
            />
          );
        })}

        

      </div>
    </section>
    </>
  );
}
