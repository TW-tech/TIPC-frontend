// 九宮格的格子
"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NineBlockCardProps } from '@/types';

const NineBlockCard = ({ number, title, subtitle, color, iconSrc, categoryId, onClick }: NineBlockCardProps) => {
  // Format Chinese title: add line break after 2 characters if title has 4 characters
  const formatTitle = (text: string) => {
    if (text.length === 4) {
      return (
        <>
          {text.slice(0, 2)}
          <br />
          {text.slice(2)}
        </>
      );
    }
    return text;
  };

  return (
    <div 
      className="flex flex-col items-center justify-center px-10 py-8 rounded-lg shadow-md w-full cursor-pointer hover:opacity-90 transition-opacity gap-4"
      style={{ backgroundColor: color }}
      onClick={() => onClick(categoryId)}
    >
      {/* First Row: Number and English */}
      <div className="flex items-center gap-6 w-full justify-center">
        <span className="text-7xl font-bold text-white">
          {number}
        </span>
        <span className="text-4xl font-bold text-white">
          {subtitle}
        </span>
      </div>
      
      {/* Second Row: Icon and Chinese */}
      <div className="flex items-center gap-6 w-full justify-center">
        <div className="text-white">
          <Image 
            src={iconSrc} 
            alt={title}
            width={96}
            height={96}
            className="w-24 h-24"
          />
        </div>
        <span className="text-6xl font-medium text-white text-center leading-tight">
          {formatTitle(title)}
        </span>
      </div>
    </div>
  );
};


const BlockData = () => {
  const router = useRouter();

  const blocks = [
    { number: 1, title: '食', subtitle: 'Food', color: '#94b749', iconSrc: '/icons/nineBlock/Food.png', categoryId: 'food' },
    { number: 2, title: '衣', subtitle: 'Clothing', color: '#e5ab40', iconSrc: '/icons/nineBlock/Clothing.png', categoryId: 'clothing' },
    { number: 3, title: '住', subtitle: 'Housing', color: '#5fb1c0', iconSrc: '/icons/nineBlock/Housing.png', categoryId: 'housing' },
    { number: 4, title: '行', subtitle: 'Transportation', color: '#968cdf', iconSrc: '/icons/nineBlock/Transportation.png', categoryId: 'transportation' },
    { number: 5, title: '育', subtitle: 'Education', color: '#F06A24', iconSrc: '/icons/nineBlock/Education.png', categoryId: 'education' },
    { number: 6, title: '樂', subtitle: 'Entertainment', color: '#A13A3B', iconSrc: '/icons/nineBlock/Entertainment.png', categoryId: 'entertainment' },
    { number: 7, title: '重要事件', subtitle: 'Event', color: '#9D005D', iconSrc: '/icons/nineBlock/event.png', categoryId: 'event' },
    { number: 8, title: '經典節慶', subtitle: 'Festival', color: '#006837', iconSrc: '/icons/nineBlock/Festival.png', categoryId: 'festival' },
    { number: 9, title: '指標產業', subtitle: 'Industry', color: '#662D90', iconSrc: '/icons/nineBlock/Industry.png', categoryId: 'industry' },
  ];

  const handleBlockClick = (categoryId: string) => {
    // Navigate to filtered page with category ID as query parameter
    router.push(`/shared-memory/category?id=${categoryId}`);
    // Scroll to top after navigation
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-7xl mx-auto">
      {blocks.map((block) => (
        <NineBlockCard key={block.number} {...block} onClick={handleBlockClick} />
      ))}
    </div>
  );
};

export default BlockData;