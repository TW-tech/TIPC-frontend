"use client";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from '@/components';
import { useParams } from "next/navigation";
import articlesData  from  '@/data/article.json';
import { notoSerifTC, notoSansTC } from '@/lib/fonts';

export default function ArticleContentPage() {
  const params = useParams();
  const content = params?.content as string;

  if (!content) return null;
  
  const articleId = parseInt(content);
  const article = articlesData.find((item) => item.id === articleId);

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
    .slice(0, 3); // Get maximum 3 articles
  
  return (
    <PageLayout title="觀點文章" subtitle="TIPC Articles" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title + Meta */}
        <header className="mb-8">
          <blockquote className="text-4xl sm:text-6xl font-bold text-[#833416] border-l-4 border-[#833416] pl-4 mb-4">
            <h1 className={`article-title ${notoSerifTC.className}`}>{article.title}</h1>
          </blockquote>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <p className="text-gray-700 text-xl sm:text-2xl">作者:{article.author}</p>
            {article.keyWords.map((keyword, index) => (
              <div key={index} className="
                px-3 py-1            /* Horizontal and vertical padding */
                rounded-full         /* Full rounded corners */
                border-2 border-gray-700 /* Outline color */
                text-gray-700         /* Text color */
                text-base sm:text-lg /* Larger text size */
                font-medium          /* Medium font weight */
              ">
                {keyword}
              </div>
            ))}
          </div>
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
