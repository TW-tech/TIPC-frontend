// 影片pop up screen
"use client";

import Image from "next/image";
import {VideoBlockProps} from '@/types'
export default function VideoBlock({ 
  video, 
  onClick, 
  showTextAlways = false,
  className = ""
}: VideoBlockProps) {
  return (
    <div
      className={`video-card group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 ${className}`}
      onClick={onClick}
    >
      {/* 影片縮圖區域 */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* 影片播放圖示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/80 md:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 詳細描述 */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent ${showTextAlways ? '' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'} transition-opacity duration-500 flex items-end`}>
        <div className="p-4 md:p-6 text-white w-full">
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{video.title}</h3>
          <p className={`text-xs md:text-sm leading-relaxed text-gray-200 ${showTextAlways ? 'line-clamp-3' : 'line-clamp-3 md:line-clamp-none'}`}>{video.description}</p>
          <div className="mt-3 md:mt-4 flex items-center justify-between w-full">
            <div className="flex gap-2 flex-wrap">
              {video.keywords.filter(keyword => keyword).map((keyword, index) => (
                <span key={index} className="text-xs md:text-sm bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
            <span className="text-xs md:text-sm font-medium whitespace-nowrap ml-2">{video.duration}</span>
          </div>
        </div>
      </div>

      {/* 懸停效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
