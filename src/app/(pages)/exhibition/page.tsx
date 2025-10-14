"use client";

import { Metadata } from 'next';
import Image from "next/image";
import { PageLayout } from '@/components';
import { CultureExplorerData } from "@/data";
import { useParams } from "next/navigation";
import { CultureArticleData } from "@/data";

export default function ArticleContentPage() {
  
  
  return (
    <PageLayout title={"線上展覽"} subtitle="Exhibition" headerpic="/images/header/exhibition.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        
    </div>
    </PageLayout>
  );
}
