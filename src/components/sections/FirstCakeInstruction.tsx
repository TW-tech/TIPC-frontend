"use client";

import { notoSerifTC } from '@/lib/fonts';

export default function FirstCakeInstruction() {
    return (
        <section className="relative bg-[#FAF9EB] flex flex-col items-center justify-center overflow-visible py-8 sm:py-12">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`text-black text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 text-center ${notoSerifTC.className}`}>
                    邀請您一起在這個平台上找回台灣的文化驕傲與創生活力
                </div>
                
                {/* 可調整的內容容器 */}
                <div className="py-6 mx-auto max-w-4xl">
                    <div className="space-y-2 text-lg sm:text-xl lg:text-2xl leading-relaxed text-left" style={{ color: '#2D2B2B' }}>
                        <p>讓我們從文化(影像)記憶的找尋開始</p>
                        <p>接著進入充滿文化記憶的文化資產或文化活動中</p>
                        <p>品嘗屬於台灣的人文味道與感性</p>
                        <p>透過科技、行銷與教育</p>
                        <p>讓最具代表性的文化意象轉化為產業元素或文化品牌</p>
                        <p>讓世界看見台灣</p>
                        <p>化為一道光的品牌與產業</p>
                        <p>吸引更多喜愛台灣的朋友們來到這塊土地</p>
                        <p>享受品牌滋養、遊歷文化資產、參與文化活動並踏查文化記憶</p>
                        <p>地方創生的活力就此展開</p>
                        <p>我們的願望其實很簡單</p>
                        <p>文化永續</p>
                        <p>台灣永續</p>
                    </div>
                </div>
            </div>
        </section>

    );
}