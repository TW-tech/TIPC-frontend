"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from '@/components';
import { cultureItemsData } from "@/data";
import Image from "next/image";


const mediaTypes = [
  { id: "article", label: "觀點文章",text: "文章" , logo: "/images/culture/article.png" },
  { id: "story", label: "光影故事" ,text: "照片", logo: "/images/culture/photo.png" },
  { id: "gallery", label: "TIPC影音" ,text: "影音", logo: "/images/culture/video.png" },
];

export default function MediaSelectPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;
  const cultureitem = cultureItemsData.find((item) => item.id === id);

  if (!cultureitem) {
    return <p className="text-center mt-10">culturedata not found.</p>;
  }
  

  return (
    <PageLayout title={cultureitem.title} subtitle="Media Selection">
      <div className="min-h-screen bg-gray-50">

        <section className="pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4 bg-[#FAF9EB]">
              <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full sm:w-[82%]">
                  
                  
                  {/* media selection (3 options) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                    {mediaTypes.map((mediatype) => (
                      <Link
                        key={mediatype.id}
                        href={`/${mediatype.id}/${cultureitem.id}`}
                        className="partner-card group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100 flex-1 min-w-[200px]"
                      >
                        {/* 圖片容器 */}
                        <div className="relative h-50 sm:h-100 md:h-100 lg:h-100 xl:h-150 overflow-hidden">
                          <Image
                            src={mediatype.logo}
                            alt={mediatype.label}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                          />

                          {/* 黑色漸層 + 文字 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                            <h3 className="text-white font-bold text-center text-xl sm:text-4xl lg:text-7xl text-shadow-lg [writing-mode:vertical-rl]">
                              {mediatype.text}
                            </h3>
                          </div>
                        </div>
                      </Link>
                  ))}
                  </div>
                </div>
              </div>
            </section>

        
      </div>
    </PageLayout>
  );
}
