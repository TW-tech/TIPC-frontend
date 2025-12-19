# 台灣文化影響力平台 🏛️

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/) [![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)


## 🌟 專案狀態

- ✅ **響應式設計** - 完成所有斷點適配
- ✅ **核心組件** - 圖片輪播、影音推薦、合作夥伴展示  
- ✅ **現代動畫系統** - GSAP + useGSAP Hook 整合完成
- ✅ **主視覺動畫** - 完整的 SVG 動畫生態系統
- ✅ **效能優化** - 依賴精簡化、動畫效能優化、圖片優化
- ✅ **模組化架構** - 動畫配置分離、工具函數模組化
- ✅ **社群分享** - Facebook Open Graph 與 Twitter Card 整合
- ✅ **SEO 優化** - 動態 metadata 生成，提升搜尋引擎排名
- ✅ **UX 優化** - 自動滾動復位、Toast 通知系統
- 🚧 **多語言支援** - 規劃中
- 🚧 **內容管理系統** - 規劃中

### 🎬 動畫系統特色

- **主視覺動畫** - 12+ 個台灣文化元素 SVG 動畫
- **響應式動畫** - 根據裝置類型（手機/平板/桌面）調整動畫複雜度  
- **效能檢測** - 自動偵測裝置效能並調整動畫品質
- **智能清理** - 動畫完成後自動釋放 GPU 資源
- **無衝突設計** - 局部動畫管理，避免組件間動畫干擾

## ✨ 特色功能

- 🎨 **完全響應式設計** - 完美適配所有裝置（手機、平板、桌上型電腦）
- 🌟 **主視覺動畫系統** - 使用 GSAP + useGSAP Hook 的專業級 SVG 動畫
- 🖼️ **三圖片輪播展示** - 主圖片居中展示，左右預覽圖片
- 🏛️ **文化展示區塊** - 博物館、文化遺址、文化資產展示
- 🎭 **影音推薦** - 橫向滑動的影片推薦區塊
- 🤝 **合作夥伴展示** - 三欄式合作夥伴推薦
- 📅 **智能活動管理** - 自動根據日期判定活動狀態（進行中/已結束）
- ⚡ **流暢動畫** - GSAP 3.13.0 + @gsap/react 2.1.2 現代動畫系統
- 🎯 **效能優化** - 精簡的依賴包，智能動畫管理，更快的載入速度
- 📱 **社群分享整合** - 文章分享至 Facebook，包含豐富的 Open Graph metadata
- 🔗 **一鍵複製連結** - Toast 通知系統，提供流暢的分享體驗
- 📄 **動態 SEO** - 每篇文章自動生成優化的 metadata，提升社群媒體預覽效果
- 🔝 **智能滾動管理** - 頁面切換自動滾動至頂部，提升導航體驗

## 🛠️ 技術架構

- **Next.js 16.0.7** - 使用 App Router 的 React 框架（支援 Turbopack）
- **React 19.2.1** - 最新版本 React UI 程式庫
- **TypeScript 5** - 型別安全開發
- **Tailwind CSS 4** - 最新版實用優先的 CSS 框架
- **GSAP 3.13.0 + @gsap/react 2.1.2** - 現代化動畫引擎與 React Hook 整合
- **Sharp 0.34.3** - 高效能圖片優化
- **Clsx & Tailwind-merge** - 動態 CSS 類別管理

### 🎬 動畫系統架構

- **useGSAP Hook** - React 19 相容的現代動畫管理
- **模組化配置** - 動畫配置檔案分離（`animationConfigs.ts`、`mountainConfigs.ts`）
- **響應式動畫** - 根據裝置類型智能調整動畫複雜度
- **效能優化** - 局部動畫管理，避免全域動畫衝突
- **SVG 動畫系統** - 文化元素 SVG 動畫（台灣、廟宇、熊、豹等）

## 🚀 快速開始

1. **複製專案到本地端**
   ```bash
   git clone https://github.com/TW-tech/Cultural-Website.git
   cd Cultural-Website
   ```

2. **安裝 Node.js 相依套件**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **開啟瀏覽器**
   造訪 [http://localhost:3000](http://localhost:3000) 檢視網站

## 📁 專案結構

```
Cultural-Website/
├── src/
│   ├── app/              # Next.js App Router 頁面
│   │   ├── globals.css  # 全域樣式與字型設定
│   │   ├── layout.tsx   # 根佈局組件（含 metadata 與 ScrollToTop）
│   │   ├── page.tsx     # 首頁
│   │   └── (pages)/     # 路由群組
│   │       ├── about/      # 關於頁面
│   │       ├── archive/    # 典藏索引頁面
│   │       ├── article/    # 文章頁面（含動態 metadata）
│   │       │   └── [id]/[content]/
│   │       │       ├── page.tsx         # 伺服器組件（SEO metadata）
│   │       │       └── ArticleClient.tsx # 客戶端組件（互動功能）
│   │       ├── book/       # 出版品頁面
│   │       ├── contact/    # 聯絡頁面
│   │       ├── culture/    # 文化頁面
│   │       ├── event/      # 活動頁面
│   │       ├── gallery/    # 圖片藝廊（已重命名為 video）
│   │       ├── video/      # 影音頁面（原 gallery）
│   │       ├── mediaselect/# 媒體選擇頁面
│   │       ├── partner/    # 合作夥伴頁面
│   │       ├── photograph/ # 照片頁面（原 story）
│   │       └── webcollect/ # 網路資源頁面
│   ├── components/       # React 組件
│   │   ├── layout/      # 版面佈局組件
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx         # 響應式 header（滾動縮小）
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── PageLayout.tsx
│   │   │   └── ScrollToTop.tsx    # 自動滾動至頂部
│   │   ├── navigation/  # 導航組件
│   │   │   └── Navigation.tsx
│   │   └── sections/    # 頁面區塊組件
│   │       ├── MainVisual/           # 主視覺動畫系統
│   │       │   ├── animationConfigs.ts  # 動畫配置
│   │       │   ├── mountainConfigs.ts   # 山脈動畫配置
│   │       │   └── utils.ts            # 動畫工具函數
│   │       ├── MainVisual.tsx        # 主視覺組件
│   │       ├── ImageCarousel.tsx     # 三圖片輪播
│   │       ├── Slogan.tsx           # 標語區塊（支援 GSAP 動畫）
│   │       ├── CultureHighlights.tsx # 文化亮點
│   │       ├── VideoRecommendations.tsx # 影音推薦
│   │       └── EditorPick.tsx # 編輯精選
│   ├── data/            # 靜態數據
│   │   ├── article.json      # 文章數據
│   │   ├── photograph.json   # 照片數據（原 storyPictures.json）
│   │   └── index.ts          # 數據匯出
│   ├── hooks/           # 自定義 React Hooks
│   ├── lib/             # 工具函數和配置
│   │   ├── fonts.ts     # 字型設定
│   │   ├── utils.ts     # 實用工具函數
│   │   ├── eventUtils.ts # 活動類型自動判定工具
│   │   └── prisma.ts    # Prisma 客戶端配置
│   └── types/           # TypeScript 類型定義
│       └── index.ts     # 所有類型定義（Article, photographImage 等）
├── public/
│   ├── animation/       # SVG 動畫資源
│   │   ├── taiwan.svg      # 台灣地圖動畫
│   │   ├── leftTemple.svg  # 左廟宇動畫
│   │   ├── rightTemple.svg # 右廟宇動畫
│   │   ├── bear.svg        # 熊動畫
│   │   ├── leopard.svg     # 豹動畫
│   │   ├── boatWithWaveAndFish.svg        # 船隻動畫
│   │   ├── villiage.svg    # 村莊動畫
│   │   ├── noodle.svg      # 麵條動畫
│   │   ├── red.svg         # 紅龜粿動畫
│   │   ├── blue.svg        # 藍染元素動畫
│   │   └── mountainBack.svg # 背景山脈動畫
│   ├── images/          # 圖片資源 (分類整理)
│   │   ├── article/        # 文章圖片
│   │   ├── culture/        # 文化相關圖片
│   │   ├── gallery/        # 圖片藝廊（書籍等）
│   │   ├── header/         # 各頁面 header 圖片
│   │   ├── museums/        # 博物館圖片
│   │   ├── editorPick/ # 編輯精選圖片
│   │   └── videorecommendations/   # 影音推薦縮圖
│   └── icons/           # 圖標檔案
│       ├── logo_tab.png     # 網站 favicon
│       ├── share.png        # 分享圖標
│       └── copyLink.png     # 複製連結圖標
├── prisma/              # Prisma 資料庫設定
│   └── schema.prisma
└── .env.local           # 環境變數（需自行建立）
```

## 📱 響應式設計重點

### 主要斷點
- **手機版**：< 640px
- **小平板**：640px - 1024px  
- **大平板/桌面**：1024px - 1280px
- **大桌面**：≥ 1280px
- **超大螢幕**：≥ 1536px

### 組件響應式特色
- **ImageCarousel**: 手機單圖、桌面三圖佈局，高度自適應
- **EditorPick**: 手機1欄→平板2欄→桌面3欄
- **VideoRecommendations**: 橫向滑動設計，支援觸控和滑鼠滾輪
- **字型**: 各斷點下的文字大小自動調整

## 🔧 開發指令

```bash
# 開發模式（支援 Turbopack 熱重載）
npm run dev

# 建置專案（正式環境）
npm run build

# 啟動正式環境
npm start

# TypeScript 型別檢查
npm run type-check

# 程式碼檢查（ESLint）
npm run lint

# 自動修復程式碼問題
npm run lint:fix
```

## 🎯 專案優化重點

### 現代動畫系統
本專案採用最新的 GSAP + React 整合方案：
- ✅ **useGSAP Hook** - 取代傳統 useEffect + gsap.context 模式
- ✅ **模組化動畫配置** - 動畫邏輯分離至獨立配置檔案
- ✅ **智能效能管理** - 局部動畫控制，避免全域動畫衝突
- ✅ **響應式動畫** - 根據裝置效能自動調整動畫複雜度
- ✅ **SVG 動畫生態系統** - 完整的台灣文化元素動畫集合

### 依賴精簡化
本專案已優化依賴包結構，維持在 8 個核心依賴：
- ✅ 現代動畫系統：GSAP 3.13.0 + @gsap/react 2.1.2
- ✅ 移除 Framer Motion，採用更專業的 GSAP 方案
- ✅ 移除 Prisma（目前無需資料庫）
- ✅ 移除 Radix UI 和 Zustand（簡化狀態管理）
- ✅ 保留核心功能：Next.js、React、TypeScript、Tailwind CSS

### 效能優化
- **圖片優化**: 使用 Sharp 進行高效能圖片處理
- **動畫優化**: useGSAP 提供更好的 React 生命週期整合
- **程式碼分割**: Next.js 自動程式碼分割 + Turbopack 支援
- **CSS 優化**: Tailwind CSS 4 提供更小的打包體積
- **智能活動管理**: 自動根據日期判定活動狀態，無需手動維護 JSON 檔案中的 type 欄位

## 🔗 社群分享與 SEO 優化

### Open Graph Metadata
本專案為每篇文章自動生成 Open Graph metadata，讓分享至 Facebook、Twitter 等社群平台時能顯示豐富的預覽：

#### 功能特色
- **自動生成**: 使用 Next.js 15 的 `generateMetadata()` API
- **伺服器端渲染**: metadata 在伺服器端生成，確保爬蟲能正確讀取
- **動態內容**: 從 `article.json` 讀取文章數據
- **完整支援**: Open Graph、Twitter Card、基本 SEO tags

#### Metadata 包含內容
- 文章標題
- 文章描述（自動擷取前 200 字）
- 特色圖片（1200x630 最佳化）
- 作者資訊
- 發布日期
- 關鍵字標籤
- 完整文章 URL

#### 環境變數設定
在 `.env.local` 或部署平台設定：
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

若未設定，系統會自動偵測：
- Vercel: 使用 `VERCEL_URL`
- 本地開發: 使用 `http://localhost:3000`

### 分享功能
文章頁面提供完整的分享功能：
- **複製連結**: 一鍵複製文章 URL
- **Facebook 分享**: 直接分享至 Facebook
- **Toast 通知**: 複製成功後顯示友善的提示訊息
- **下拉選單**: 優雅的分享選項介面

### 架構說明
```typescript
// 伺服器組件 - 生成 metadata
export async function generateMetadata() {
  // 從 JSON 讀取文章數據
  // 生成 Open Graph tags
  // 生成 Twitter Card tags
}

// 伺服器組件 - 渲染頁面
export default async function ArticlePage() {
  // 獲取文章數據
  // 傳遞給客戶端組件
}

// 客戶端組件 - 處理互動
function ArticleClient() {
  // 分享功能
  // Toast 通知
  // UI 互動
}
```

## 🔝 滾動管理系統

### ScrollToTop 組件
使用 `usePathname` hook 監聽路由變化，在頁面切換時自動滾動至頂部：

#### 工作原理
```typescript
const pathname = usePathname();

useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);
```

#### 使用位置
- 已整合至根佈局 (`src/app/layout.tsx`)
- 全域生效，無需額外配置
- 解決 Next.js App Router 預設不滾動的問題

## 🎯 智能活動管理系統

本專案實現了自動活動狀態管理功能：

### 工作原理
- **自動判定**: 根據活動日期自動判定為「進行中」或「已結束」
- **日期格式支援**: 
  - 單一日期: `"2025-08-16"`
  - 日期範圍: `"2025-03-15 ~ 2025-04-01"`
- **即時更新**: 每次頁面載入時重新計算活動狀態
- **零維護**: 無需手動更新 JSON 檔案中的 `type` 欄位

### 使用方式
在 `events.json` 中，您可以省略 `type` 欄位：
```json
{
  "id": "1",
  "title": "地方創生可以不一樣新書發表會",
  "date": "2025-08-16",
  "mainImage": "/images/event/past/Book/bookmain.jpg",
  "description": "活動描述...",
  ...
}
```

系統會自動：
1. 讀取活動日期
2. 與當前日期比較
3. 自動設定 `type: 'current'` 或 `type: 'past'`

### 相關檔案
- `/src/lib/eventUtils.ts` - 活動類型判定邏輯
- `/src/app/(pages)/event/page.tsx` - 活動列表頁面
- `/src/app/(pages)/event/[id]/page.tsx` - 活動詳情頁面
- `/src/components/sections/ImageCarousel.tsx` - 活動輪播組件

## 📱 響應式支援詳細說明

### ImageCarousel 組件
- **手機版**: 單圖片展示，高度 14rem，簡潔版面
- **平板版**: 開始顯示左右預覽圖片，高度 18rem
- **桌面版**: 完整三圖片佈局（主圖 64% + 左右預覽各 18%）

### 合作夥伴區塊
- **手機版**: 單欄顯示
- **平板版**: 雙欄顯示  
- **桌面版**: 三欄顯示，寬度對齊 Slogan 區塊（82%）

### 影音推薦區塊
- 橫向滑動設計，支援觸控滑動
- 桌面版支援滑鼠滾輪操作
- 動態顯示左右滑動箭頭


## 📊 專案完成度

- ✅ **響應式設計** - 完成所有斷點適配
- ✅ **核心組件** - 圖片輪播、影音推薦、合作夥伴展示
- ✅ **字型系統** - 台灣在地字型整合
- ✅ **效能優化** - 依賴精簡化、圖片優化
- ✅ **社群分享** - Facebook Open Graph、Twitter Card
- ✅ **SEO 優化** - 動態 metadata 生成
- ✅ **UX 優化** - 滾動管理、Toast 通知
- ✅ **內容架構** - 文章、照片、影音、活動、出版品
- 🚧 **多語言支援** - 規劃中
- 🚧 **內容管理系統** - 規劃中

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](./LICENSE) 檔案


---

**🏛️ 讓我們一起保護和推廣台灣的珍貴文化遺產！**
