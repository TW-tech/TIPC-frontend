"use client";

import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from '@/components';
import { CultureArticleData } from "@/data";
import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function ArticlePage() {

  const params = useParams();
  const id = params?.id as string;

  const [visibleCount, setVisibleCount] = useState(3); // 初始顯示數量
  const articleToShow = CultureArticleData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <PageLayout title="觀點文章" subtitle="Articles" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
        {/* 文化分類區域 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {articleToShow.map((Article) => (
            <Link 
              key={Article.id}
              href={`/article/${id}/${Article.title}`}
              className="group relative bg-white rounded-1xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
            >
            {/* 主要圖片區域 */}
            {/* 圖片容器 */}
            {/* Thumbnail */}
          <div className="relative w-full h-60">
            <Image
              src={Article.image}
              alt={Article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-gray-900 text-lg sm:text-2xl font-bold mb-2 line-clamp-2">
              {Article.title}
            </h2>

            <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3">
              {Article.description}
            </p>

            <div className="absolute bottom-2 left-3">
              <p className="text-xs text-gray-500">{Article.date}</p>
            </div>
          </div>
          </Link>
        ))}
        </div>
        
        {/* 載入更多按鈕 */}
        {visibleCount < CultureArticleData.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-[#833416] text-white px-8 py-3 rounded-lg hover:bg-[#a0471f] transition-colors font-semibold"
            >
              載入更多
            </button>
          </div>
        )}

      </div>
    </div>
    </PageLayout>
  );
}
