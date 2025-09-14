"use client";

import { Metadata } from 'next';
import Image from "next/image";
import { PageLayout } from '@/components';
import Link from "next/link";

const partners = [
  { id: "apple", name: "Apple", logo: "/logos/apple.png" },
  { id: "microsoft", name: "Microsoft", logo: "/logos/microsoft.png" },
  { id: "google", name: "Google", logo: "/logos/google.png" },
];

export default function PartnersPage() {
  return (
    <PageLayout title="合作夥伴" subtitle="Partners">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <div className="min-h-screen bg-gray-50 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">合作夥伴</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner) => (
            <Link key={partner.id} href={`/partner/${partner.id}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-24 h-24 object-contain"
                />
                <p className="mt-2 text-lg font-medium">{partner.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
