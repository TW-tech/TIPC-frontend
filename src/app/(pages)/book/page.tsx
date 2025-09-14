"use client";

import { Metadata } from 'next';
import Image from "next/image";
import { PageLayout } from '@/components';
import { CultureExplorerData } from "@/data";

export default function BookPage() {
  const handlePartnerClick = () => {
    // 導航到合作夥伴詳細頁面
    //window.open(website, '_blank');
  };

  return (
    <PageLayout title="TIPC選書" subtitle="Book">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
        {/* 文化分類區域 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CultureExplorerData.map((Explorer, index) => (
            <div 
              key={`${Explorer.id}-${index}`}
              onClick={() => handlePartnerClick()}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
            >
            {/* 主要圖片區域 */}
                          {/* 圖片容器 */}
            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
              <Image 
                src={Explorer.image} 
                alt={Explorer.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              196 80 12
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(196,80,12,0.8)] bg-opacity-30">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                  {Explorer.title}
                </h2>
              </div>
            </div>
            
            {/* 內容區塊 */}
            <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col">
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 line-clamp-3 flex-1">
                {Explorer.description}
              </p>
              
              {/* 瞭解更多連結 */}
              <div className="flex justify-center">
                <a 
                  className="text-sm text-gray-800 hover:text-red-600 transition-colors duration-300 font-bold"
                >
                  了解更多
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>

        {/* 特色內容區域 */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            文化新聞
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">text</h3>
              <p className="text-gray-600 leading-relaxed">
                text
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">text</h3>
              <p className="text-gray-600 leading-relaxed">
                text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
