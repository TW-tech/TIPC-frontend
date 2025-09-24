"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from '@/components';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cultureItemsData, CultureArticleData, allImages, videosData } from "@/data";

const mediaTypes = [
  { id: "article", label: "觀點文章",text: "文章" , logo: "/images/culture/article.png" },
  { id: "story", label: "光影故事" ,text: "照片", logo: "/images/culture/photo.png" },
  { id: "gallery", label: "TIPC影音" ,text: "影音", logo: "/images/culture/video.png" },
];

type SpotlightListProps<T> = {
  items: T[];
  titleKey: keyof T;      // field name for text
  imageKey: keyof T;      // field name for image
  TypeKey: string;      // TYPE of media
  CultureKey: string;   // culture type key
  TitleKey: string; 
  BGcolor: string;
};

export function SpotlightList<T extends Record<string, any>>({
  items,
  titleKey,
  imageKey,
  TypeKey,
  CultureKey,
  TitleKey,
  BGcolor,
}: SpotlightListProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(items.length); // start index
  const listRef = useRef<HTMLDivElement>(null);

  // Circular scrolling
  const move = (dir: number) => {
    setCurrentIndex((i) => {
      const next = (i + dir + items.length) % items.length + items.length;
      return next;
    });
  };

  // Handle scroll only when cursor is over list
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return; // ignore if not inside list
      e.preventDefault(); // prevent page scroll
      if (e.deltaY > 0) move(1);
      else move(-1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [items.length]);

  return (
    <div 
        ref={listRef}
        className={`bg-[${BGcolor}] flex flex-col items-center  rounded-2xl `}
        >
          <h2 className="text-center text-3xl font-bold my-3">{TitleKey}</h2>
      {/* Items */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 my-3">
        {Array.from({ length: items.length * 3 }).map((_, i) => {
          //const offset = i - currentIndex;
          const virtualIndex = i;
          const realIndex = virtualIndex % items.length;
          const offset = virtualIndex - currentIndex;
          if (Math.abs(offset) > 3 ) return null;

          const opacity =
            offset === 0
              ? "opacity-100"
              : Math.abs(offset) === 1
              ? "opacity-75"
              : "opacity-50";

          const item = items[realIndex];
          const title = String(item[titleKey]);
          const image = String(item[imageKey]);

          return (
            <div
              key={i}
              className={`transition-all duration-300 ${
                offset === 0 ? "opacity-100 scale-105" : "opacity-50 scale-90"
              } flex flex-col items-center cursor-pointer`}
            >
              {offset === 0 ? (
                <div>
                  <div className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2">
                      {title}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-black text-sm">{title}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* "More" item */}
      <Link
        href={`/${TypeKey}/${CultureKey}`}
        className="mt-4 text-blue-600 underline hover:text-blue-800"
      >
        更多內容
      </Link>
    </div>
  );
}

export default function MediaSelectPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;
  const cultureitem = cultureItemsData.find((item) => item.id === id);

  if (!cultureitem) {
    return <p className="text-center mt-10">culturedata not found.</p>;
  }
  

  return (
    <PageLayout title={cultureitem.title} subtitle="Media Selection" headerpic="/images/culture/怎麼做.jpg">
      <div className="min-h-screen bg-gray-50">
                {/* test list */}
            <div className="mx-auto px-4 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Map fields flexibly */}
                <SpotlightList items={CultureArticleData} titleKey="title" imageKey="image" TypeKey="article" CultureKey={cultureitem.id} TitleKey="觀點文章" BGcolor="#FFB95F"/>
                <SpotlightList items={allImages} titleKey="title" imageKey="src" TypeKey="story" CultureKey={cultureitem.id} TitleKey="光影故事" BGcolor="#CC6915"/>
                <SpotlightList items={videosData} titleKey="title" imageKey="thumbnail" TypeKey="gallery" CultureKey={cultureitem.id} TitleKey="TIPC影音" BGcolor="#833416"/>
              </div>
            </div>

      </div>
    </PageLayout>
  );
}
