import type { Article } from '@/types';
import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

// Fetch single article info from API by slug
async function getArticle(slug: string): Promise<Article | null> {
  try {
    // Use relative URL for server-side fetch (works both locally and in production)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${slug}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Get related articles from same cake category
async function getRelatedArticles(article: Article): Promise<Article[]> {
  try {
    // Use relative URL for server-side fetch (works both locally and in production)
    const res = await fetch(`/api/articles?limit=100`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (!data.success) {
      return [];
    }

    const allArticles: Article[] = data.data;
    
    // Filter articles by same cake category, exclude current article
    const cakeCategoryNames = article.cakeCategory.map(cc => cc.cakeCategory.name);
    
    return allArticles
      .filter((item) => 
        item.id !== article.id && // Exclude current article
        item.cakeCategory.some((cc) => cakeCategoryNames.includes(cc.cakeCategory.name)) // Same cake category
      )
      .sort((a, b) => {
        // Sort by publishedAt (newest first)
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 3); // Get maximum 3 articles
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  // Get first text block for description
  const firstTextBlock = article.blocks.find((block) => block.type === 'text');
  const description = firstTextBlock && firstTextBlock.type === 'text'
    ? (firstTextBlock.data as { content: string }).content.slice(0, 200)
    : article.title;

  // Use localhost for local development
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const articleUrl = `${baseUrl}/article/${article.slug}`;
  const imageUrl = article.coverImage.startsWith('http') 
    ? article.coverImage 
    : `${baseUrl}${article.coverImage}`;

  return {
    title: `${article.title} | 文化影響力平台`,
    description,
    keywords: article.keyWords.map(kw => kw.keyWord.name).join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: '文化影響力平台',
      publishedTime: article.publishedAt || undefined,
      authors: [article.author],
      tags: article.keyWords.map(kw => kw.keyWord.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticleContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return <p className="text-center mt-10">Article not found.</p>;
  }

  const relatedArticles = await getRelatedArticles(article);

  return <ArticleClient article={article} relatedArticles={relatedArticles} />;
}
