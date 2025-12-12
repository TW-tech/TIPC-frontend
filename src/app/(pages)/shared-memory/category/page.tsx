"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { PageLayout } from '@/components';
import MediaGallery from '@/components/sections/MediaGallery';
import { GalleryItem } from '@/types';
import articleData from '@/data/article.json';
import storyPicturesData from '@/data/storyPictures.json';
import videoData from '@/data/video.json';

// Mapping from categoryId to Chinese category name
const categoryMap: { [key: string]: string } = {
  food: '食',
  clothing: '衣',
  housing: '住',
  transportation: '行',
  education: '育',
  entertainment: '樂',
  event: '重要事件',
  festival: '經典節慶',
  industry: '指標產業',
};

function CategoryContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id') || '';
  const categoryName = categoryMap[categoryId] || categoryId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and transform articles
  const filteredArticles: GalleryItem[] = articleData
    .filter((article) => 
      article.cakeCategory?.includes("文化記憶") &&
      article.nineBlocks?.includes(categoryName)
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

  // Filter and transform story pictures
  const filteredStoryPictures: GalleryItem[] = storyPicturesData
    .filter((story) => 
      story.cakeCategory?.includes("文化記憶") &&
      story.nineBlocks?.includes(categoryName)
    )
    .map((story) => ({
      id: `story-${story.id}`,
      type: 'image' as const,
      size: story.size as 'wide' | 'tall' | 'normal' | undefined,
      imageUrl: story.src,
      altText: story.title,
      title: story.title,
      author: story.author,
      photoDate: story.photoDate,
      description: story.description,
    }));

  // Filter and transform videos
  const filteredVideos: GalleryItem[] = videoData
    .filter((video) => 
      video.cakeCategory?.includes("文化記憶") &&
      video.nineBlocks?.includes(categoryName)
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
    ...filteredStoryPictures,
    ...filteredVideos,
  ];

  return (
    <PageLayout 
      title={`文化記憶 - ${categoryName}`} 
      subtitle="Cultural Memory" 
      headerpic="/images/header/NineBlock.jpg"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8">
          {allFilteredMedia.length > 0 ? (
            <MediaGallery items={allFilteredMedia} />
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">
                目前沒有「{categoryName}」分類的內容
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default function CategoryFilterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">載入中...</p>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
