"use client";

import { Metadata } from 'next';
import Image from "next/image";
import { PageLayout } from '@/components';
import { CultureExplorerData } from "@/data";

export default function WebcollectPage() {
  const handlePartnerClick = () => {
    // 導航到合作夥伴詳細頁面
    //window.open(website, '_blank');
  };

  return (
    <PageLayout title="典藏索引" subtitle="Archive Index">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      
    </div>
    </PageLayout>
  );
}
