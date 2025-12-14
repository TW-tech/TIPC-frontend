"use client";

import { useEffect, useState } from "react";
import { Navigation } from '@/components';
import { HeaderProps } from '@/types';

export default function Header({ title, subtitle, headerpic }: HeaderProps) {

const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-500 bg-center bg-cover flex flex-col text-white bg-[rgba(196,80,12,0.5)] bg-blend-multiply ${
        scrolled ? "h-24 sm:h-20 justify-end pb-2" : "h-[30vh] justify-center"
      }`}
      style={{ backgroundImage: `url(${headerpic})`}} >
      
      <Navigation variant="header" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`font-bold text-center transition-all duration-500 ${
          scrolled 
            ? "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-0.5" 
            : "text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl mb-6"
        }`}>
          {title}
        </h1>
        <p className={`text-center text-white/90 max-w-3xl mx-auto transition-all duration-500 ${
          scrolled 
            ? "text-[10px] sm:text-xs md:text-sm lg:text-base" 
            : "text-lg sm:text-xl md:text-2xl lg:text-4xl"
        }`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}