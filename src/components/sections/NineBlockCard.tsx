"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NineBlockCardProps {
  number: number;
  title: string;
  subtitle: string;
  color: string;
  iconSrc: string;
  categoryId: string;
  onClick: (categoryId: string) => void;
}

const NineBlockCard = ({ number, title, subtitle, color, iconSrc, categoryId, onClick }: NineBlockCardProps) => {
  return (
    <div 
      className="flex items-center justify-between px-10 py-8 rounded-lg shadow-md w-full cursor-pointer hover:opacity-90 transition-opacity"
      style={{ backgroundColor: color }}
      onClick={() => onClick(categoryId)}
    >
      <div className="flex items-center gap-6">
        <span className="text-7xl font-bold text-white">
          {number}
        </span>
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-white">
            {title}
          </span>
          <span className="text-3xl font-bold text-white">
            {subtitle}
          </span>
        </div>
      </div>
      <div className="text-white">
        <Image 
          src={iconSrc} 
          alt={title}
          width={96}
          height={96}
          className="w-24 h-24"
        />
      </div>
    </div>
  );
};

// Example usage
const BlockData = () => {
  const router = useRouter();

  const blocks = [
    { number: 1, title: '食', subtitle: 'Food', color: '#94b749', iconSrc: '/icons/nineBlock/food.png', categoryId: 'food' },
    { number: 2, title: '衣', subtitle: 'Clothing', color: '#e5ab40', iconSrc: '/icons/nineBlock/clothing.png', categoryId: 'clothing' },
    { number: 3, title: '住', subtitle: 'Housing', color: '#5fb1c0', iconSrc: '/icons/nineBlock/housing.png', categoryId: 'housing' },
    { number: 4, title: '行', subtitle: 'Transportation', color: '#968cdf', iconSrc: '/icons/nineBlock/transportation.png', categoryId: 'transportation' },
    { number: 5, title: '育', subtitle: 'Education', color: '#F06A24', iconSrc: '/icons/nineBlock/education.png', categoryId: 'education' },
    { number: 6, title: '樂', subtitle: 'Entertainment', color: '#A13A3B', iconSrc: '/icons/nineBlock/entertainment.png', categoryId: 'entertainment' },
    { number: 7, title: '重要事件', subtitle: 'Event', color: '#9D005D', iconSrc: '/icons/nineBlock/event.png', categoryId: 'event' },
    { number: 8, title: '經典節慶', subtitle: 'Festival', color: '#006837', iconSrc: '/icons/nineBlock/festival.png', categoryId: 'festival' },
    { number: 9, title: '指標產業', subtitle: 'Industry', color: '#662D90', iconSrc: '/icons/nineBlock/industry.png', categoryId: 'industry' },
  ];

  const handleBlockClick = (categoryId: string) => {
    // Navigate to filtered page with category ID as query parameter
    router.push(`/shared-memory/category?id=${categoryId}`);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 w-full max-w-5xl mx-auto">
      {blocks.map((block) => (
        <NineBlockCard key={block.number} {...block} onClick={handleBlockClick} />
      ))}
    </div>
  );
};

export default BlockData;