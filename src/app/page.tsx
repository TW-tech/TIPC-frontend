import { 
  MainVisual,
  ImageCarousel,
  Slogan,
  CultureHighlights,
  VideoRecommendations,
  PartnerRecommendations,
  Footer
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* 主視覺區塊 - 手繪大圖 */}
      <MainVisual />
      
      {/* 輪播圖片區塊 - 在手繪大圖底下 */}
      <ImageCarousel />
      
      {/* 文字敘述與圖片區塊 */}
      <Slogan />
      
      {/* 文化知識區塊 */}
      <CultureHighlights />
      
      {/* 影音推薦區塊 */}
      <VideoRecommendations />
      
      {/* 合作夥伴推薦區塊 */}
      <PartnerRecommendations />
      
      {/* 頁尾區塊 */}
      <Footer />
    </div>
  );
}
