"use client";

import { useEffect } from 'react';
import MediaGallery from "@/components/sections/MediaGallery";
import PageLayout from "@/components/layout/PageLayout";
import { GalleryItem } from '@/types';
import articleData from '@/data/article.json';
import photographData from '@/data/photograph.json';
import videoData from '@/data/video.json';

export default function LocalRevitalizationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Filter and transform articles
  const filteredArticles: GalleryItem[] = articleData
    .filter((article) => 
      article.cakeCategory?.includes("地方創生")
    )
    .map((article) => ({
      id: `article-${article.id}`,
      type: 'article' as const,
      imageUrl: article.imageMain,
      altText: article.title,
      title: article.title,
      tag: article.keyWords?.[0] || '',
      linkHref: `/article/all/${article.id}`,
    }));

  // Filter and transform photograph pictures
  const filteredPhotographs: GalleryItem[] = photographData
    .filter((photograph) => 
      photograph.cakeCategory?.includes("地方創生")
    )
    .map((photograph) => ({
      id: `photograph-${photograph.id}`,
      type: 'image' as const,
      size: photograph.size || 'wide' as 'wide' | 'tall' | 'normal' | undefined,
      imageUrl: photograph.src,
      altText: photograph.title,
      title: photograph.title,
      author: photograph.author,
      photoDate: photograph.photoDate,
      description: photograph.description,
    }));

  // Filter and transform videos
  const filteredVideos: GalleryItem[] = videoData
    .filter((video) => 
      video.cakeCategory?.includes("地方創生")
    )
    .map((video) => ({
      id: `video-${video.id}`,
      type: 'video' as const,
      imageUrl: video.thumbnail,
      altText: video.title,
      title: video.title,
      linkHref: video.src,
      description: video.description,
      keywords: video.keywords,
      duration: video.duration,
      cakeCategory: video.cakeCategory,
    }));

  // Combine all filtered media
  const allFilteredMedia = [
    ...filteredArticles,
    ...filteredPhotographs,
    ...filteredVideos,
  ];

  return (
    <PageLayout 
      title="地方創生" 
      subtitle="Regional Revitalization"
      headerpic="/images/header/NineBlock.jpg"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8">
          {allFilteredMedia.length > 0 ? (
            <MediaGallery items={allFilteredMedia} />
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">
                目前沒有「地方創生」的內容
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
