// 蛋糕圖
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CakeDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const layers = [
    {
      id: 'layer1',
      svgPath: '/cakeDiagram/產業品牌.svg',
      link: '/industry-brand',
      position: { top: '50%', left: '51%' },
      clickArea: { top: '50%', left: '51%', width: '24%', height: '12%' },
      scale: 1
    },
    {
      id: 'layer2',
      svgPath: '/cakeDiagram/資產活動.svg',
      link: '/cultural-heritage',
      position: { top: '61%', left: '52%' },
      clickArea: { top: '61%', left: '52%', width: '34%', height: '14%' },
      scale: 1
    },
    {
      id: 'layer3',
      svgPath: '/cakeDiagram/文化記憶.svg',
      link: '/shared-memory',
      position: { top: '72%', left: '50%' },
      clickArea: { top: '72%', left: '50%', width: '10%', height: '5%' },
      scale: 1
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
      className="relative bg-[#FAF9EB] flex items-center justify-center overflow-visible py-8 sm:py-12"
    >
      <div className="relative w-full mx-auto">
        
        {/* Cake Diagram Container */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Base Cake Image */}
          <div className="relative w-full">
            <Image
              src="/cakeDiagram/cakePic.png"
              alt="蛋糕圖"
              width={1400}
              height={950}
              className="w-full h-auto object-contain scale-90"
              priority
            />

            {/* Text Labels and Interactive Areas Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              
              {layers.map((layer) => (
                <div key={layer.id}>
                  
                  {/* SVG Label - Always Visible and Clickable */}
                  <div
                    className="absolute pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{
                      top: layer.position.top,
                      left: layer.position.left,
                      transform: `translate(-50%, -50%) scale(${layer.scale})`,
                      zIndex: 20
                    }}
                    onClick={() => handleLayerClick(layer.link)}
                  >
                    <Image
                      src={layer.svgPath}
                      alt={`Layer ${layer.id}`}
                      width={500}
                      height={100}
                    />
                  </div>

                </div>
              ))}

              {/* Left Arrow Text Labels - No Outline */}
              <div 
                className="absolute pointer-events-none"
                style={{ 
                  top: '35%', 
                  left: '12.5%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center leading-tight text-white"
                  style={{ 
                    fontSize: 'clamp(8px, 2.8vw, 40px)',
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
                  left: '20%', 
                  zIndex: 20
                }}
                onClick={handleLocalRevitalizationClick}
                title="點擊前往地方創生頁面"
              >
                <div 
                  className="font-bold text-center text-white"
                  style={{ 
                    fontSize: 'clamp(9px, 2.8vw, 40px)',
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
                  right: '18.5%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center leading-tight text-white"
                  style={{ 
                    fontSize: 'clamp(8px, 2.8vw, 40px)',
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
                  top: '37%', 
                  right: '25.5%', 
                  zIndex: 20
                }}
              >
                <div 
                  className="font-bold text-center text-white"
                  style={{ 
                    fontSize: 'clamp(9px, 3vw, 42px)',
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