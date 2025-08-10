"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cultureItemsData } from "@/data";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CultureHighlights() {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  //const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'bigTablet' | 'desktop'>('desktop')

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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

      // Grid animation with stagger effect
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.culture-item');
        
        gsap.fromTo(items,
          {
            opacity: 0,
            scale: 0.8,
            y: 60
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
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
  }, []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 lg:py-12 bg-[#FAF9EB]">
      <div className=" mx-auto px-4 sm:px-22 lg:px-51">
        
        {/* 文化知識容器 - 長方形 2x2 排列 */}
        <div className="w-full">
          <div ref={gridRef} className="aspect-[3/2] sm:aspect-[2/1] grid grid-cols-2 grid-rows-2 gap-1 sm:gap-2 lg:gap-4 bg-[#FAF9EB] sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            {cultureItemsData.map((item) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
              >
                {/* 圖片 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* 遮罩和標題 - 手機顯示，電腦 hover 顯示 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                    <h3 className="text-white font-bold text-sm sm:text-lg lg:text-xl text-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* 懸停效果邊框 - 只在桌面顯示 */}
                <div className="absolute inset-0 border-2 border-transparent md:group-hover:border-blue-500/50 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}