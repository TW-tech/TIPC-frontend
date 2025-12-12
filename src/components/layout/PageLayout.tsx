import { Header, Footer } from '@/components';
import {PageLayoutProps}  from '@/types';

export default function PageLayout({ 
  children, 
  title,
  subtitle,
  headerpic, 
  showHeader = true,
  showFooter = true 
}: PageLayoutProps) {
  return (
    <>
      {showHeader && <Header title={title ?? ""} subtitle={subtitle} headerpic={headerpic ?? "/images/header/典藏索引_頭.png"}/>}
      <main>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}
