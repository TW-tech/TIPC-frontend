"use client";

import { PageLayout, PartnerCard } from '@/components';

const partners = [
  { id: 1, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'erewrwerwerwerwe' },
  { id: 2, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rewrwer' },
  { id: 3, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rewrwerwr' },
  { id: 4, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 5, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 6, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 7, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 8, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 9, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
  { id: 10, name: "財團法人玉溪有容教育基金會", link: 'https://www.garden91.org/zh-TW', picture: '/icons/Partner_logo.png', description: 'rwerewrwer' },
];

export default function PartnersPage() {
  return (
    <PageLayout title="合作夥伴" subtitle="Partners" headerpic="/images/header/partner.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} {...partner} />
          ))}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
