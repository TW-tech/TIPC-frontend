// 活動探索
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageLayout, MasonryGallery } from '@/components';
import type { Event } from "@/types";

function EventCard({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false);

  
  return (
    <div className="relative group mb-6 cursor-pointer">
      {/* Click wrapper (except the button) */}
      <Link
        href={`/event/${event.id}`}
        className="block relative "
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) {
            e.preventDefault(); // stop link if ▼ clicked
          }
        }}
      >
        {/* Main Image */}
        <div className="relative w-full aspect-[1000/583] mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src={event.mainImage}
            alt={event.title}
            fill
            className="object-cover"
          />

          {/* ▼ button */}
          <button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/80 text-black rounded-full p-1 hover:bg-white transition z-10"
            onClick={(e) => {
              e.preventDefault();
              setExpanded((prev) => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transform transition ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </Link>

      {/* Expanded Section */}
      {expanded && (
        <MasonryGallery
          images={event.relatedImages.slice(0, 5)}
          breakpointColumnsObj={{
            default: 2,
          }}
          loadMoreConfig={{
            mode: "link",
            href: `/event/${event.id}`,
            buttonText: "查看活動",
          }}
          lightboxMode={{
              mode:"Image"
            }}
        />

      )}
    </div>
  );
}

export default function EventPage() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const result = await response.json();
        if (result.success) {
          // Transform API data to match Event type
          const transformedEvents = result.data.map((event: any) => ({
            id: event.id,
            title: event.title,
            date: new Date(event.eventDate).toLocaleDateString('zh-TW'),
            mainImage: event.mainImage,
            alt: event.alt,
            description: event.blocks
              .filter((block: any) => block.type === 'text')
              .map((block: any) => block.data.content)
              .join('\n\n'),
            relatedImages: event.images.map((img: any) => ({
              id: img.id,
              src: img.src,
              title: event.title,
              description: '',
              author: '',
              uploadDate: img.createdAt,
              photoDate: img.createdAt,
              cakeCategory: [],
              nineBlocks: [],
              subID: img.id,
              size: '',
            })),
            type: new Date(event.eventDate) > new Date() ? 'current' : 'past',
          }));
          setEventData(transformedEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Sort events by date - nearest first
  const sortByDate = (events: Event[]) => {
    return [...events].sort((a, b) => {
      // Extract start date (handle range dates like "2025-03-15 ~ 2025-04-01")
      const dateA = new Date(a.date.split('~')[0].trim());
      const dateB = new Date(b.date.split('~')[0].trim());
      
      // For current events: ascending (nearest first)
      // For past events: descending (most recent first)
      return a.type === "current" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  };

  const currentEvents = sortByDate(eventData.filter((e) => e.type === "current"));
  const pastEvents = sortByDate(eventData.filter((e) => e.type === "past"));

  if (loading) {
    return (
      <PageLayout title="活動探索" subtitle="Events" headerpic="/images/header/event.jpeg">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">載入中...</p>
        </div>
      </PageLayout>
    );
  }
  

  return (
    <PageLayout title="活動探索" subtitle="Events" headerpic="/images/header/event.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Current Events */}
      <div className="">
        <h2 className="bg-[#CC6915] rounded-xl text-center text-2xl font-bold my-3">活動預告</h2>
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Past Events */}
      <div className="">
        <h2 className="bg-[#833416] rounded-xl text-center text-2xl font-bold my-3">活動花絮</h2>
        {pastEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
    </div>
    </PageLayout>
  );
}
