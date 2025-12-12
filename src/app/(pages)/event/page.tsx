// 活動探索
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageLayout, MasonryGallery } from '@/components';
import type { Event } from "@/types";
import eventData from "@/data/events.json";


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
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src={event.mainImage}
            alt={event.title}
            width={1200}
            height={1200}
            className="object-cover"
          />

          {/* Overlay */}

          <div className={`absolute inset-0 bg-gradient-to-t from-${event.type=== "current" ? '[#CC6915]' : '[#833416]'} via-${event.type=== "current" ? '[#CC6915]/100' : '[#833416]/100'} to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end`}>
            <div className="p-4 md:p-6 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{event.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-200 line-clamp-3 md:line-clamp-none">{event.subTitle}</p>
              <div className="mt-3 md:mt-4 flex items-center justify-between">
                <span className="text-xs md:text-sm bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
                  {event.type}
                </span>
                <span className="absolute right-0 text-xs md:text-sm font-medium mr-3">{event.date}</span>
              </div>
              {/* ▼ button */}
              <button
                className="absolute bottom-3 right-1/2 bg-white/80 text-black rounded-full p-1 hover:bg-white transition"
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
          </div>
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
  const currentEvents = eventData.filter((e) => e.type === "current");
  const pastEvents = eventData.filter((e) => e.type === "past");
  

  return (
    <PageLayout title="活動探索" subtitle="Events" headerpic="/images/header/event.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Current Events */}
      <div className="">
        <h2 className="bg-[#CC6915] rounded-xl text-center text-2xl font-bold my-3">當前活動</h2>
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Past Events */}
      <div className="">
        <h2 className="bg-[#833416] rounded-xl text-center text-2xl font-bold my-3">過往活動</h2>
        {pastEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
    </div>
    </PageLayout>
  );
}
