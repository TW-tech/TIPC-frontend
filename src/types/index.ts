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
  image: storyImage | null;
  isOpen: boolean;
  onClose: () => void;
  initialRect: DOMRect | null;
  allImages?: storyImage[];
  onImageChange?: (image: storyImage) => void;
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
  images: storyImage[];
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
}

export interface MediaGalleryProps {
  items?: GalleryItem[];
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
  referencePerson: string[];
}

export interface storyImage {
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


export type PartnerCardProps = {
  id: number;
  link: string;
  picture: string;
  description: string;
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
  relatedImages: storyImage[];
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

export interface Article {
  id: number;
  title: string;
  author: string;
  description: string;
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

