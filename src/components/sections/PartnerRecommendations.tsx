"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { partnersData } from "@/data";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function PartnerRecommendations() {
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

  const handlePartnerClick = (website?: string) => {
    // 導航到合作夥伴詳細頁面
    window.open(website, '_blank');
  };
  
  return (
    <section ref={sectionRef} className="pt-2 pb-2 sm:pt-2 sm:pb-3 lg:pt-2 lg:pb-4 bg-[#FAF9EB]">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[82%]">
          {/* 標題區塊 */}
          <div ref={titleRef} className="text-center mb-2 sm:mb-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 max-w-3xl mx-auto leading-relaxed">
              合作夥伴推薦
            </p>
          </div>
          
          {/* 合作夥伴卡片 - 3個一排對齊Slogan */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {partnersData.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`}
                onClick={() => handlePartnerClick(partner.website)}
                className="partner-card group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
              >
                {/* 圖片容器 */}
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                <Image 
                  src={partner.image} 
                  alt={partner.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* 內容區塊 */}
              <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {partner.name}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 line-clamp-3 flex-1">
                  {partner.description}
                </p>
                
                {/* 瞭解更多連結 */}
                <div className="flex justify-center">
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-gray-800 hover:text-red-600 transition-colors duration-300"
                  >
                    了解更多
                  </a>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
