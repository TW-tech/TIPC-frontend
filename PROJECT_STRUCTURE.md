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

#### 文化內容 (`/culture`)
- **檔案位置**: `src/app/(pages)/culture/page.tsx`
- **描述**: 文化分類與內容展示
- **特色**: 文化記憶、文化活動、文化品牌等分類

#### 典藏索引 (`/archive`)
- **檔案位置**: `src/app/(pages)/archive/page.tsx`
- **描述**: 文化典藏資源索引
- **特色**: 分類篩選、外部連結整合

#### 觀點文章 (`/article/[id]/[content]`)
- **檔案位置**: 
  - `src/app/(pages)/article/[id]/[content]/page.tsx` (伺服器組件)
  - `src/app/(pages)/article/[id]/[content]/ArticleClient.tsx` (客戶端組件)
- **描述**: 動態文章頁面
- **特色**: 
  - Open Graph metadata 生成
  - Facebook/Twitter 分享
  - 複製連結功能
  - Toast 通知系統
  - 響應式排版
  - 相關文章推薦

#### 光影故事 (`/photograph`)
- **檔案位置**: `src/app/(pages)/photograph/page.tsx`
- **描述**: 攝影作品展示（原 story）
- **特色**: Masonry 瀑布流佈局、Lightbox 查看

#### 影音記錄 (`/video`)
- **檔案位置**: `src/app/(pages)/video/page.tsx`
- **描述**: 影音內容展示（原 gallery）
- **特色**: 影片、照片、文章分類展示

#### 活動資訊 (`/event`)
- **檔案位置**: `src/app/(pages)/event/page.tsx`
- **描述**: 文化活動展示
- **特色**: 自動判定進行中/已結束狀態

#### 出版品 (`/book`)
- **檔案位置**: `src/app/(pages)/book/page.tsx`
- **描述**: 出版品展示
- **特色**: 圖書資訊、購買連結

#### 合作夥伴 (`/partner`)
- **檔案位置**: `src/app/(pages)/partner/page.tsx`
- **描述**: 合作夥伴介紹
- **特色**: 合作機構展示

#### 聯絡我們 (`/contact`)
- **檔案位置**: `src/app/(pages)/contact/page.tsx`
- **描述**: 聯絡表單與資訊
- **特色**: 表單驗證、聯絡資訊

## 組件架構

### Layout 組件
- **PageLayout**: 統一的頁面佈局組件（整合 Header 和 Footer）
- **Header**: 響應式 header，滾動時自動縮小
- **Footer**: 頁尾組件
- **ScrollToTop**: 頁面切換時自動滾動至頂部
- **LoadingScreen**: 載入畫面組件

### Navigation 組件
- **Navigation**: 支援多種變體的導航組件
  - `variant="main"`: 首頁 MainVisual 中的完整導航
  - `variant="header"`: 第二層頁面的簡化導航
  - `variant="simplified"`: 精簡版導航

### Section 組件
- **MainVisual**: 首頁主視覺區塊（含 GSAP 動畫）
- **ImageCarousel**: 輪播圖片（支援活動狀態顯示）
- **Slogan**: 文字敘述區塊
- **CultureHighlights**: 文化知識區塊
- **VideoRecommendations**: 影音推薦（橫向滑動）
- **EditorPick**: 編輯精選推薦
- **NineBlockCard**: 九宮格分類卡片
- **MasonryGallery**: 瀑布流圖片展示
- **ImageLightbox**: 圖片燈箱查看器

### 文章相關組件
- **ArticleClient**: 文章客戶端組件
  - 分享功能（Facebook、複製連結）
  - Toast 通知系統
  - 文章內容渲染
  - 相關文章推薦

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
├── layout.tsx          # 根佈局（含 metadata、ScrollToTop）
├── page.tsx           # 首頁
├── globals.css        # 全域樣式（含 Toast 動畫）
└── (pages)/           # 路由群組
    ├── about/
    │   └── page.tsx   # /about - 關於我們
    ├── archive/
    │   └── page.tsx   # /archive - 典藏索引
    ├── article/       # 文章相關路由
    │   ├── [id]/
    │   │   └── [content]/
    │   │       ├── page.tsx         # 伺服器組件（metadata）
    │   │       └── ArticleClient.tsx # 客戶端組件（互動）
    │   └── all/
    │       └── page.tsx   # /article/all - 所有文章
    ├── book/
    │   ├── page.tsx      # /book - 出版品首頁
    │   └── [id]/
    │       └── page.tsx  # /book/[id] - 出版品詳情
    ├── contact/
    │   └── page.tsx   # /contact - 聯絡我們
    ├── culture/
    │   └── page.tsx   # /culture - 文化內容
    ├── event/
    │   ├── page.tsx      # /event - 活動列表
    │   └── [id]/
    │       └── page.tsx  # /event/[id] - 活動詳情
    ├── mediaselect/
    │   └── page.tsx   # /mediaselect - 媒體選擇
    ├── partner/
    │   └── page.tsx   # /partner - 合作夥伴
    ├── photograph/    # 照片頁面（原 story）
    │   ├── all/
    │   │   └── page.tsx  # /photograph/all - 所有照片
    │   └── [id]/
    │       └── page.tsx  # /photograph/[id] - 照片詳情
    ├── video/         # 影音頁面（原 gallery）
    │   ├── all/
    │   │   └── page.tsx  # /video/all - 所有影音
    │   └── [category]/
    │       └── page.tsx  # /video/[category] - 分類影音
    └── webcollect/
        └── page.tsx   # /webcollect - 網路資源
```

### 導航連結
所有導航連結都使用 Next.js 的 `Link` 組件來提供最佳的路由體驗：

```tsx
const navItems = [
  { href: '/', label: '首頁' },
  { href: '/about', label: '關於我們' },
  { href: '/culture', label: '文化內容' },
  { href: '/article/all', label: '觀點文章' },
  { href: '/photograph/all', label: '光影故事' },
  { href: '/video/all', label: '影音記錄' },
  { href: '/event', label: '活動資訊' },
  { href: '/archive', label: '典藏索引' },
  { href: '/book', label: '出版品' },
  { href: '/partner', label: '合作夥伴' },
  { href: '/contact', label: '聯絡我們' },
];
```

### 滾動管理
- **ScrollToTop**: 使用 `usePathname` 監聽路由變化
- **自動觸發**: 每次路由切換時執行 `window.scrollTo(0, 0)`
- **全域生效**: 整合於根佈局，無需額外配置

## 數據管理

### 中央化數據
- **檔案位置**: `src/data/`
  - `article.json` - 文章數據
  - `photograph.json` - 照片數據（原 storyPictures.json）
  - `index.ts` - 數據匯出
- **型別定義**: `src/types/index.ts`
- **內容**: 所有組件的靜態數據都集中管理

### 類型系統
主要類型定義：

```typescript
// 文章類型
export interface Article {
  id: number;
  title: string;
  author: string;
  description?: string;
  cakeCategory: string[];
  keyWords: string[];
  nineBlocks: string[];
  uploadDate: string;
  relatedArticlesIDs: number[];
  imageMain: string;
  paragraphs: ParagraphBlock[];
  videos: string[];
  podcasts: string[];
  footnotes?: Array<{ id: string; text: string; url?: string }>;
}

// 照片類型
export interface photographImage {
  id: number;
  src: string;
  title: string;
  description: string;
  author: string;
  uploadDate: string;
  photoDate: string;
  cakeCategory: string[];
  nineBlocks: string[];
  subID: string;
  size: string;
}

// 段落區塊類型
export type ParagraphBlock =
  | { type: "text"; content: Array<{ text?: string; notation?: string }> }
  | { type: "image"; url: string; caption?: string; notation?: string }
  | { type: "quote"; content: string };
```

### 類型安全
使用 TypeScript 確保數據類型的一致性和安全性。

## SEO 與 Metadata

### 動態 Metadata 生成
文章頁面使用 Next.js 15 的 `generateMetadata()` API：

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = articlesData.find(item => item.id === articleId);
  
  return {
    title: `${article.title} | 文化影響力平台`,
    description: /* 自動擷取前 200 字 */,
    keywords: article.keyWords.join(', '),
    openGraph: { /* Open Graph tags */ },
    twitter: { /* Twitter Card tags */ },
  };
}
```

### Open Graph 支援
- **自動生成**: 從文章 JSON 數據生成
- **完整內容**: 標題、描述、圖片、作者、日期
- **社群優化**: Facebook、Twitter 分享預覽最佳化
- **SEO 友善**: 提升搜尋引擎排名

### 環境變數
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

未設定時自動偵測：
- Vercel: `https://${VERCEL_URL}`
- 本地: `http://localhost:3000`

## 開發建議

1. **新增頁面**: 在 `src/app/(pages)/` 下建立新資料夾
2. **組件開發**: 使用現有的設計系統色彩和字體
3. **響應式**: 確保所有新組件支援移動端
4. **SEO**: 每個頁面都包含適當的 metadata
5. **導航**: 新頁面記得更新 Navigation 組件的 navItems
