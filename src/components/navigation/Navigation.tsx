'use client';
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { navItems } from "@/data";

interface NavigationProps {
  variant?: 'main' | 'header' | 'simplified';
  className?: string;
}

export default function Navigation({ variant = 'main', className = '' }: NavigationProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('中文');
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter()
  const pathname = usePathname();
  const logoPath = (variant === 'header') 
    ? "/icons/logo_text_w.png" 
    : "/icons/logo_text_BN.png";

  /*const navItems = [
    { href: '/about', label: '關於我們' },
    { href: '/article/all', label: '觀點文章' },
    { href: '/story/all', label: '光影故事' },
    { href: '/gallery/all', label: 'TIPC影音' },
    { href: '/book', label: 'TIPC選書' },
    { href: '/archive', label: '典藏索引' },
    { href: '/event', label: '活動探索' },
    { href: '/partner', label: '合作夥伴' },
    { href: '/contact', label: '聯絡我們' },
  ];*/

  const handleClick = (href: string) => {
    if (pathname === href) {
      // Already on this page
      setShowPanel(false);
      router.refresh(); // ✅ Reload page
    } else {
      setShowPanel(false);
      router.push(href); // Navigate
    }
  };


  useEffect(() => {
        // 影片欄背景不可滑動 
        if (showPanel) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }
    );

  
  //完整導航
  return (
    <nav className={`absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 sm:px-6 ${className}`}>
      {/* 網頁header-left */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* 網頁icon&title */}
        <Link 
          href="/"
          className="flex items-center p-1 hover:bg-amber-900/20 rounded-lg transition-colors duration-200"
        >
          <div className="relative flex-shrink-0">
            <Image
              src={logoPath}
              alt="Cultural Website Logo"
              width={2605}
              height={506}
              className="w-[160px] sm:w-[140px] lg:w-[220px] h-auto filter "
            />
          </div>
        </Link>
        
        {/* 語言切換按鈕 - 地球圖標 */}
        <div className="relative">
          <button 
            title="切換語言"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="px-3 py-2 hover:bg-amber-900/20 rounded-lg flex items-center space-x-1">
            <svg
              className={`w-7 h-7 ${(variant === 'header')? `text-white` : `text-[#833416]`} `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeWidth={1.5} />
              <path d="M2 12h20" strokeWidth={1.5} />
            </svg>
            <span className={`${(variant === 'header')? `text-white` : `text-[#833416]`} font-bold text-lg leading-none`}>{currentLanguage}</span>
          </button>
          
          {/* 下拉選單 */}
          {isLanguageOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden min-w-[120px] z-30">
              <button
                className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-sm"
                onClick={() => {
                  setCurrentLanguage('中文');
                  setIsLanguageOpen(false);
                }}
              >
                🇹🇼 中文
              </button>
              <button
                className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-sm"
                onClick={() => {
                  setCurrentLanguage('English');
                  setIsLanguageOpen(false);
                }}
              >
                🇺🇸 English
              </button>
              <button
                className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-sm"
                onClick={() => {
                  setCurrentLanguage('日本語');
                  setIsLanguageOpen(false);
                }}
              >
                🇯🇵 日文
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 三槓按鈕 */}
      <button 
        onClick={() => setShowPanel(!showPanel)}
        className="right-0 flex flex-col justify-center items-center space-y-1 p-2 hover:bg-amber-900/20 rounded-lg transition-colors duration-200">
        <div className={`w-7 h-1 sm:w-12 sm:h-2 ${(variant === 'header')? `bg-white` : `bg-[#833416]`} rounded-full`}></div>
        <div className={`w-7 h-1 sm:w-12 sm:h-2 ${(variant === 'header')? `bg-white` : `bg-[#833416]`} rounded-full`}></div>
        <div className={`w-7 h-1 sm:w-12 sm:h-2 ${(variant === 'header')? `bg-white` : `bg-[#833416]`} rounded-full`}></div>
      </button>

      {showPanel && (
        <div 
          className="fixed inset-0 w-screen bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-30"
          onClick={() => setShowPanel(false)}
        />
      )}

      {/* (三)側功能欄 */}
      <div
        className={`fixed top-0 right-0 h-full w-[100%] lg:w-[20%] bg-[rgba(196,80,12,0.7)] shadow-lg z-50 p-6 transform transition-transform duration-300 ${
          showPanel ? '-translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 關閉鍵 */}
        <button
          onClick={() => setShowPanel(false)}
          className="absolute top-4 left-4 text-white-600 hover:text-blue-800"
        >
          ✕
        </button>

        {/* 頁面跳轉選項 */}
        <div className="flex flex-col mt-10 space-y-10 sm:space-y-12 lg:space-y-6">
          {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={`text-center transition-colors duration-300 text-3xl sm:text-[42px] lg:text-[25px]  font-bold ${
              pathname === item.href
                ? 'text-[rgba(24,24,24,0.4)]'
                : 'text-white-900 hover:text-red-700'
            }`}
          >
            {item.label}
          </button>
        ))}
        </div>
        
        <button
          onClick={() => handleClick("/")}
          className="absolute bottom-0 right-0">
          <Image
            src="/icons/logo_w3.png"
            alt="Cultural Website Logo"
            width={1467}
            height={1651}
            className="w-[150px] sm:w-[250px] lg:w-[110px] h-auto filter opacity-70 hover:brightness-0"
          />
        </button>
        
      </div>
        
        
      
      
    </nav>
  );
  

  // 一般頁面的簡化導航
  if (variant === 'simplified') 
  {
    return (
      <nav className={`bg-white shadow-md ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17">
          <div className="absolute top-4 left-0 right-0 z-20 flex justify-between items-center px-4 sm:px-6 h-9">
            <Link href="/" className="text-xl font-bold text-[#833416]">
              文化記憶庫
            </Link>
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#833416] transition-colors duration-200 text-sm font-bold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* 移動端選單按鈕 */}
            <div className="md:hidden">
              <button 
                onClick={() => setShowPanel(!showPanel)}
                className="text-gray-700 hover:text-[#833416]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {showPanel && (
                <div 
                  className="fixed inset-0 w-screen bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-30"
                  onClick={() => setShowPanel(false)}
                />
              )}

              {/* (三)側功能欄 */}
              <div
                className={`fixed  top-0 right-0 h-full w-[100%] lg:w-[20%] bg-[rgba(196,80,12,0.7)] shadow-lg z-50 p-6 transform transition-transform duration-300 ${
                  showPanel ? '-translate-x-0' : 'translate-x-full'
                }`}
              >
                {/* 關閉鍵 */}
                <button
                  onClick={() => setShowPanel(false)}
                  className="absolute top-4 right-4 text-white-600 hover:text-blue-800"
                >
                  ✕
                </button>

                {/* 頁面跳轉選項 */}
                <div className="flex flex-col space-y-4 lg:space-y-6">
                  {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`text-center transition-colors duration-300 text-lg font-bold ${
                      pathname === item.href
                        ? 'text-[rgba(24,24,24,0.4)]'
                        : 'text-white-900 hover:text-red-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
