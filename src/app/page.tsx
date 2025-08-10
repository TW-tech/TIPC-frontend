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

      {/* 主視覺區塊 - <MainVisual /> 手繪大圖 */}
      <MainVisual />
      {/* 輪播圖片區塊 - <ImageCarousel /> 在手繪大圖底下 */}
      <ImageCarousel />
      
      {/* 文字敘述與圖片區塊  <Slogan />*/}
      <Slogan />
      
      {/* 文化知識區塊  <CultureHighlights />*/}
      <CultureHighlights />
      
      {/* 影音推薦區塊  <VideoRecommendations /> */}
     <VideoRecommendations />
      
      {/* 合作夥伴推薦區塊 <PartnerRecommendations /> */}
      <PartnerRecommendations />

      {/* 頁尾區塊   <Footer />*/}
      <Footer />
    </div>
  );
}
