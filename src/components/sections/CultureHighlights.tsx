"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CultureHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const router = useRouter();

  const layers = [
    {
      id: 'layer1',
      label: '產業/品牌',
      link: '/industry-brand',
      textPosition: { top: '45%', left: '53%' },
      clickArea: { top: '45%', left: '53%', width: '24%', height: '12%' }
    },
    {
      id: 'layer2',
      label: '文化資產 + 文化活動',
      link: '/cultural-heritage',
      textPosition: { top: '64%', left: '53%' },
      clickArea: { top: '64%', left: '53%', width: '34%', height: '14%' }
    },
    {
      id: 'layer3',
      label: '共享/文化(影像)記憶',
      link: '/shared-memory',
      textPosition: { top: '88%', left: '53%' },
      clickArea: { top: '88%', left: '53%', width: '44%', height: '16%' }
    }
  ];

  const handleLayerClick = (link: string) => {
    router.push(link);
  };

  const handleLocalRevitalizationClick = () => {
    router.push('/local-revitalization');
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-[#FAF9EB] flex items-center justify-center overflow-visible py-8 sm:py-12"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        
        {/* Cake Diagram Container */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Base Cake Image */}
          <div className="relative w-full max-w-6xl">
            <Image
              src="/cakeDiagram/cake.PNG"
              alt="Cultural Development Diagram"
              width={1400}
              height={950}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Text Labels and Interactive Areas Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              
              {layers.map((layer) => (
                <div key={layer.id}>
                  
                  {/* Text Label - Always Visible and Clickable */}
                  <div
                    className="absolute pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{
                      top: layer.textPosition.top,
                      left: layer.textPosition.left,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    }}
                    onClick={() => handleLayerClick(layer.link)}
                    title={`點擊前往${layer.label}頁面`}
                  >

                      <span 
                        className="text-white font-bold text-center block whitespace-nowrap"
                        style={{ 
                          fontSize: 'clamp(10px, 3vw, 38px)',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {layer.label}
                      </span>

                  </div>

                </div>
              ))}

              {/* Left Arrow Text Labels - No Outline */}
              <div 
                className="absolute pointer-events-none"
                style={{ 
                  top: '35%', 
                  left: '8%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center leading-tight text-white"
                  style={{ 
                    fontSize: 'clamp(8px, 2.5vw, 30px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>科</div>
                  <div>技</div>
                  <div>賦</div>
                  <div>能</div>
                  <div>+</div>
                  <div>數</div>
                  <div>位</div>
                  <div>轉</div>
                  <div>型</div>
                </div>
              </div>

              {/* 地方創生 - CLICKABLE */}
              <div 
                className="absolute pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{ 
                  top: '42%', 
                  left: '16%', 
                  zIndex: 20
                }}
                onClick={handleLocalRevitalizationClick}
                title="點擊前往地方創生頁面"
              >
                <div 
                  className="font-bold text-center text-white"
                  style={{ 
                    fontSize: 'clamp(9px, 2.5vw, 30px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>地</div>
                  <div>方</div>
                  <div>創</div>
                  <div>生</div>
                </div>
              </div>

              {/* Right Arrow Text Label - No Outline */}
              <div 
                className="absolute pointer-events-none"
                style={{ 
                  top: '35%', 
                  right: '15%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center leading-tight text-white"
                  style={{ 
                    fontSize: 'clamp(8px, 2.5vw, 30px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>科</div>
                  <div>技</div>
                  <div>賦</div>
                  <div>能</div>
                </div>
              </div>

              {/* Right Side Text Box - No Outline */}
              <div 
                className="absolute pointer-events-none"
                style={{ 
                  top: '36%', 
                  right: '22.5%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center text-white"
                  style={{ 
                    fontSize: 'clamp(9px, 2.6vw, 32px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>行</div>
                  <div>銷</div>
                  <div>+</div>
                  <div>教</div>
                  <div>育</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}