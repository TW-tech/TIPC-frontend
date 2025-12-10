"use client";
import Image from "next/image";
import { PageLayout } from '@/components';
import { useParams } from "next/navigation";
import { articlesData } from "@/data";

export default function ArticleContentPage() {
  const params = useParams();
  const content = params?.content as string;

  if (!content) return null;
  
  const articleId = parseInt(content);
  const article = articlesData.find((item) => item.id === articleId);

  if (!article) {
    return <p className="text-center mt-10">Article not found.</p>;
  }
  
  return (
    <PageLayout title={article.title} subtitle="Article" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title + Meta */}
        <header className="mb-8">
          <blockquote className="text-4xl sm:text-6xl font-bold text-[#833416] border-l-4 border-[#833416] pl-4 mb-4">
            <h1 className="article-title">{article.title}</h1>
          </blockquote>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <p className="text-gray-700 text-lg">作者:{article.author}</p>
            {article.keyWords.map((keyword, index) => (
              <div key={index} className="
                px-2 py-0.5          /* Horizontal and vertical padding */
                rounded-full         /* Full rounded corners */
                border-2 border-gray-700 /* Outline color */
                text-gray-700         /* Text color */
                text-sm              /* Small text size */
                font-medium          /* Medium font weight */
              ">
                {keyword}
              </div>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        {article.imageMain && (
          <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow">
            <Image
              src={article.imageMain}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <section className="prose prose-xl max-w-none">
          {article.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          {/* Content Images */}
          {article.contentImages.map((imageSrc, index) => (
            <figure key={index} className="my-8">
              <Image
                src={imageSrc}
                alt={`${article.title} - Image ${index + 1}`}
                width={800}
                height={500}
                className="rounded-lg object-contain mx-auto"
              />
            </figure>
          ))}
        </section>
      </article>
    </div>
    </PageLayout>
  );
}
