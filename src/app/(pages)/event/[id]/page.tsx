"use client";
import Image from "next/image";
import { PageLayout, MasonryGallery } from '@/components';
import { useParams } from "next/navigation";
import  eventData  from "@/data/events.json";

export default function EventContentPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;
  const Eventitem = eventData.find((item) => item.id === id);

  if (!Eventitem) {
    return <p className="text-center mt-10">Articledata not found.</p>;
  }

  // Split description into paragraphs on newline(s) so each line becomes a separate paragraph
  const descriptionParagraphs = (Eventitem.description || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  // masonry breakpoints are configured inline where used
  
  return (
    <PageLayout title="活動探索" subtitle="Events" headerpic="/images/header/event.jpeg">
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
          {/* Description rendered as paragraphs with spacing and bottom padding */}
          <div className="space-y-4 pb-6">
            {descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Inline Image */}
          <MasonryGallery
            images={Eventitem.relatedImages}
            breakpointColumnsObj={{
              default: 3, // 4 columns desktop
              1280: 3,
              1024: 3,
              768: 2,
              500: 2,
            }}
            loadMoreConfig={{
              mode: "append",
              batchSize: 12, 
              buttonText: "載入更多",
            }}
            lightboxMode={{
              mode:"Image"
            }}
          />

          
        </section>
      </article>
    </div>
    </PageLayout>
  );
}
