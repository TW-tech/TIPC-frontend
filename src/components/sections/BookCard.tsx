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

type BookCardProps = {
  
  book: BookData;
  isOpen: boolean;
  onClose: () => void;
  initialRect: DOMRect | null;
};

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
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div ref={backgroundRef} className="fixed inset-0 bg-black/80" />
      <div
        ref={panelRef}
        className="p-6 rounded-lg relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-300 hover:text-white rounded-full shadow hover:bg-white/10 z-20"
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
    <Card className="w-full max-w-[64rem] flex flex-col sm:flex-row items-stretch border-b-0 border-gray-200 relative overflow-hidden">
      {/* 多個 label tag：桌面右上，手機右下 */}
      {/* 桌面版 */}
      {book.tags && book.tags.length > 0 && (
        <>
          <div className="hidden sm:flex absolute top-4 right-4 flex-wrap gap-2 z-10">
            {book.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#CC6915]/10 text-[#CC6915] rounded-lg px-4 py-2 text-base font-bold shadow-md "
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
        <Typography variant="h4" color="gray" className="mb-4 uppercase">
          {book.bookName}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          作者：{book.author.join(", ")}
        </Typography>
         <Typography variant="h6" color="blue-gray" className="mb-2">
          出版社：{book.publisher}
        </Typography>
         <Typography variant="h6" color="blue-gray" className="mb-2">
          出版日期：{book.publicDate}
        </Typography>
         <Typography variant="h6" color="blue-gray" className="mb-2">
          ISBN:{book.isbn}
        </Typography>
         <Typography variant="h6" color="blue-gray" className="mb-2">
          EISBN：{book.eisbn}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
            {book.description}
        </Typography>
        {/* 手機版 label 右下角 */}
        {book.tags && book.tags.length > 0 && (
          <div className="flex sm:hidden w-full justify-end mt-2 gap-2">
            {book.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#CC6915]/10 text-[#CC6915] rounded-lg px-4 py-2 text-base font-bold shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}