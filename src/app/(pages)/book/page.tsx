"use client";

import { BookCard, PageLayout } from '@/components';
import { bookCardData } from "@/data";


export default function BookPage() {
  return (
    <PageLayout title="TIPC選書" subtitle="Book" headerpic="/images/header/book.jpeg">
      <div className="min-h-screen bg-gray-50">

        {/* 主要內容區域 */}
        <div className="mx-auto px-10 sm:px-10 lg:px-30 py-16">
          {/* 文化分類區域 */}
          <div className="grid grid-cols-1 gap-6 place-items-center">
            {bookCardData.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
       
    </PageLayout>
  );
}
