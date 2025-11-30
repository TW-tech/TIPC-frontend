import MediaGallery from "@/components/sections/MediaGallery";
import PageLayout from "@/components/layout/PageLayout";
import { mediaGalleryData } from "@/data/mediaGalleryData";

export default function IndustryBrandPage() {
  return (
    <PageLayout 
      title="產業/品牌" 
      headerpic="/images/header/NineBlock.jpg"
    >
      <MediaGallery items={mediaGalleryData} />
    </PageLayout>
  );
}