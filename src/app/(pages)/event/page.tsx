// 活動探索
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageLayout, MasonryGallery } from '@/components';
import type { Event } from "@/types";
import eventDataRaw from "@/data/events.json";
import { processEvents, type EventRaw } from "@/lib/eventUtils";

// Automatically update event types based on dates
const eventData = processEvents(eventDataRaw as EventRaw[]);


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
