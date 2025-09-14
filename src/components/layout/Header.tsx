import Image from "next/image";
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="bg-[#CC6915] text-white py-16">
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