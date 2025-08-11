"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Slogan() {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // GSAP animations via useGSAP a(scoped to sectionRef)
  useGSAP(() => {
    const textEl = textContainerRef.current;
    const imageEl = imageContainerRef.current;

    if (!textEl || !imageEl) {
      return;
    }

    // Kill existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(t => {
      const hasTrigger = (obj: unknown): obj is { trigger?: Element } =>
        typeof obj === 'object' && obj !== null && 'trigger' in obj;
      const trg = hasTrigger(t) ? t.trigger : undefined;
      if (trg && (trg === textEl || trg === imageEl)) {
        t.kill();
      }
    });

    // Get paragraphs for text animation
    const paragraphs = textEl.querySelectorAll('p');

    // Text animation - proper fromTo setup
    if (paragraphs.length > 0) {
      gsap.fromTo(
        paragraphs,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: textEl,
            start: "top 80%",
            toggleActions: "restart none restart none",
            markers: false,
          }
        }
      );
    }

    // Image animation - proper fromTo setup
    gsap.fromTo(
      imageEl,
      { opacity: 0, x: 60, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageEl,
          start: "top 80%",
          toggleActions: "restart none restart none",
          markers: false,
        }
      }
    );

    // Force refresh after setup
    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-6 sm:py-8 lg:py-[30px] box-border bg-[#FAF9EB]">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[82%] grid grid-cols-1 lg:grid-cols-[9fr_7fr] overflow-hidden rounded-lg min-h-[400px] lg:min-h-[280px]">

          {/* 左側文字敘述 */}
          <div ref={textContainerRef} className="flex items-center h-full p-4 sm:p-6 bg-[#833416] relative order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 h-full pr-4 sm:pr-8 lg:pr-16 w-full flex flex-col justify-center">
              <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                因為我們擁有共同的文化記憶，所以我們成為一家人。
              </p>
              
              <div className="mt-6 lg:mt-8">
                <p className="text-xl sm:text-2xl lg:text-4xl text-white leading-relaxed text-right font-chenyuluoyan">
                  文化記憶與我們
                </p>
              </div>
            </div>
            {/* 右邊緣漸層遮罩 - 調整位置避免覆蓋文字 */}
            <div className="absolute top-0 right-0 w-8 sm:w-12 h-full bg-gradient-to-r from-[#833416] to-transparent pointer-events-none z-10"></div>
          </div>

          {/* 右側圖片區域 */}
          <div ref={imageContainerRef} className="h-full relative order-1 lg:order-2 min-h-[250px] lg:min-h-0">
            {/* 左邊緣漸層遮罩 */}
            <div className="absolute top-0 left-0 w-8 sm:w-12 h-full bg-gradient-to-r from-[#833416] to-transparent pointer-events-none z-20"></div>
            <div className="h-full">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/oldpic.jpg"
                  alt="文化探索"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
