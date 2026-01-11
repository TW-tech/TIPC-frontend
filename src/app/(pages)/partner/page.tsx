"use client";

import { useState, useEffect } from 'react';
import { PageLayout, PartnerCard } from '@/components';

export default function PartnersPage() {
  const [partnerData, setPartnerData] = useState<any[]>([]);

  // Fetch partners from API
  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch('/api/partners');
        const result = await response.json();
        if (result.success) {
          // Transform API data to match PartnerCard props
          const transformedPartners = result.data.map((partner: any) => ({
            id: partner.id.toString(),
            name: partner.name,
            picture: partner.logo,
            website: partner.webUrl,
          }));
          setPartnerData(transformedPartners);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      }
    }
    fetchPartners();
  }, []);
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
