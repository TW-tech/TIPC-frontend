"use client";

import { PageLayout, PartnerCard } from '@/components';

const partners = [
  { id: 1, name: "Apple", logo: "/logos/apple.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'erewrwerwerwerwe' },
  { id: 2, name: "Microsoft", logo: "/logos/microsoft.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rewrwer' },
  { id: 3, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rewrwerwr' },
  { id: 4, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 5, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 6, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 7, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 8, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 9, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
  { id: 10, name: "Google", logo: "/logos/google.png", link: '', picture: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80', description: 'rwerewrwer' },
];

export default function PartnersPage() {
  return (
    <PageLayout title="合作夥伴" subtitle="Partners" headerpic="/images/header/頭_o.jpg">
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
