import { ReactNode } from 'react';
import { Navigation, Header, Footer } from '@/components';

interface PageLayoutProps {
  title?: string;      
  subtitle?: string;
  headerpic?: string;
  children: ReactNode;
  showNavigation?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function PageLayout({ 
  children, 
  title,
  subtitle,
  headerpic,
  showNavigation = true, 
  showHeader = true,
  showFooter = true 
}: PageLayoutProps) {
  return (
    <>
      {/*showNavigation && <Navigation variant="header" />*/}
      {showHeader && <Header title={title ?? ""} subtitle={subtitle} headerpic={headerpic ?? "/images/header/典藏索引_頭.png"}/>}
      <main>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}
