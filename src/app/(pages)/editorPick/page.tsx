"use client";

import Link from "next/link";
import Image from "next/image";
import { PageLayout } from '@/components';
import editorPickData from '@/data/editorPick.json';

export default function EditorPickAllPage() {

  return (
    <PageLayout title="影響力精選" subtitle="TIPC Selections" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
        {/* 精選新聞區域 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {editorPickData.map((pick) => (
            <Link 
              key={pick.id}
              href={`/editorPick/${pick.id}`}
              className="group relative bg-white rounded-1xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
            >
            {/* 主要圖片區域 */}
            <div className="relative w-full h-60">
              <Image
                src={pick.image}
                alt={pick.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-gray-900 text-lg sm:text-2xl font-bold mb-2 line-clamp-2">
                {pick.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base line-clamp-3 flex-grow">
                {pick.description}
              </p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
