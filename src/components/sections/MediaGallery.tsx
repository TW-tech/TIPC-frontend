// TIPC影音
import Link from 'next/link';
import Image from 'next/image';
import { MediaGalleryProps, GalleryItem } from '@/types';


const MediaGallery = ({ items = [] }: MediaGalleryProps) => {
  return (
    <div className="w-full min-h-screen p-5 md:p-10 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[320px] gap-6 max-w-[1400px] mx-auto">
        {items.map((item) => (
          <Tile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- Sub Component: Tile ---
const Tile = ({ item }: { item: GalleryItem }) => {
  
  let spanClass = 'col-span-1 row-span-1';
  if (item.size === 'wide') spanClass = 'col-span-1 md:col-span-2';
  if (item.size === 'tall') spanClass = 'col-span-1 md:row-span-2';

  let overlayClass = 'bg-black/20 hover:bg-black/40';
  let contentLayout = '';

  if (item.type === 'video') {
    contentLayout = 'justify-center items-center';
  } else if (item.type === 'image') {
    contentLayout = 'justify-end items-end';
  } else if (item.type === 'article') {
    contentLayout = 'flex-col justify-end';
    overlayClass = 'bg-gradient-to-t from-black/90 via-black/30 to-transparent';
  }

  const tileClasses = `
    group relative block overflow-hidden rounded-2xl bg-gray-200 shadow-lg text-white
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-2xl cursor-pointer
    ${spanClass}
  `;

  const content = (
    <>
      <Image 
        src={item.imageUrl} 
        alt={item.altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105 z-0"
      />
      
      <div className={`absolute inset-0 z-10 flex p-6 transition-colors duration-300 ${overlayClass} ${contentLayout}`}>
        
        {/* === Video Type === */}
        {item.type === 'video' && (
          <div className="text-6xl text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 drop-shadow-md">
            ▶
          </div>
        )}

        {/* === Image Type === */}
        {item.type === 'image' && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl text-white opacity-70 backdrop-blur-sm transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100">
            ⤢
          </div>
        )}

        {/* === Article Type === */}
        {item.type === 'article' && (
          <div className="w-full translate-y-0 transition-transform duration-300">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-gray-300">
              {item.tag}
            </span>
            <h3 className="mb-4 font-serif text-2xl font-normal leading-snug text-white">
              {item.title}
            </h3>
            <div className="flex items-center justify-between border-t border-white/30 pt-4 text-sm text-gray-300">
              <span>Read Story</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (item.type === 'article' && item.linkHref) {
    return (
      <Link href={item.linkHref} className={tileClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div 
      className={tileClasses}
      role="button"
      aria-label={item.type === 'video' ? 'Play Video' : 'View Image'}
    >
      {content}
    </div>
  );
};

export default MediaGallery;