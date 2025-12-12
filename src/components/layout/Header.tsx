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
    <div className={`sticky top-0 z-10 transition-all duration-500 bg-center bg-cover flex flex-col justify-center text-white bg-[rgba(196,80,12,0.5)] bg-blend-multiply ${
        scrolled ? "h-50 sm:h-30" : "h-[30vh]"
      }`}
      style={{ backgroundImage: `url(${headerpic})`}} >
      
      <Navigation variant="header" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
          {title}
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl text-center text-white/90 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  );
}