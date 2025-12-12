// TIPC選書方格
"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { BookData } from "@/types";
import { useRef, useEffect } from "react";
import {BookCardProps} from '@/types'


export default function BookLightbox({
  book,
  isOpen,
  onClose,
  initialRect,
}: BookCardProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div ref={backgroundRef} className="fixed inset-0 bg-black/80" />
      <div
        ref={panelRef}
        className="relative max-h-[95vh] max-w-[90rem] w-full overflow-y-auto bg-white rounded-lg p-6 [&::-webkit-scrollbar]:hidden scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-2xl font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-20"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Book */}
        <BookCard book={book} />
        
      </div>
    </div>
  );
}


function BookCard({ book  }: { book: BookData }) {
  return (
    <Card className="w-full max-w-[90rem] flex flex-col sm:flex-row items-stretch border-b-0 border-gray-200 relative overflow-hidden">
      {/* 多個 label tag：桌面右上，手機右下 */}
      {/* 桌面版 */}
      {book.tags && book.tags.length > 0 && (
        <>
          <div className="hidden sm:flex absolute top-4 right-4 flex-wrap gap-2 z-10">
            {book.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#CC6915]/10 text-[#CC6915] rounded-lg px-6 py-3 text-xl md:text-2xl font-bold shadow-md "
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full sm:w-2/5 shrink-0 rounded-none sm:rounded-r-none border-b-0 border-gray-200 flex justify-center items-center "
      >
        <Image
          src={book.image}
          alt={book.bookName}
          width={160}
          height={160}
          className="object-cover w-40 h-40 sm:w-full sm:h-full"
        />
      </CardHeader>
  <CardBody className="w-full flex flex-col">
        <Typography variant="h2" color="gray" className="mb-6 uppercase text-2xl md:text-5xl font-bold">
          {book.bookName}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-3 text-base md:text-3xl">
          作者：{book.author.join(", ")}
        </Typography>
         <Typography variant="h4" color="blue-gray" className="mb-3 text-base md:text-3xl">
          出版社：{book.publisher}
        </Typography>

         <Typography variant="h4" color="blue-gray" className="mb-3 text-base md:text-3xl">
          ISBN:{book.isbn}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-3 text-base md:text-3xl">
          推薦人:{book.referencePerson}
        </Typography>

      </CardBody>
    </Card>
  );
}