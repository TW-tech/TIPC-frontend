"use client";

import { useState, useEffect } from 'react';
import { PageLayout ,MasonryGallery} from '@/components';
import type { photographImage } from "@/types";

export default function BookPage() {
  const [bookData, setBookData] = useState<any[]>([]);
  const [BookCoverImages, setBookCoverImages] = useState<photographImage[]>([]);

  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books');
        const result = await response.json();
        if (result.success) {
          // Transform to BookData format for BookCard component
          const transformedBooks = result.data.map((book: any) => ({
            id: book.id,
            bookName: book.bookname,
            author: book.authors,
            image: book.image,
            uploadDate: book.createdAt,
            publisher: book.publisher,
            isbn: book.isbn,
          }));
          setBookData(transformedBooks);
          
          // Transform book data to photographImage format for MasonryGallery
          const images: photographImage[] = transformedBooks.map((book: any, index: number) => ({
            id: index,
            title: book.bookName,
            src: book.image,
            description: '',
            author: book.author.join(', '),
            uploadDate: book.uploadDate,
            photoDate: book.uploadDate,
            cakeCategory: [],
            nineBlocks: [],
            subID: book.id,
            size: '',
          })).reverse();
          
          setBookCoverImages(images);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <PageLayout title="TIPC選書" subtitle="Books We Love" headerpic="/images/header/book.jpeg">
      <div className="min-h-screen bg-gray-50">
        {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto p-6">
          <MasonryGallery
            images={BookCoverImages}
            books={bookData}
            breakpointColumnsObj={{
              default: 4, // 4 columns desktop
              1280: 4,
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
              mode:"Book"
            }}
            gap={10}
          />
        </div>

        
        
      </div>
       
    </PageLayout>
  );
}
