'use client';

import { PageLayout, MasonryGallery } from '@/components';
import storyPicturesData from '@/data/storyPictures.json';
import type { storyImage } from '@/types';


export default function StoryPage() {
  
  return (
    <PageLayout title="光影故事" subtitle="TIPC Photographs" headerpic="/images/header/story.jpeg">
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
          <MasonryGallery
            images={storyPicturesData as storyImage[]}
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
              mode:"Image"
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
