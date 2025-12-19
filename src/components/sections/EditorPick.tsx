// 影響力精選
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import editorPickData from "@/data/editorPick.json";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function EditorPick() {
  const [isClient, setIsClient] = useState(false);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isClient) {
      return;
    }
    
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Partner cards animation with stagger effect
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.partner-card');
        
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  const handlePartnerClick = (id: string) => {
    // 導航到編輯精選詳細頁面
    window.location.href = `/editorPick/${id}`;
  };
  
  return (
    <section ref={sectionRef} className="pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4 bg-[#FAF9EB]">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[82%]">
          {/* 標題區塊 */}
          <div ref={titleRef} className="text-center mb-2 sm:mb-2">
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 max-w-3xl mx-auto leading-relaxed">
              影響力精選
            </p>
          </div>
          
          {/* 合作夥伴卡片 - 3個一排對齊Slogan */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {editorPickData.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`}
                onClick={() => handlePartnerClick(partner.id)}
                className="partner-card group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
              >
                {/* 圖片容器 */}
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={partner.image} 
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* 文字覆蓋層 - 透明背景 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white w-full">
                      {/* 第一行 - 國家 (小字) */}
                      <p className="text-sm sm:text-base mb-1 text-gray-300">
                        {partner.nation}
                      </p>
                      {/* 第二行 - 標題 (大字) */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 line-clamp-2">
                        {partner.name}
                      </h3>
                      {/* 第三行 - 日期 (小字) */}
                      <p className="text-sm sm:text-base text-gray-300">
                        {partner.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 點擊看更多按鈕 */}
          <div className="flex justify-center mt-8">
            <Link 
              href="/editorPick"
              className="px-8 py-3 bg-[#CC6915] text-white rounded-full font-semibold hover:bg-[#B55A12] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              點擊看更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
