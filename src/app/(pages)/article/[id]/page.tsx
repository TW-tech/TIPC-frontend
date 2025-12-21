"use client";

import Link from "next/link";
import Image from "next/image";
import { PageLayout } from '@/components';
import articleData from '@/data/article.json';
import { useParams } from "next/navigation";

export default function ArticlePage() {

  const params = useParams();
  const id = params?.id as string;

  // 按日期排序（新的在前）
  const sortedArticles = articleData.sort((a, b) => {
    // 將日期字串轉換為 uploadDate 物件進行比較
    if (!a.uploadDate || !b.uploadDate) return 0;
    const uploadDateA = new Date(a.uploadDate.replace(/\//g, '-'));
    const uploadDateB = new Date(b.uploadDate.replace(/\//g, '-'));
    return uploadDateB.getTime() - uploadDateA.getTime(); // 降序排列（新的在前）
  });

  return (
    <PageLayout title="觀點文章" subtitle="TIPC Articles" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
        {/* 文化分類區域 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedArticles.map((Article) => (
            <Link 
              key={Article.id}
              href={`/article/${id}/${Article.id}`}
              className="group relative bg-white rounded-1xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
            >
            {/* 主要圖片區域 */}
            {/* 圖片容器 */}
            {/* Thumbnail */}
          <div className="relative w-full h-60">
            <Image
              src={Article.imageMain}
              alt={Article.title}
              fill
              className="object-cover"
            />
            
            {/* Category Badge */}
            {Article.nineBlocks && (
              <div className="absolute bottom-0 left-0 flex">
                <div className="bg-orange-600 text-white px-2 py-2 font-bold text-base text-center">
                  文化影響力平台
                </div>
                <div className="bg-white text-black px-2 py-2 font-bold text-base text-center">
                  TIPC
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-gray-900 text-lg sm:text-2xl font-bold mb-2 line-clamp-2">
              {Article.title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < Article.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>

            {/* Tags */}
            {Article.keyWords && Article.keyWords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Article.keyWords.map((keyWords, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white text-black text-xs sm:text-base font-semibold px-3 py-1 rounded-full border border-gray-300"
                  >
                    {keyWords}
                  </span>
                ))}
              </div>
            )}
          </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
