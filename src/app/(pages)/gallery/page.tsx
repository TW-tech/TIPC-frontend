'use client';

import { useState } from 'react';
import Image from "next/image";
import { Metadata } from 'next';
import { PageLayout } from '@/components';

/*export const metadata: Metadata = {
  title: '影像藝廊 - 文化記憶庫',
  description: '瀏覽豐富的文化影像收藏，包括歷史照片、藝術作品和文物紀錄',
};*/

// 影像資料（local）
const imageCount = 0;

const allImages = Array.from({ length: imageCount }, (_, index) => ({
  id: index + 1,
  title: `文化影像 ${index + 1}`, // <-- backticks, not quotes
  src: `/images/gallery/${index + 1}.jpg`
}));


export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(12); // 初始顯示數量
  const imagesToShow = allImages.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header 區域 */}
        <div className="bg-[#CC6915] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              影像藝廊
            </h1>
            <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
              text
            </p>
          </div>
        </div>

        {/* 主要內容區域 */}
        <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
          {/* 分類篩選 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-[#833416] text-white px-6 py-2 rounded-full hover:bg-[#a0471f] transition-colors">
              g1
            </button>
            <button className="bg-white text-[#833416] border border-[#833416] px-6 py-2 rounded-full hover:bg-[#833416] hover:text-white transition-colors">
              g2
            </button>
            <button className="bg-white text-[#833416] border border-[#833416] px-6 py-2 rounded-full hover:bg-[#833416] hover:text-white transition-colors">
              g3
            </button>
            <button className="bg-white text-[#833416] border border-[#833416] px-6 py-2 rounded-full hover:bg-[#833416] hover:text-white transition-colors">
              g4
            </button>
            <button className="bg-white text-[#833416] border border-[#833416] px-6 py-2 rounded-full hover:bg-[#833416] hover:text-white transition-colors">
              g5
            </button>
          </div>

          {/* 影像展示區域 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imagesToShow.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#833416]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-[#833416] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      查看詳情
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 載入更多按鈕 */}
          {visibleCount < allImages.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="bg-[#833416] text-white px-8 py-3 rounded-lg hover:bg-[#a0471f] transition-colors font-semibold"
              >
                載入更多影像
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
