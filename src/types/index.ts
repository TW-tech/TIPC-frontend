// 通用類型定義
export interface PageLayoutProps {
  title?: string;      
  subtitle?: string;
  headerpic?: string;
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}
export type ImageLightboxProps = {
  image: photographImage | null;
  isOpen: boolean;
  onClose: () => void;
  initialRect: DOMRect | null;
  allImages?: photographImage[];
  onImageChange?: (image: photographImage) => void;
};
export type LoadMoreConfig =
  | {
      mode: "append";
      batchSize?: number; // how many per click
      buttonText?: string;
    }
  | {
      mode: "link";
      href: string;
      buttonText?: string;
    };

export type lightboxMode =
  | {
      mode: "Image";
    }
  | {
      mode: "Book";
    };

export type MasonryGalleryProps = {
  images: photographImage[];
  breakpointColumnsObj: Record<string, number>;
  loadMoreConfig?: LoadMoreConfig;
  lightboxMode?: lightboxMode;
  gap?: number;
};

export type ArchiveCardProps = {
  id: number;
  webName: string;
  tag: string;
  orgName: string;
  orgWebLink: string;
};

export type ArchiveFilterProps = {
  onFilterChange: (filter: string | null) => void;
  activeFilter: string | null;
};

export type BookCardProps = {
  book: BookData;
  isOpen: boolean;
  onClose: () => void;
  initialRect: DOMRect | null;
};
export interface NavigationProps {
  variant?: 'main' | 'header' | 'simplified';
  className?: string;
}
export interface NineBlockCardProps {
  number: number;
  title: string;
  subtitle: string;
  color: string;
  iconSrc: string;
  categoryId: string;
  onClick: (categoryId: string) => void;
}

export type Archive = {
    id: number;
    Class: string;
    WebName: string;
    OrgName: string;
    OrgWebLink: string;
};

export type MediaType = 'video' | 'image' | 'article';
export type SizeModifier = 'wide' | 'tall' | 'normal';

export interface GalleryItem {
  id: string;
  type: MediaType;
  size?: SizeModifier;
  imageUrl: string;
  altText: string;
  title?: string;
  tag?: string;
  linkHref?: string;
  author?: string;
  photoDate?: string;
  description?: string;
  keywords?: string[];
  duration?: string;
  cakeCategory?: string[];
}

export interface MediaGalleryProps {
  items?: VideoItem[];
}

export interface VideoBlockProps {
  video: VideoRecommendation;
  onClick: (e: React.MouseEvent) => void;
  showTextAlways?: boolean;
  className?: string;
}

export interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  headerpic?: string;
}
export interface Partner {
  id: string;
  name: string;
  description: string;
  image: string;
  website?: string;
  established?: string;
  category?: string;
}

export interface BookData {
  id: string;
  bookName: string;
  author: string[];
  image: string;
  uploadDate: string;
  publisher: string;
  isbn: string;
}

// Old JSON-based photograph structure (kept for backward compatibility)
export interface photographImage {
  id: number;
  src: string;
  title: string;
  description: string;
  author: string;
  uploadDate: string;
  photoDate: string;
  cakeCategory: string[];
  nineBlocks: string[];
  subID: string;
  size: string;
}

// New database-based photograph structure
export interface Photograph {
  id: string;
  url: string;
  title: string;
  description: string;
  author: string;
  photoDate: string;
  createdAt: string;
  updatedAt: string;
  nineBlocks: PhotographNineBlockRelation[];
  cakeCategory: PhotographCakeCategoryRelation[];
}

export interface PhotographNineBlockRelation {
  photographId: string;
  nineBlockId: string;
  nineBlock: {
    id: string;
    name: string;
  };
}

export interface PhotographCakeCategoryRelation {
  photographId: string;
  cakeCategoryId: string;
  cakeCategory: {
    id: string;
    name: string;
  };
}


export type PartnerCardProps = {
  id: string;
  website: string;
  picture: string;
  name: string;
};

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  mainImage: string;
  subTitle: string;
  description: string;
  relatedImages: photographImage[];
  type: "current" | "past"; // column grouping
  alt: string;
}


export interface VideoRecommendation {
  id: string;
  title: string;
  author: string;
  shootingDate: string;
  uploadDate: string;
  description: string;
  thumbnail: string;
  duration: string;
  cakeCategory: string[];
  keywords: string[];
  nineBlocks: string[];
  src: string;
}

// Video with database relations
export interface VideoKeyWordRelation {
  videoId: string;
  keyWordId: string;
  keyWord: {
    id: string;
    name: string;
  };
}

export interface VideoNineBlockRelation {
  videoId: string;
  nineBlockId: string;
  nineBlock: {
    id: string;
    name: string;
  };
}

export interface VideoCakeCategoryRelation {
  videoId: string;
  cakeCategoryId: string;
  cakeCategory: {
    id: string;
    name: string;
  };
}

export interface Video {
  id: string;
  url: string;
  title: string;
  mainImg: string;
  description: string;
  keyWords: VideoKeyWordRelation[];
  nineBlocks: VideoNineBlockRelation[];
  cakeCategory: VideoCakeCategoryRelation[];
  author: string;
  videoDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Article {
  id: string; // Changed from number to string (cuid)
  englishTitle?: string;
  title: string;
  author: string;
  coverImage: string; // Previously imageMain
  slug: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  blocks: ArticleBlock[];
  annotations: ArticleAnnotation[];
  videos: ArticleVideo[];
  podcasts: ArticlePodcast[];
  keyWords: ArticleKeyWordRelation[];
  nineBlocks: ArticleNineBlockRelation[];
  cakeCategory: ArticleCakeCategoryRelation[];
}

export interface ArticleBlock {
  id: string;
  articleId: string;
  position: number;
  type: 'text' | 'image' | 'quote';
  data: TextBlockData | ImageBlockData | QuoteBlockData;
  createdAt: string;
  updatedAt: string;
}

export interface TextBlockData {
  content: string; // Can contain inline markers like [1], [2]
}

export interface ImageBlockData {
  src: string;
  caption?: string;
  alt?: string;
}

export interface QuoteBlockData {
  content: string;
  source?: string;
}

export interface ArticleAnnotation {
  id: string;
  articleId: string;
  marker: string; // "1", "2", "a", etc.
  text: string;
  url?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleVideo {
  id: string;
  articleId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlePodcast {
  id: string;
  articleId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleKeyWordRelation {
  articleId: string;
  keyWordId: string;
  keyWord: {
    id: string;
    name: string;
  };
}

export interface ArticleNineBlockRelation {
  articleId: string;
  nineBlockId: string;
  nineBlock: {
    id: string;
    name: string;
  };
}

export interface ArticleCakeCategoryRelation {
  articleId: string;
  cakeCategoryId: string;
  cakeCategory: {
    id: string;
    name: string;
  };
}

// Legacy type for backward compatibility (to be removed after full migration)
export interface ArticleLegacy {
  id: number;
  title: string;
  author: string;
  description?: string;
  cakeCategory: string[];
  keyWords: string[];
  nineBlocks: string[];
  uploadDate: string;
  relatedArticlesIDs: number[];
  imageMain: string;
  paragraphs: ParagraphBlock[];
  videos: string[];
  podcasts: string[];
  footnotes?: Array<{ id: string; text: string; url?: string }>;
}

export type ParagraphBlock =
  | {
      type: "text";
      content: Array<{ text?: string; notation?: string }>;
    }
  | {
      type: "image";
      url: string;
      caption?: string;
      notation?: string;
    }
  | {
      type: "quote";
      content: string;
    };

  export interface Exhibition {
  id: string;
  title: string;
  date: string;
  mainImage: string;
  subTitle: string;
  description: string;
  Tutorial: string;
  exhibitor: string;
  relatedImages: storyImage[];
  BuildName: string;
  alt: string;
}


export type UnityEmbedProps = {
  buildname: string;
};