// 光影故事 照片的好看外觀排版
"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Link from "next/link";
import type { photographImage } from "@/types";
import { ImageLightbox } from '@/components';
import bookData from '@/data/book.json';
import BookLightbox from "../sections/BookCard";
import type { MasonryGalleryProps } from '@/types';

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
  const [currentImage, setCurrentImage] = useState<photographImage>({id:0,title:"initial",src:"/icons/logo_b.png/"});
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
  const [zoomedImage, setZoomedImage] = useState<photographImage | null>(null);

  const openPanel = (e: React.MouseEvent, image: photographImage) => {
    if (lightboxMode?.mode === "zoom") {
      setZoomedImage(image);
    } else {
      setInitialRect(e.currentTarget.getBoundingClientRect());
      setCurrentImage(image);
      setIsOpen(true);
    }
  };

  const handleImageChange = (image: photographImage) => {
    setCurrentImage(image);
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
        className="flex"
        columnClassName="flex flex-col"
        style={{ gap: gap ? `${gap}px` : '24px' }}
      >
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer mb-6 group"
            onClick={(e) => openPanel(e, image)}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
            {lightboxMode?.mode === "zoom" && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white p-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            )}
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
      {lightboxMode && lightboxMode.mode !== "zoom" && (
        <div className="flex justify-center mt-6">
          {lightboxMode.mode === "Book" ? (
            <div className="grid grid-cols-1 gap-6 place-items-center">
              <BookLightbox 
                book={bookData[currentImage.id]} 
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
              allImages={images}
              onImageChange={handleImageChange}
            />
          )}
        </div>
      )}

      {/* Simple Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.title}
              width={1920}
              height={1080}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}