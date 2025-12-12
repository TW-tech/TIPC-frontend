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
      svgPath: '/cakeDiagram/產業.svg',
      link: '/industry-brand',
      position: { top: '45%', left: '52%' },
      clickArea: { top: '45%', left: '52%', width: '24%', height: '12%' },
      scale: 0.7
    },
    {
      id: 'layer2',
      svgPath: '/cakeDiagram/文化活動.svg',
      link: '/cultural-heritage',
      position: { top: '63%', left: '52%' },
      clickArea: { top: '63%', left: '52%', width: '34%', height: '14%' },
      scale: 1.2
    },
    {
      id: 'layer3',
      svgPath: '/cakeDiagram/共享.svg',
      link: '/shared-memory',
      position: { top: '84%', left: '52%' },
      clickArea: { top: '84%', left: '52%', width: '10%', height: '5%' },
      scale: 1.5
    }
  ];

  const textLabels = [
    {
      // 科技賦能+數位轉型
      id: 'tech-digital-left',
      svgPath: '/cakeDiagram/科技數位.svg',
      position: { top: '55%', left: '13%' },
      clickable: false,
      link: '',
      scale: 0.45
    },
    {
      // 地方創生
      id: 'local-revitalization',
      svgPath: '/cakeDiagram/地方創生.svg',
      position: { top: '54%', left: '20.5%' },
      clickable: true,
      link: '/local-revitalization',
      scale: 0.45
    },
    {
      //科技賦能
      id: 'tech-enable-right',
      svgPath: '/cakeDiagram/科技.svg', 
      position: { top: '48%', right: '9%' },
      clickable: false,
      link: '',
      scale: 0.4
    },
    {
      // 行銷+教育
      id: 'marketing-education',
      svgPath: '/cakeDiagram/行銷.svg',
      position: { top: '52%', right: '16.5%' },
      clickable: false,
      link: '',
      scale: 0.45
    }
  ];

  const handleLayerClick = (link: string) => {
    router.push(link);
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

              {/* Text Labels */}
              {textLabels.map((label) => (
                label.svgPath && (
                  <div
                    key={label.id}
                    className={`absolute ${label.clickable ? 'pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-200' : 'pointer-events-none'}`}
                    style={{
                      top: label.position.top,
                      left: label.position.left,
                      right: label.position.right,
                      transform: `translate(-50%, -50%) scale(${label.scale})`,
                      zIndex: 20
                    }}
                    onClick={label.clickable ? () => handleLayerClick(label.link) : undefined}
                  >
                    <Image
                      src={label.svgPath}
                      alt={label.id}
                      width={200}
                      height={200}
                    />
                  </div>
                )
              ))}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}