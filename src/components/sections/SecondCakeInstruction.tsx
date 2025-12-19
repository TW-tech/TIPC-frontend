"use client";

import { notoSerifTC } from '@/lib/fonts';

export default function SecondCakeInstruction() {
    return (
        <section className="relative bg-[#FAF9EB] flex flex-col items-center justify-center overflow-visible py-8 sm:py-12">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`text-black text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 text-left sm:text-center ${notoSerifTC.className}`}>
                    地方創生要超越社區總體營造、文化創意、甚至農村再生的層次，用經濟產業發展的思維，結合地方特色與導入科技，進行跨域整合。
                </div>
            </div>
        </section>
    );
}
