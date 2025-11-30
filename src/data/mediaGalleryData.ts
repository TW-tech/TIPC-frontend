import { GalleryItem } from "@/components/sections/MediaGallery";

export const mediaGalleryData: GalleryItem[] = [
  {
    id: '1',
    type: 'video',
    size: 'wide',
    imageUrl: '/images/culture/video.png',
    altText: '文化影片精選'
  },
  {
    id: '2',
    type: 'article',
    imageUrl: '/images/culture/article.png',
    altText: '傳統工藝',
    tag: '文化傳承',
    title: '台灣傳統工藝的復興之路',
    linkHref: '/article/1/traditional-crafts'
  },
  {
    id: '3',
    type: 'image',
    size: 'tall',
    imageUrl: '/images/gallery/1.jpg',
    altText: '文化建築'
  },
  {
    id: '4',
    type: 'article',
    imageUrl: '/images/culture/photo.png',
    altText: '節慶文化',
    tag: '地方創生',
    title: '在地節慶活動的文化意義',
    linkHref: '/article/2/festival-culture'
  },
  {
    id: '5',
    type: 'image',
    imageUrl: '/images/gallery/2.jpg',
    altText: '傳統建築'
  },
  {
    id: '6',
    type: 'video',
    imageUrl: '/images/videorecommendations/原民生態智慧.jpg',
    altText: '原民文化紀錄片'
  },
  {
    id: '7',
    type: 'image',
    size: 'wide',
    imageUrl: '/images/gallery/3.jpg',
    altText: '文化景觀全景'
  },
  {
    id: '8',
    type: 'article',
    imageUrl: '/images/culture/文化品牌2.jpg',
    altText: '文化品牌',
    tag: '產業發展',
    title: '文化品牌的建立與推廣策略',
    linkHref: '/article/3/cultural-branding'
  },
  {
    id: '9',
    type: 'image',
    imageUrl: '/images/gallery/4.jpg',
    altText: '傳統藝術'
  }
];
