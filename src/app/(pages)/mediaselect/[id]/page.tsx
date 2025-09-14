"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from '@/components';
import { cultureItemsData } from "@/data";

const mediaTypes = [
  { id: "article", label: "觀點文章" , logo: "/logos/apple.png" },
  { id: "story", label: "光影故事" , logo: "/logos/apple.png" },
  { id: "gallery", label: "TIPC影音" , logo: "/logos/apple.png" },
];

export default function MediaSelectPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;
  const cultureitem = cultureItemsData.find((item) => item.id === id);

  if (!cultureitem) {
    return <p className="text-center mt-10">culturedata not found.</p>;
  }

  return (
    <PageLayout title={cultureitem.title} subtitle="Media Selection">
      <div className="min-h-screen bg-gray-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {mediaTypes.map((mediatype) => (
            <Link key={mediatype.id} href={`/${mediatype.id}/${cultureitem.id}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <img
                  src={mediatype.logo}
                  alt={mediatype.label}
                  className="w-24 h-24 object-contain"
                />
                <p className="mt-2 text-lg font-medium">{mediatype.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
