import { gsap } from 'gsap';
import { Breakpoint } from './animationConfigs';

/**
 * 取得當前裝置斷點
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1400) return 'bigTablet';  // 修正為與 MainVisual.tsx 一致
  if (width < 1920) return 'desktop';
  return 'bigscreen';
};

/**
 * 計算bigscreen以上螢幕的動態scale因子
 * 基準：1920px = 1.0倍，螢幕越寬scale越大
 */
export const calculateDynamicScale = (baseScale: number): number => {
  if (typeof window === 'undefined') return baseScale;
  
  const width = window.innerWidth;
  
  // 只對bigscreen (≥1920px) 進行動態縮放
  if (width < 1920) return baseScale;
  
  // 計算寬度比例，以1920px為基準
  const widthRatio = width / 1920;
  
  // 動態調整scale，但設定最大和最小限制避免過度縮放
  const dynamicScale = baseScale * widthRatio;
  
  // 限制scale範圍：最小為原始scale，最大為原始scale的2倍
  return Math.min(Math.max(dynamicScale, baseScale), baseScale * 2);
};

/**
 * 創建具有硬體加速的 GSAP 動畫
 */
export const createHardwareAcceleratedAnimation = (
  target: string | Element,
  properties: gsap.TweenVars,
  timeline?: gsap.core.Timeline
) => {
  const enhancedProps = {
    ...properties,
    force3D: true,
    transformOrigin: "center center",
  };

  if (timeline) {
    return timeline.to(target, enhancedProps);
  }
  
  return gsap.to(target, enhancedProps);
};

/**
 * 預載入圖片
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  return Promise.all(
    imagePaths.map((path) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
        img.src = path;
      });
    })
  );
};

/**
 * 防抖函數
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * 節流函數
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
