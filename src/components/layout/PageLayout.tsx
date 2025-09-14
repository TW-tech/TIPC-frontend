import { ReactNode } from 'react';
import { Navigation, Header, Footer } from '@/components';

interface PageLayoutProps {
  title?: string;      
  subtitle?: string;
  children: ReactNode;
  showNavigation?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function PageLayout({ 
  children, 
  title,
  subtitle,
  showNavigation = true, 
  showHeader = true,
  showFooter = true 
}: PageLayoutProps) {
  return (
    <>
      {showNavigation && <Navigation variant="header" />}
       {showHeader && <Header title={title ?? ""} subtitle={subtitle} />}
      <main>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}
