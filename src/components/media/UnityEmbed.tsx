'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { UnityEmbedProps } from '@/types';

export default function UnityEmbed({ buildname }: UnityEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // States
  const [isStarted, setIsStarted] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);       
  const [progress, setProgress] = useState(0);                 
  const [loadingText, setLoadingText] = useState("LOADING ENGINE..."); 
  const [blobUrl, setBlobUrl] = useState<string>('');

  // Paths
  const buildPath = `/exhibitionBuild/${buildname}/Build`;
  const streamingAssetsPath = `/exhibitionBuild/${buildname}/StreamingAssets`;

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
              #unity-canvas { width: 100%; height: 100%; display: block; outline: none; background: #232323; }
          </style>
      </head>
      <body>
          <canvas id="unity-canvas" tabindex="-1"></canvas>
          <script>
            var gameInstance = null;
            var canvas = document.querySelector("#unity-canvas");

            // 🟢 BRIDGE FUNCTIONS
            window.ReactBridge = {
                ReportAssetProgress: function(val) {
                    window.parent.postMessage({ type: "ASSET_PROGRESS", value: val }, "*");
                },
                ReportGameReady: function() {
                    window.parent.postMessage({ type: "GAME_READY" }, "*");
                }
            };

            try {
               var buildUrl = "${origin}${buildPath}";
               var loaderUrl = buildUrl + "/${buildname}.loader.js";
               
               var config = {
                  dataUrl: buildUrl + "/${buildname}.data",
                  frameworkUrl: buildUrl + "/${buildname}.framework.js",
                  codeUrl: buildUrl + "/${buildname}.wasm",
                  streamingAssetsUrl: "${origin}${streamingAssetsPath}",
                  companyName: "DefaultCompany",
                  productName: "Exhibit_DEMO",
                  productVersion: "0.1.0",
               };

               var script = document.createElement("script");
               script.src = loaderUrl;
               
               script.onload = () => {
                   createUnityInstance(canvas, config, (prog) => {
                       window.parent.postMessage({ type: "ENGINE_PROGRESS", value: prog }, "*");
                   })
                   .then((instance) => {
                       gameInstance = instance;
                       window.parent.postMessage({ type: "ENGINE_STARTED" }, "*");
                       window.focus();
                       canvas.focus();
                   });
               };
               document.body.appendChild(script);

               window.addEventListener("message", (event) => {
                   if (event.data === "TOGGLE_FULLSCREEN" && gameInstance) {
                       gameInstance.SetFullscreen(1);
                       setTimeout(() => { window.focus(); canvas.focus(); }, 100);
                   }
               });

            } catch (e) {
                console.error(e);
            }
          </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [buildname, buildPath, streamingAssetsPath]);

  // Handle Messages
  useEffect(() => {
      const handleMsg = (e: MessageEvent) => {
          if (!e.data) return;
          const { type, value } = e.data;

          if (type === "ENGINE_PROGRESS") {
              setProgress(value * 50);
              setLoadingText("LOADING ENGINE...");
          }
          else if (type === "ENGINE_STARTED") {
              setLoadingText("DOWNLOADING ASSETS..."); 
              setProgress(50); 
          }
          else if (type === "ASSET_PROGRESS") {
              setProgress(50 + (value * 50));
          }
          else if (type === "GAME_READY") {
              setProgress(100);
              setTimeout(() => setIsGameReady(true), 500); 
          }
      };
      
      window.addEventListener("message", handleMsg);
      return () => window.removeEventListener("message", handleMsg);
  }, []);

  const handleStart = () => setIsStarted(true);
  const handleFullscreen = () => {
      iframeRef.current?.contentWindow?.postMessage("TOGGLE_FULLSCREEN", "*");
  };

  if (!blobUrl) return null;

  return (
    // 🟢 CHANGE: Removed "aspect-[16/9]" from the outer container
    // Use a Flex Column to stack the Game and the Footer
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col">
      
      {/* 🟢 1. GAME CONTAINER (This keeps the 16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/9] bg-black">
          
          {/* START SCREEN */}
          {!isStarted && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-30">
                    <div className="w-24 h-24 mb-6 relative">
                    <Image src="/icons/logo_w2.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <h2 className="text-white text-xl md:text-2xl mb-8 font-light">點擊下方按鈕，進入虛擬展間!</h2>
                    <button 
                        onClick={handleStart}
                        className="px-8 py-3 bg-[#833416] hover:bg-[#CC6915] text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                    >
                        開始看展 
                    </button>
               </div>
          )}

          {/* LOADING SCREEN */}
          {isStarted && !isGameReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-20">
                <div className="w-16 h-16 mb-4 relative animate-pulse">
                    <Image src="/icons/logo_w2.png" alt="Logo" fill className="object-contain" />
                </div>
                <p className="text-white text-sm tracking-wider mb-2 font-mono uppercase">
                    {loadingText} {Math.round(progress)}%
                </p>
                <div className="w-64 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                        className="bg-green-500 h-full transition-all duration-300 ease-out" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
            </div>
          )}

          {/* IFRAME */}
          {isStarted && (
            <iframe ref={iframeRef} src={blobUrl} className="w-full h-full border-0 block" allow="autoplay; fullscreen; microphone" />
          )}
      </div>

      {/* 🟢 2. EXTERNAL FOOTER (Below the game, separate background) */}
      <div className="w-full h-14 bg-gray-800 flex justify-between items-center px-4 border-t border-gray-700">
          <span className="text-white text-sm font-medium tracking-wider flex items-center gap-2">
               線上展覽
          </span>
          
          <button 
              onClick={handleFullscreen}
              disabled={!isGameReady} // Disable until game is ready
              className={`p-2 rounded-full transition-colors flex items-center gap-2 text-sm
                ${isGameReady 
                    ? "text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer" 
                    : "text-gray-600 cursor-not-allowed"
                }`}
              title="Fullscreen"
          >
              <span className="hidden md:inline">全螢幕</span>
              {/* SVG Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
          </button>
      </div>

    </div>
  );
}