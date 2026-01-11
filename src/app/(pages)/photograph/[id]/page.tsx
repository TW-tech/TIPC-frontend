'use client';

import { PageLayout, MasonryGallery } from '@/components';
import { useState, useEffect } from 'react';
import type { Photograph } from '@/types';

// Transform database photograph to gallery image format
function transformToGalleryImage(photo: Photograph, index: number) {
  return {
    id: index,
    src: photo.url,
    title: photo.title,
    author: photo.author,
    photoDate: photo.photoDate,
    description: photo.description,
  };
}

export default function PhotographPage() {
  const [photographs, setPhotographs] = useState<Photograph[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPhotographs() {
      try {
        const res = await fetch('/api/photographs');
        const data = await res.json();
        
        if (data.success) {
          setPhotographs(data.data);
        }
      } catch (error) {
        console.error('Error fetching photographs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPhotographs();
  }, []);

  if (loading) {
    return (
      <PageLayout title="光影故事" subtitle="TIPC Photographs" headerpic="/images/header/photograph.jpeg">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </PageLayout>
    );
  }
  
  const galleryImages = photographs.map((photo, index) => transformToGalleryImage(photo, index));
  
  return (
    <PageLayout title="光影故事" subtitle="TIPC Photographs" headerpic="/images/header/photograph.jpeg">
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
          <MasonryGallery
            images={galleryImages}
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
