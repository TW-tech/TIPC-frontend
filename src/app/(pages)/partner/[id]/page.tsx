"use client";

import { useParams } from "next/navigation";
import { PageLayout } from '@/components';

const partnerData: Record<string, { name: string; description: string; logo: string }> = {
  apple: {
    name: "Apple",
    description: "Apple is a technology company known for the iPhone, Mac, and iPad.",
    logo: "/logos/apple.png",
  },
  microsoft: {
    name: "Microsoft",
    description: "Microsoft builds Windows, Office, and Azure cloud services.",
    logo: "/logos/microsoft.png",
  },
  google: {
    name: "Google",
    description: "Google is known for its search engine, Android, and AI technologies.",
    logo: "/logos/google.png",
  },
};

export default function PartnerDetailPage() {
  const { id } = useParams();

  if (!id || typeof id !== "string") return null;

  const partner = partnerData[id];
  if (!partner) {
    return <p className="text-center mt-10">Partner not found.</p>;
  }

  return (
    <PageLayout title={partner.name} subtitle="合作夥伴詳情">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-10 text-center">
            <img
            src={partner.logo}
            alt={partner.name}
            className="w-40 h-40 object-contain mx-auto mb-6"
            />
            <p className="text-lg">{partner.description}</p>
        </div>
      </div>
    </PageLayout>
  );
}
