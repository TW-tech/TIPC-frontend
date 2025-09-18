"use client";

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Navigation } from '@/components';

interface HeaderProps {
  title: string;
  subtitle?: string;
  headerpic?: string;
}

export default function Header({ title, subtitle, headerpic }: HeaderProps) {

const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-10 transition-all duration-500 bg-bottom bg-cover flex flex-col justify-center text-white ${
        scrolled ? "h-50 sm:h-30" : "h-[30vh]"
      }`}
      style={{ backgroundImage: `url(${headerpic})` }} >
      
      <Navigation variant="header" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {title}
        </h1>
        <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  );
}