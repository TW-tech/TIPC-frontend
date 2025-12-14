import articlesData from '@/data/article.json';
import type { Article } from '@/types';
import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ content: string }> }): Promise<Metadata> {
  const { content } = await params;
  const articleId = parseInt(content);
  const article = articlesData.find((item) => item.id === articleId) as Article | undefined;

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  // Get first text paragraph for description
  const firstTextParagraph = article.paragraphs.find((p) => p.type === 'text');
  const description = firstTextParagraph && firstTextParagraph.type === 'text' 
    ? firstTextParagraph.content.map((c) => c.text || '').join('').slice(0, 200)
    : article.title;

  // Auto-detect base URL or use environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const articleUrl = `${baseUrl}/article/${article.id}/${article.id}`;
  const imageUrl = `${baseUrl}${article.imageMain}`;

  return {
    title: `${article.title} | 文化影響力平台`,
    description,
    keywords: article.keyWords.join(', '),
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
      publishedTime: article.uploadDate,
      authors: [article.author],
      tags: article.keyWords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticleContentPage({ params }: { params: Promise<{ content: string }> }) {
  const { content } = await params;
  const articleId = parseInt(content);
  const article = articlesData.find((item) => item.id === articleId) as Article | undefined;

  if (!article) {
    return <p className="text-center mt-10">Article not found.</p>;
  }

  // Get related articles from the same cake category
  const relatedArticles = articlesData
    .filter((item) => 
      item.id !== article.id && // Exclude current article
      item.cakeCategory.some((cat) => article.cakeCategory.includes(cat)) // Same cake category
    )
    .sort((a, b) => {
      // Sort by uploadDate (newest first)
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3) as Article[]; // Get maximum 3 articles

  return <ArticleClient article={article} relatedArticles={relatedArticles} />;
}
