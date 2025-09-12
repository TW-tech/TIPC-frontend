// 動畫配置常數
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  BIG_TABLET: 1400,
  BIGSCREEN: 1920
} as const;

export const SCALE_SETTINGS = {
  BASE_WIDTH: 1920,
  BASE_HEIGHT: 966,
  MIN_SCALE: 0.5,
  LARGE_SCREEN_WIDTH: 1080,
  LARGE_SCREEN_HEIGHT: 1200
} as const;

export const ANIMATION_DELAYS = {
  MOBILE: {
    VILLAGE: 0.5,
    RED: 1.1,
    BLUE: 1.4,
    TAIWAN: 1.7
  },
  DESKTOP: {
    RIGHT_TEMPLE: 0.5,
    LEFT_TEMPLE: 0.8,
    VILLAGE: 1.1,
    LEOPARD: 1.4,
    BEAR: 1.7,
    BOAT: 2.0,
    NOODLE: 2.3,
    RED: 2.9,
    BLUE: 3.2,
    TAIWAN: 3.5,
    TEXT: 4.0
  }
} as const;

// 類型定義
export type Breakpoint = 'mobile' | 'tablet' | 'bigTablet' | 'desktop' | 'bigscreen';

// 預載圖片路徑
export const IMAGES_TO_PRELOAD = [
  '/animation/mountainBack3.svg',
  '/animation/lion.svg',
  '/animation/rightTemple.svg',
  '/animation/leftTemple.svg',
  '/animation/general.svg',
  '/animation/leopard.svg',
  '/animation/bear.svg',
  '/animation/boatWithWaveAndFish.svg',
  '/animation/noodle.svg',
  '/animation/red.svg',
  '/animation/taiwan.svg',
  '/animation/blue.svg'
] as const;

// 響應式動畫配置
export const RESPONSIVE_ANIMATION_CONFIGS = {
  mobile: {
    taiwan: { 
      to: { x: "50vw", y: "50vh", scale: 2.5, xPercent: -50, yPercent: -50 } 
    },
    noodle: { 
      to: { x: "80vw", y: "83vh", scale: 3.9, xPercent: -50, yPercent: -50 } 
    },
    red: { to: { x: "20vw", y: "85vh", scale: 5, xPercent: -50, yPercent: -50 } },
    blue: { to: { x: "20vw", y: "22vh", scale: 6, xPercent: -50, yPercent: -50 } }
  },
  tablet: {
    lion: { to: { x: "79vw", y: "46vh", scale: 1.7, xPercent: -50, yPercent: -50 } },
    rightTemple: { to: { x: "79vw", y: "70vh", scale: 1.7, xPercent: -50, yPercent: -50 } },
    leftTemple: { to: { x: "20vw", y: "46vh", scale: 1.7, xPercent: -50, yPercent: -50 } },
    general: { to: { x: "79vw", y: "70vh", scale: 1.9, xPercent: -50, yPercent: -50 } },
    boat: { to: { x: "25vw", y: "78vh", scale: 2, xPercent: -50, yPercent: -50 } },
    red: { to: { x: "85vw", y: "23vh", scale: 0.7, xPercent: -50, yPercent: -50 } },
    blue: { to: { x: "16vw", y: "25vh", scale: 0.9, xPercent: -50, yPercent: -50 } },
    taiwan: { to: { x: "50vw", y: "50vh", scale: 1.7, xPercent: -50, yPercent: -50 } }
  },
  bigTablet: {
    lion: { to: { x: "82vw", y: "42vh", scale: 1.4, xPercent: -50, yPercent: -50 } },
    rightTemple: { to: { x: "79vw", y: "72vh", scale: 1.3, xPercent: -50, yPercent: -50 } },
    leftTemple: { to: { x: "28vw", y: "46vh", scale: 1.8, xPercent: -50, yPercent: -50 } },
    general: { to: { x: "81vw", y: "70vh", scale: 1.6, xPercent: -50, yPercent: -50 } },
    leopard: { to: { x: "10vw", y: "64vh", scale: 0.9, xPercent: -50, yPercent: -50 } },
    bear: { to: { x: "87vw", y: "25vh", scale: 0.45, xPercent: -50, yPercent: -50 } },
    boat: { to: { x: "17vw", y: "78vh", scale: 2, xPercent: -50, yPercent: -50 } },
    noodle: { to: { x: "88vw", y: "85vh", scale: 0.5, xPercent: -50, yPercent: -50 } },
    red: { to: { x: "90vw", y: "28vh", scale: 0.4, xPercent: -50, yPercent: -50 } },
    blue: { to: { x: "16vw", y: "25vh", scale: 0.7, xPercent: -50, yPercent: -50 } },
    taiwan: { to: { x: "51vw", y: "50vh", scale: 1.5, xPercent: -50, yPercent: -50 } }
  },
  desktop: {
    lion: { to: { x: "72vw", y: "41vh", scale: 1.0, xPercent: -50, yPercent: -50 } },
    rightTemple: { to: { x: "75vw", y: "73vh", scale: 1.4, xPercent: -50, yPercent: -50 } },
    leftTemple: { to: { x: "32vw", y: "47vh", scale: 1.5, xPercent: -50, yPercent: -50 } },
    general: { to: { x: "75vw", y: "70vh", scale: 1.5, xPercent: -50, yPercent: -50 } },
    leopard: { to: { x: "12vw", y: "64vh", scale: 0.8, xPercent: -50, yPercent: -50 } },
    bear: { to: { x: "75vw", y: "25vh", scale: 0.4, xPercent: -50, yPercent: -50 } },
    boat: { to: { x: "30vw", y: "80vh", scale: 1.3, xPercent: -50, yPercent: -50 } },
    noodle: { to: { x: "87vw", y: "30vh", scale: 0.5, xPercent: -50, yPercent: -50 } },
    red: { to: { x: "42vw", y: "24vh", scale: 0.45, xPercent: -50, yPercent: -50 } },
    blue: { to: { x: "16vw", y: "25vh", scale: 0.6, xPercent: -50, yPercent: -50 } },
    taiwan: { to: { x: "49vw", y: "51vh", scale: 1.1, xPercent: -50, yPercent: -50 } }
  },
  bigscreen: {
    lion: { to: { x: "72vw", y: "41vh", scale: 1.2, xPercent: -50, yPercent: -50 } },
    rightTemple: { to: { x: "75vw", y: "73vh", scale: 1.6, xPercent: -50, yPercent: -50 } },
    leftTemple: { to: { x: "28vw", y: "47vh", scale: 1.7, xPercent: -50, yPercent: -50 } },
    general: { to: { x: "75vw", y: "70vh", scale: 1.6, xPercent: -50, yPercent: -50 } },
    leopard: { to: { x: "12vw", y: "67vh", scale: 1, xPercent: -50, yPercent: -50 } },
    bear: { to: { x: "75vw", y: "25vh", scale: 0.55, xPercent: -50, yPercent: -50 } },
    boat: { to: { x: "30vw", y: "80vh", scale: 2, xPercent: -50, yPercent: -50 } },
    noodle: { to: { x: "88vw", y: "15vh", scale: 0.5, xPercent: -50, yPercent: -50 } },
    red: { to: { x: "38vw", y: "20vh", scale: 0.5, xPercent: -50, yPercent: -50 } },
    blue: { to: { x: "10vw", y: "25vh", scale: 0.8, xPercent: -50, yPercent: -50 } },
    taiwan: { to: { x: "50vw", y: "50vh", scale: 1.5, xPercent: -50, yPercent: -50 } }
  }
} as const;

/**
 * 為bigscreen以上裝置動態調整動畫配置的scale
 */
export const getDynamicAnimationConfig = (breakpoint: Breakpoint, calculateDynamicScale: (baseScale: number) => number) => {
  const baseConfig = RESPONSIVE_ANIMATION_CONFIGS[breakpoint];
  
  // 只對bigscreen進行動態調整
  if (breakpoint !== 'bigscreen') {
    return baseConfig;
  }
  
  // 創建動態調整後的配置
  const dynamicConfig: Record<string, { to: { x: string; y: string; scale: number; xPercent: number; yPercent: number } }> = {};
  
  Object.entries(baseConfig).forEach(([key, config]) => {
    if (config && config.to && typeof config.to.scale === 'number') {
      dynamicConfig[key] = {
        ...config,
        to: {
          ...config.to,
          scale: calculateDynamicScale(config.to.scale)
        }
      };
    } else {
      dynamicConfig[key] = config;
    }
  });
  
  return dynamicConfig;
};
