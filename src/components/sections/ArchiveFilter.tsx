// 典藏索引filter
"use client";

import { Button } from "@material-tailwind/react";
import { ArchiveFilterProps } from "@/types";

export default function ArchiveFilter({ onFilterChange, activeFilter }: ArchiveFilterProps) {
  const filters = [
    { 
      key: "照片", 
      label: "照片", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />,
      style: "bg-green-100 text-green-700" 
    },
    { 
      key: "影音", 
      label: "影音", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />,
      style: "bg-yellow-100 text-yellow-700" 
    },
    { 
      key: "地圖", 
      label: "地圖", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />,
      style: "bg-blue-100 text-blue-700" 
    },
    {
        key: "全部",
        label: "全部",
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />,
        style: "bg-gray-200 text-gray-700"
    }
  ];

  return (
   <div className="flex items-center gap-4">
      {filters.map((filter) => (
        <Button 
          key={filter.key}
          onClick={() => {
            if (filter.key === "全部") {
              onFilterChange(null); // 顯示全部資料
            } else {
              onFilterChange(activeFilter === filter.key ? null : filter.key);
            }
          }}
          className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 transition-all duration-200 ${
            (filter.key === "全部" && activeFilter === null) || activeFilter === filter.key
              ? `${filter.style} shadow-lg scale-105` 
              : `${filter.style} hover:shadow-md hover:scale-105`
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            {filter.icon}
          </svg>
          <span className="text-xs sm:text-sm">{filter.label}</span>
        </Button>
      ))}
      
    </div>
  );
}