// TIPC影音
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { MediaGalleryProps, VideoItem } from '@/types';
import { useState, useRef } from 'react';
import { ImageLightbox } from '@/components';
import type { photographImage } from '@/types';


const MediaGallery = ({ items = [] }: MediaGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<VideoItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);

  const handleImageClick = (item: VideoItem, rect: DOMRect) => {
    setSelectedImage(item);
    setInitialRect(rect);
    setIsOpen(true);
  };

  const handleImageChange = (newImage: photographImage) => {
    const videoItem = items.find(item => item.imageUrl === newImage.src);
    if (videoItem) {
      setSelectedImage(videoItem);
    }
  };

  // Convert VideoItem to photographImage format for ImageLightbox
  const convertToPhotographImage = (item: VideoItem): photographImage => ({
    id: parseInt(item.id.replace(/\D/g, '')) || 0,
    src: item.imageUrl,
    title: item.title || item.altText,
    description: item.description || '',
    author: item.author || '',
    photoDate: item.photoDate || '',
    cakeCategory: [],
    nineBlocks: [],
    subID: '',
    size: item.size || 'wide',
    uploadDate: '',
  });

  // Get all images for navigation in lightbox
  const allImages = items
    .filter(item => item.type === 'image')
    .map(convertToPhotographImage);

  return (
    <>
      <div className="w-full min-h-screen p-5 md:p-10 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[320px] gap-6 max-w-[1400px] mx-auto">
          {items.map((item) => (
            <Tile 
              key={item.id} 
              item={item} 
              onVideoClick={setSelectedVideo}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            onClick={() => setSelectedVideo(null)}
          >
            ✕
          </button>
          <div 
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedVideo}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <ImageLightbox
          image={convertToPhotographImage(selectedImage)}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedImage(null);
          }}
          initialRect={initialRect}
          allImages={allImages}
          onImageChange={handleImageChange}
        />
      )}
    </>
  );
};

// --- Sub Component: Tile ---
const Tile = ({ 
  item, 
  onVideoClick, 
  onImageClick 
}: { 
  item: GalleryItem;
  onVideoClick?: (videoUrl: string) => void;
  onImageClick?: (item: GalleryItem, rect: DOMRect) => void;
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  let spanClass = 'col-span-1 row-span-1';
  if (item.size === 'wide') spanClass = 'col-span-1 md:col-span-2';
  if (item.size === 'tall') spanClass = 'col-span-1 md:row-span-2';

  let overlayClass = 'bg-black/20 hover:bg-black/40';
  let contentLayout = '';

  if (item.type === 'video') {
    contentLayout = 'items-end';
    overlayClass = 'bg-gradient-to-t from-black/90 via-black/70 to-transparent';
  } else if (item.type === 'image') {
    contentLayout = 'justify-end items-end';
  } else if (item.type === 'article') {
    contentLayout = 'flex-col justify-end';
    overlayClass = 'bg-gradient-to-t from-black/90 via-black/30 to-transparent';
  }

  const tileClasses = `
    group relative block overflow-hidden rounded-2xl bg-gray-200 shadow-lg text-white
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-2xl cursor-pointer
    ${spanClass}
  `;

  const content = (
    <>
      <Image 
        src={item.imageUrl} 
        alt={item.altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105 z-0"
      />
      
      <div className={`absolute inset-0 z-10 flex p-6 transition-colors duration-300 ${overlayClass} ${contentLayout}`}>
        
        {/* === Video Type === */}
        {item.type === 'video' && (
          <div className="w-full p-4">
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/80 md:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Video info */}
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-200 line-clamp-2">{item.description}</p>
            </div>
          </div>
        )}

        {/* === Image Type === */}
        {item.type === 'image' && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl text-white opacity-70 backdrop-blur-sm transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100">
            ⤢
          </div>
        )}

        {/* === Article Type === */}
        {item.type === 'article' && (
          <div className="w-full translate-y-0 transition-transform duration-300">
            <h3 className="mb-4 font-serif text-2xl font-normal leading-snug text-white">
              {item.title}
            </h3>
            <div className="flex items-center justify-between border-t border-white/30 pt-4 text-sm text-gray-300">
              <span>See More</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Handle click based on type
  const handleClick = () => {
    if (item.type === 'video' && item.linkHref && onVideoClick) {
      onVideoClick(item.linkHref);
    } else if (item.type === 'image' && onImageClick && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      onImageClick(item, rect);
    }
  };

  if (item.type === 'article' && item.linkHref) {
    return (
      <Link href={item.linkHref} className={tileClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div 
      ref={imageRef}
      className={tileClasses}
      role="button"
      aria-label={item.type === 'video' ? 'Play Video' : 'View Image'}
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default MediaGallery;