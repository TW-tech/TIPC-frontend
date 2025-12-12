// 光影故事 圖片點擊後的視窗
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { storyImage } from "@/types";
import { ImageLightboxProps } from "@/types";

export default function ImageLightbox({
  image,
  isOpen,
  onClose,
  initialRect,
  allImages = [],
  onImageChange,
}: ImageLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  // Handle related image click
  const handleRelatedImageClick = (relatedImg: storyImage) => {
    if (onImageChange) {
      onImageChange(relatedImg);
    }
  };

  // zoom animation helper
  const zoom = () => {
    if (panelRef.current && initialRect && backgroundRef.current) {
      const panelRect = panelRef.current.getBoundingClientRect();
      const scaleX = initialRect.width / panelRect.width;
      const scaleY = initialRect.height / panelRect.height;
      const translateX =
        initialRect.left +
        initialRect.width / 2 -
        (panelRect.left + panelRect.width / 2);
      const translateY =
        initialRect.top +
        initialRect.height / 2 -
        (panelRect.top + panelRect.height / 2);

      panelRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scaleX}, ${scaleY})`;
      panelRef.current.style.opacity = "0";
      backgroundRef.current.style.opacity = "0";
    }
  };

  // open animation
  useEffect(() => {
    if (isOpen && panelRef.current && initialRect && backgroundRef.current) {
      zoom();
      requestAnimationFrame(() => {
        if (panelRef.current && backgroundRef.current) {
          panelRef.current.style.transition =
            "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
          panelRef.current.style.transform = "none";
          panelRef.current.style.opacity = "1";
          backgroundRef.current.style.transition = "opacity 0.5s ease-in-out";
          backgroundRef.current.style.opacity = "1";
        }
      });

      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, initialRect]);

  // close animation
  const handleClose = () => {
    document.body.style.overflow = "";
    if (!panelRef.current || !initialRect) {
      onClose();
      return;
    }

    zoom();
    setTimeout(() => {
      onClose();
      if (panelRef.current) {
        panelRef.current.style.transform = "";
        panelRef.current.style.opacity = "";
      }
    }, 500);
  };

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div ref={backgroundRef} className="fixed inset-0 bg-black/80" />
      <div
        ref={panelRef}
        className="bg-white rounded-lg relative max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 text-2xl font-bold text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Left side - Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-6 md:p-8 relative">
          <div 
            className="relative group cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageEnlarged(true);
            }}
            title="點擊查看大圖"
          >
            <Image
              src={image.src}
              alt={image.title}
              width={800}
              height={600}
              className="max-h-[40vh] md:max-h-[80vh] w-auto object-contain hover:opacity-90 transition-opacity"
            />
            {/* Enlarge Icon */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white p-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {image.title}
              </h2>
            </div>

            {/* Author */}
            {image.author && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  作者 Author
                </h3>
                <p className="text-lg text-gray-800">{image.author}</p>
              </div>
            )}

            {/* photoDate */}
            {image.photoDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  攝影日期 photoDate
                </h3>
                <p className="text-lg text-gray-800">{image.photoDate}</p>
              </div>
            )}

            {/* Category */}
            {image.category && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  分類 Category
                </h3>
                <p className="text-lg text-gray-800">{image.category}</p>
              </div>
            )}

            {/* Description */}
            {image.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  描述 Description
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {image.description}
                </p>
              </div>
            )}

            {/* Related Images from Same Author */}
            {image.author && allImages.length > 0 && (() => {
              const relatedImages = allImages.filter(
                (img) => img.author === image.author && img.id !== image.id
              );
              return relatedImages.length > 0 ? (
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    相關圖片 Related Images
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {relatedImages.map((relatedImg) => (
                      <div
                        key={relatedImg.id}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => handleRelatedImageClick(relatedImg)}
                      >
                        <Image
                          src={relatedImg.src}
                          alt={relatedImg.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                            {relatedImg.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>


      </div>

      {/* Enlarged Image Modal */}
      {isImageEnlarged && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsImageEnlarged(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            onClick={() => setIsImageEnlarged(false)}
          >
            ✕
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
