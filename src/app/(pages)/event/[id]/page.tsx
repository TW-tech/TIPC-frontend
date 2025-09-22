"use client";

import { Metadata } from 'next';
import Image from "next/image";
import Masonry from "react-masonry-css";
import { PageLayout } from '@/components';
import { useParams } from "next/navigation";
import { eventData } from "@/data";

export default function EventContentPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;
  const Eventitem = eventData.find((item) => item.id === id);

  if (!Eventitem) {
    return <p className="text-center mt-10">Articledata not found.</p>;
  }

  const breakpointColumnsObj = {
    default: 3, // 4 columns desktop
    1280: 3,
    1024: 3,
    768: 2,
    500: 2,
  };
  
  return (
    <PageLayout title="活動探索" subtitle="Event">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title + Meta */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-gray-700 font-bold mb-4">
            {Eventitem.title}
          </h1>
          <p className="text-gray-500 text-sm">{Eventitem.date}</p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src={Eventitem.mainImage}
            alt="cover"
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <section className="prose prose-lg max-w-none">
          <p 
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: Eventitem.description }}
          />

          {/* Inline Image */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6 my-6"
            columnClassName="flex flex-col gap-6"
          >
            {Eventitem.relatedImages.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={img}
                  alt={`${Eventitem.title} related ${i}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </Masonry>

          
        </section>
      </article>
    </div>
    </PageLayout>
  );
}
