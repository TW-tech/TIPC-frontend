"use client";

import { PageLayout, PartnerCard } from '@/components';
import partnerData from '@/data/partner.json';



export default function PartnersPage() {
  return (
    <PageLayout title="友善夥伴" subtitle="Our Partners" headerpic="/images/header/partner.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
          {partnerData.map((partner) => (
            <PartnerCard key={partner.id} {...partner} />
          ))}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
