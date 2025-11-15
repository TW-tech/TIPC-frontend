// 光影故事 照片的好看外觀排版
"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Link from "next/link";
import type { GalleryImage } from "@/types";
import { ImageLightbox } from '@/components';
import { bookCardData } from "@/data";
import BookLightbox from "../sections/BookCard";

type LoadMoreConfig =
  | {
      mode: "append";
      batchSize?: number; // how many per click
      buttonText?: string;
    }
  | {
      mode: "link";
      href: string;
      buttonText?: string;
    };

type lightboxMode =
  | {
      mode: "Image";
    }
  | {
      mode: "Book";
    };

type MasonryGalleryProps = {
  images: GalleryImage[];
  breakpointColumnsObj: Record<string, number>;
  loadMoreConfig?: LoadMoreConfig;
  lightboxMode?: lightboxMode;
  gap?: number;
};

export default function MasonryGallery({
  images,
  breakpointColumnsObj,
  loadMoreConfig,
  lightboxMode,
  gap,
}: MasonryGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(
    loadMoreConfig?.mode === "append" ? loadMoreConfig.batchSize || 6 : images.length
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage>({id:0,title:"initial",src:"/icons/logo_b.png/"});
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);

  const openPanel = (e: React.MouseEvent, image: GalleryImage) => {
    setInitialRect(e.currentTarget.getBoundingClientRect());
    setCurrentImage(image);
    setIsOpen(true);
  };

  const handleLoadMore = () => {
    if (loadMoreConfig?.mode === "append") {
      const batchSize = loadMoreConfig.batchSize || 6;
      setVisibleCount((prev) => Math.min(prev + batchSize, images.length));
    }
  };

  const visibleImages = images.slice(0, visibleCount);

  return (
    <div>
      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={`flex gap-${(gap)? gap : 6}`}
        columnClassName="flex flex-col gap-6"
      >
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={(e) => openPanel(e, image)}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </Masonry>

      {/* Load More Button */}
      {loadMoreConfig && (
        <div className="flex justify-center mt-6">
          {loadMoreConfig.mode === "append" ? (
            visibleCount < images.length && (
              <button
                onClick={handleLoadMore}
                className="bg-[#833416] text-white px-8 py-3 rounded-lg hover:bg-[#a0471f] transition-colors font-semibold"
              >
                {loadMoreConfig.buttonText || "Load More"}
              </button>
            )
          ) : (
            <Link
              href={loadMoreConfig.href}
              className="bg-[#833416] text-white px-8 py-3 rounded-lg hover:bg-[#a0471f] transition-colors font-semibold"
            >
              {loadMoreConfig.buttonText || "See More"}
            </Link>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxMode && (
        <div className="flex justify-center mt-6">
          {lightboxMode.mode === "Book" ? (
            <div className="grid grid-cols-1 gap-6 place-items-center">
              <BookLightbox 
                
                book={bookCardData[currentImage.id]} 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialRect={initialRect}
                />
            </div>
          ) : (
            <ImageLightbox
              image={currentImage}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              initialRect={initialRect}
            />
          )}
        </div>
      )}
    </div>
  );
}


/*import MasonryGallery from "@/components/MasonryGallery";
import type { GalleryImage } from "@/types";

const sampleImages: GalleryImage[] = [
  { id: 1, title: "Pic 1", src: "/images/gallery/1.jpg" },
  { id: 2, title: "Pic 2", src: "/images/gallery/2.jpg" },
  { id: 3, title: "Pic 3", src: "/images/gallery/3.jpg" },
];

const breakpoints = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  500: 1,
};

export default function GalleryPage() {
  return (
    <div className="p-10">
      <MasonryGallery images={sampleImages} breakpointColumnsObj={breakpoints} />
    </div>
  );
}




*/ 