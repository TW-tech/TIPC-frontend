'use client';

import { useState, useMemo } from 'react';
import { PageLayout, MasonryGallery, StoryFilter } from '@/components';
import storyPicturesData from '@/data/storyPictures.json';
import type { GalleryImage } from '@/types';


export default function StoryPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (!activeFilter || activeFilter === "全部") {
      return storyPicturesData as GalleryImage[];
    }
    return storyPicturesData.filter(
      (image) => image.category === activeFilter
    ) as GalleryImage[];
  }, [activeFilter]);
  
  return (
    <PageLayout title="光影故事" subtitle="Stories" headerpic="/images/header/story.jpeg">
      <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"> 
        <StoryFilter 
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
          />
      </div>
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
          <MasonryGallery
            images={filteredImages}
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
          />
        </div>
      </div>
    </PageLayout>
  );
}
