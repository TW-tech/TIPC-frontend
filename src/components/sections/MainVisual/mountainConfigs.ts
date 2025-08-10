// 山脈配置
export const MOUNTAIN_BACK_CONFIGS = {
  mobile: {
    to: { x: "50vw", y: "50vh", scale: 11, xPercent: -50, yPercent: -50 }
  },
  tablet: {
    to: { x: "50vw", y: "50vh", scale:2.4, xPercent: -50, yPercent: -50 }
  },
  bigTablet: {
    to: { x: "50vw", y: "50vh", scale: 2.7, xPercent: -50, yPercent: -50 }
  },
  desktop: {
    to: { x: "52vw", y: "50vh", scale: 2.35, xPercent: -50, yPercent: -50 }
  },
  bigscreen: {
    to: { x: "52vw", y: "50vh", scale: 3.0, xPercent: -50, yPercent: -50 }
  }
} as const;

/**
 * 為bigscreen以上裝置動態調整山脈配置的scale
 */
export const getDynamicMountainConfig = (breakpoint: string, calculateDynamicScale: (baseScale: number) => number) => {
  const baseConfig = MOUNTAIN_BACK_CONFIGS[breakpoint as keyof typeof MOUNTAIN_BACK_CONFIGS];
  
  // 只對bigscreen進行動態調整
  if (breakpoint !== 'bigscreen' || !baseConfig) {
    return baseConfig;
  }
  
  // 創建動態調整後的配置
  const dynamicConfig = {
    ...baseConfig,
    to: {
      ...baseConfig.to,
      scale: calculateDynamicScale(baseConfig.to.scale)
    }
  };
  
  return dynamicConfig;
};

// 共用樣式配置
export const COMMON_IMAGE_STYLES = {
  imageRendering: 'auto' as const,
  backfaceVisibility: 'hidden' as const,
  transform: 'translate3d(0,0,0)',
  willChange: 'transform, opacity' as const,
  isolation: 'isolate' as const,
} as const;
