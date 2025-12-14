"use client";

import { PageLayout ,MasonryGallery} from '@/components';
import bookData from '@/data/book.json';
import type { photographImage } from "@/types";

export default function BookPage() {

  const BookCoverImages: photographImage[] = Array.from({ length: bookData.length }, (_, index) => ({
    id: index ,
    title: `Book ${index + 1}`,
    src: bookData[index].image
  }));

  return (
    <PageLayout title="TIPC選書" subtitle="Books We Love" headerpic="/images/header/book.jpeg">
      <div className="min-h-screen bg-gray-50">
        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
          <MasonryGallery
            images={BookCoverImages}
            breakpointColumnsObj={{
              default: 4, // 4 columns desktop
              1280: 4,
              1024: 3,
              768: 2,
              500: 2,
            }}
            loadMoreConfig={{
              mode: "append",
              batchSize: 12, 
              buttonText: "載入更多",
            }}
            lightboxMode={{
              mode:"Book"
            }}
            gap={10}
          />
        </div>

        
        
      </div>
       
    </PageLayout>
  );
}
