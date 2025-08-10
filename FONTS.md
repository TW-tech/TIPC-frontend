# 字型系統設定指南 (Font System Setup Guide)

本專案使用台灣在地中文字型來增強文化真實感和視覺體驗。

## 🎨 字型配置

### 1. 辰宇落雁體（標題字型）
- **檔案**：`ChenYuluoyan-2.0-Thin.ttf`
- **用途**：主標題、重要標語
- **CSS 類別**：`font-chenyuluoyan`
- **字重**：300（Thin）
- **狀態**：✅ 已配置

### 2. Inter（英文字型）
- **來源**：Google Fonts
- **用途**：英文內容、介面文字、一般內文
- **CSS 類別**：`font-english`、`font-sans`
- **字重**：100-900（Variable）
- **狀態**：✅ 已配置

## 📁 檔案結構

```
public/
├── icons/                              # 圖標檔案
├── images/                             # 圖片資源 
└── animation/                          # 動畫素材
```

## 🔧 技術實作

### 字型載入（`src/lib/fonts.ts`）
```typescript
import { Inter } from 'next/font/google';

// 英文字體 - Inter
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

### Tailwind CSS 配置
```typescript
fontFamily: {
  'sans': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
}
```

## 🎯 使用方式

### 在 React 組件中使用
```tsx
// 一般文字（使用系統預設）
<h1 className="text-4xl">文化遺產</h1>

// 內文
<p className="text-base">傳承文化之美</p>

// 英文內容
<p className="font-sans text-base">Cultural Website</p>
```

### CSS 變數
```css
.english-text {
  font-family: var(--font-inter);
}
```

## ✅ 字體驗證

### 視覺檢查
- **一般文字**: 使用系統預設字體，確保良好可讀性
- **英文文字**: 應顯示清晰的無襯線字體 (Inter)

## 🔍 故障排除

### 常見問題

1. **字體未生效**
   - 檢查 CSS 變數是否正確設置
   - 確認 Tailwind 配置中的字體族名稱
   - 重新啟動開發服務器

2. **載入性能問題**
   - 使用 `font-display: swap` 優化載入
   - 實作字體預載入

### 除錯指令
```bash
# 檢查 Tailwind CSS 編譯
npm run build

# 啟動開發服務器
npm run dev

# 類型檢查
npm run type-check
```

## 📄 字體授權

所有字體都遵循其各自的授權條款：
- **Inter**: SIL Open Font License

## 🔗 相關資源

- [Inter字體](https://fonts.google.com/specimen/Inter)
- [Next.js 字體優化](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
