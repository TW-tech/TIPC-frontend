# 專案架構說明

## 頁面路由結構

### 首頁 (`/`)
- **檔案位置**: `src/app/page.tsx`
- **描述**: 主頁面，包含所有首頁區塊
- **導航**: 使用 MainVisual 組件內嵌的導航

### 第二層頁面
使用 Next.js App Router 的 route groups `(pages)` 來組織：

#### 關於我們 (`/about`)
- **檔案位置**: `src/app/(pages)/about/page.tsx`
- **描述**: 介紹網站使命與願景
- **特色**: 包含核心價值說明

#### 專欄文章 (`/culture`)
- **檔案位置**: `src/app/(pages)/culture/page.tsx`
- **描述**: 文化分類與內容展示
- **特色**: 傳統藝術、民俗文化、歷史故事分類

#### 影像藝廊 (`/gallery`)
- **檔案位置**: `src/app/(pages)/gallery/page.tsx`
- **描述**: 影像收藏展示
- **特色**: 分類篩選、網格佈局

#### 聯絡我們 (`/contact`)
- **檔案位置**: `src/app/(pages)/contact/page.tsx`
- **描述**: 聯絡表單與資訊
- **特色**: 表單驗證、聯絡資訊

## 組件架構

### Layout 組件
- **PageLayout**: 統一的頁面佈局組件
- **Footer**: 頁尾組件

### Navigation 組件
- **Navigation**: 支援兩種變體的導航組件
  - `variant="main"`: 首頁 MainVisual 中的完整導航
  - `variant="header"`: 第二層頁面的簡化導航

### Section 組件
- **MainVisual**: 首頁主視覺區塊
- **ImageCarousel**: 輪播圖片
- **Slogan**: 文字敘述區塊
- **CultureHighlights**: 文化知識區塊
- **VideoRecommendations**: 影音推薦
- **PartnerRecommendations**: 合作夥伴推薦

## 設計系統

### 色彩配置
- **主色調**: `#833416` (深棕色/咖啡色)
- **次要色**: `#a0471f` (淺棕色，用於 hover 效果)
- **背景色**: `#FAF9EB` (米白色)
- **文字色**: `#amber-900` (功能列), `text-gray-900` (內文)

### 字體設定
- **主要字體**: Microsoft YaHei (微軟雅黑)
- **備用字體**: PingFang SC, Helvetica Neue, Arial

### 響應式設計
- **斷點**: 使用 Tailwind CSS 標準斷點
- **移動端優先**: 所有組件都支援響應式設計

## 路由設定

### App Router 結構
```
src/app/
├── layout.tsx          # 根佈局
├── page.tsx           # 首頁
├── globals.css        # 全域樣式
└── (pages)/           # 路由群組
    ├── about/
    │   └── page.tsx   # /about
    ├── culture/
    │   └── page.tsx   # /culture  
    ├── gallery/
    │   └── page.tsx   # /gallery
    └── contact/
        └── page.tsx   # /contact
```

### 導航連結
所有導航連結都使用 Next.js 的 `Link` 組件來提供最佳的路由體驗：

```tsx
const navItems = [
  { href: '/', label: '首頁' },
  { href: '/about', label: '關於我們' },
  { href: '/culture', label: '專欄文章' },
  { href: '/gallery', label: '影像藝廊' },
  { href: '/contact', label: '聯絡我們' },
];
```

## 數據管理

### 中央化數據
- **檔案位置**: `src/data/index.ts`
- **型別定義**: `src/types/index.ts`
- **內容**: 所有組件的靜態數據都集中管理

### 類型安全
使用 TypeScript 確保數據類型的一致性和安全性。

## 開發建議

1. **新增頁面**: 在 `src/app/(pages)/` 下建立新資料夾
2. **組件開發**: 使用現有的設計系統色彩和字體
3. **響應式**: 確保所有新組件支援移動端
4. **SEO**: 每個頁面都包含適當的 metadata
5. **導航**: 新頁面記得更新 Navigation 組件的 navItems
