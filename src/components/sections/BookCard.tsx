"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { BookData } from "@/types";

export default function BookCard({ book }: { book: BookData }) {
  return (
    <Card className="w-full max-w-[64rem] flex flex-col sm:flex-row items-stretch border-b-2 border-gray-200 relative">
      {/* 多個 label tag：桌面右上，手機右下 */}
      {/* 桌面版 */}
      {book.tags && book.tags.length > 0 && (
        <>
          <div className="hidden sm:flex absolute top-4 right-4 flex-wrap gap-2 z-10">
            {book.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#CC6915]/10 text-[#CC6915] rounded-lg px-4 py-2 text-base font-bold shadow-md"
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
        className="m-0 w-full sm:w-2/5 shrink-0 rounded-none sm:rounded-r-none border-b-2 border-gray-200 flex justify-center items-center"
      >
        <img
          src={book.image}
          alt={book.bookName}
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