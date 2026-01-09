//client component that handles all the interactive parts (share menu, toast notifications)
"use client";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from '@/components';
import { notoSerifTC, notoSansTC } from '@/lib/fonts';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Article } from '@/types/types';

interface ArticleClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleClient({ article, relatedArticles }: ArticleClientProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    toast.success('已複製文章連結');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <PageLayout title="觀點文章" subtitle="TIPC Articles" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">
        {/* 主要內容區域 */}
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Title + Meta */}
          <header className="mb-8">
            <blockquote className="text-4xl sm:text-6xl font-bold text-[#833416] border-l-4 border-[#833416] pl-4 mb-4">
              <h1 className={`article-title leading-relaxed ${notoSerifTC.className}`}>
                {article.title.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < article.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </blockquote>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <p className="text-gray-700 text-base sm:text-xl md:text-2xl">作者:{article.author}</p>
                {article.keyWords.map((keyword, index) => (
                  <div key={index} className="
                    px-2 py-0.5 sm:px-3 sm:py-1
                    rounded-full
                    border-2 border-gray-700
                    text-gray-700
                    text-sm sm:text-base md:text-lg
                    font-medium
                  ">
                    {keyword}
                  </div>
                ))}
              </div>
              <div className="relative flex-shrink-0">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="hover:opacity-70 px-5 transition-opacity"
                  aria-label="分享文章"
                >
                  <Image 
                    src="/icons/share.png" 
                    alt="分享" 
                    width={32} 
                    height={32}
                    className="w-8 h-8"
                  />
                </button>
                
                {/* Share Menu Dropdown */}
                {showShareMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowShareMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 rounded-t-lg transition-colors"
                      >
                        <Image 
                          src="/icons/copyLink.png" 
                          alt="複製連結" 
                          width={20} 
                          height={20}
                          className="w-5 h-5"
                        />
                        <span className="text-gray-700">複製連結</span>
                      </button>
                      <button
                        onClick={handleShareFacebook}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 rounded-b-lg transition-colors border-t border-gray-100"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-gray-700">分享到 Facebook</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
          </header>

          {/* Article Content */}
          <section className={`prose prose-xl max-w-none ${notoSansTC.className} font-light`}>
            {article.paragraphs.map((block, index) => {
              switch (block.type) {
                case "text":
                  return (
                    <p key={index} className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 font-light">
                      {block.content.map((chunk, i) => {
                        if (chunk.text) return <span key={i}>{chunk.text}</span>;
                        if (chunk.notation) return <sup key={i} className="text-[#833416] font-bold">{chunk.notation}</sup>;
                        return null;
                      })}
                    </p>
                  );

                case "image":
                  return (
                    <figure key={index} className="my-8">
                      <Image
                        src={block.url}
                        alt={block.caption || article.title}
                        width={800}
                        height={500}
                        className="rounded-lg object-contain mx-auto"
                      />
                      {(block.caption || block.notation) && (
                        <figcaption className="text-base text-gray-500 mt-2 text-left whitespace-pre-line">
                          {block.caption}
                          {block.notation && (
                            <sup className="text-[#833416] font-bold ml-1">{block.notation}</sup>
                          )}
                        </figcaption>
                      )}
                    </figure>
                  );

                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="border-l-4 border-[#833416] pl-4 italic text-gray-700 text-lg sm:text-xl my-6 whitespace-pre-line"
                    >
                      {block.content}
                    </blockquote>
                  );

                default:
                  return null;
              }
            })}
          </section>

          {/* Footnotes Section */}
          {article.footnotes && article.footnotes.length > 0 && (
            <section className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">註解</h2>
              <ol className="space-y-3">
                {article.footnotes.map((footnote) => (
                  <li key={footnote.id} className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    <sup className="text-[#833416] font-bold mr-2">{footnote.id}</sup>
                    {footnote.url ? (
                      <a 
                        href={footnote.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 underline decoration-gray-400 hover:decoration-gray-600"
                      >
                        {footnote.text}
                      </a>
                    ) : (
                      footnote.text
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Videos Section */}
          {article.videos && article.videos.length > 0 && (
            <section className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">影片</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.videos.map((videoUrl, index) => (
                  <div key={index} className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Podcasts Section */}
          {article.podcasts && article.podcasts.length > 0 && (
            <section className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">相關Podcast</h2>
              <div className="space-y-4">
                {article.podcasts.map((podcastUrl, index) => (
                  <div key={index} className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={podcastUrl}
                      title={`Podcast ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">相關文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id}
                    href={`/article/${relatedArticle.id}/${relatedArticle.id}`}
                    className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Article Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={relatedArticle.imageMain}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Article Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#833416] transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {relatedArticle.cakeCategory.map((cat, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {relatedArticle.author} · {relatedArticle.uploadDate}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </PageLayout>
  );
}
