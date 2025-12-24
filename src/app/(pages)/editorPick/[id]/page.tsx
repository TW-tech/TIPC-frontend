"use client";

import { useEffect } from "react";
import Image from "next/image";
import { PageLayout } from '@/components';
import { useParams } from "next/navigation";
import editorPickData from "@/data/editorPick.json";
import { notoSerifTC, notoSansTC } from '@/lib/fonts';

export default function EditorPickContentPage() {
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!id) return null;
  const pickItem = editorPickData.find((item) => item.id === id);

  if (!pickItem) {
    return <p className="text-center mt-10">內容未找到。</p>;
  }

  return (
    <PageLayout title="影響力精選" subtitle="TIPC Selections" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <header className="mb-4">
          <blockquote className="text-4xl sm:text-6xl font-bold text-[#CC6915] border-l-4 border-[#CC6915] pl-4 mb-4">
            <h1 className={notoSerifTC.className}>{pickItem.name}</h1>
          </blockquote>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-96 sm:h-[32rem] mb-4">
          <Image
            src={pickItem.image}
            alt="cover"
            fill
            className="object-contain"
          />
        </div>

        {/* Article Content */}
        <section className={`prose prose-xl max-w-none ${notoSansTC.className} font-light`}>
          {/* Description */}
          <div className="space-y-4 pb-6">
            <p className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
              {pickItem.description}
            </p>
          </div>

          {/* External Link Button */}
          {pickItem.website && (
            <div className="flex justify-center mt-8">
              <a 
                href={pickItem.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#CC6915] text-white rounded-full font-semibold hover:bg-[#B55A12] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                see more
              </a>
            </div>
          )}
        </section>
      </article>
    </div>
    </PageLayout>
  );
}
