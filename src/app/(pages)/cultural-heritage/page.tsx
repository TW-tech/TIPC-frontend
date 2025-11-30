import MediaGallery from "@/components/sections/MediaGallery";
import PageLayout from "@/components/layout/PageLayout";
import { mediaGalleryData } from "@/data/mediaGalleryData";

export default function CulturalHeritagePage() {
  return (
    <PageLayout 
      title="文化資產 + 文化活動" 
      headerpic="/images/header/NineBlock.jpg"
    >
      <MediaGallery items={mediaGalleryData} />
    </PageLayout>
  );
}