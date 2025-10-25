"use client";

import { Metadata } from 'next';
import Image from "next/image";
import { PageLayout } from '@/components';
import { CultureExplorerData } from "@/data";
import { useParams } from "next/navigation";
import { CultureArticleData } from "@/data";

export default function ArticleContentPage() {
  const params = useParams();
  const content = params?.content as string;

  if (!content) return null;
  const Articleitem = CultureArticleData.find((item) => item.id === content);

  if (!Articleitem) {
    return <p className="text-center mt-10">Articledata not found.</p>;
  }
  
  return (
    <PageLayout title={Articleitem.title} subtitle="Article" headerpic="/images/header/article.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title + Meta */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-gray-700 font-bold mb-4">
            文化永續發展與挑戰
          </h1>
          <p className="text-gray-500 text-sm">2025-09-13 · by Richard Huang</p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src="/images/gallery/1.jpg"
            alt="cover"
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <section className="prose prose-xl max-w-none">
          <p className="text-gray-700 text-xl leading-relaxed">
            在現代社會中，文化的永續發展面臨著許多挑戰。我們不僅要維護傳統價值，
            還要能夠適應快速變遷的環境，並與科技與經濟結合。
          </p>

          <p className="py-3 text-gray-700 text-xl leading-relaxed">
            例如，數位媒體的興起讓年輕世代接觸文化的方式有了根本轉變，
            這要求我們在傳統與現代之間取得平衡。
          </p>

          {/* Inline Image */}
          <figure className="my-8">
            <Image
              src="/images/gallery/2.jpg"
              alt="Example Image"
              width={800}
              height={500}
              className="rounded-lg object-contain mx-auto"
            />
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              社區中的文化活動
            </figcaption>
          </figure>

          <p className="text-gray-700 text-xl leading-relaxed">
            此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。
          </p>
          {/* Inline Image */}
          <figure className="my-8">
            <Image
              src="/images/gallery/2.jpg"
              alt="Example Image"
              width={800}
              height={500}
              className="rounded-lg object-contain mx-auto"
            />
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              社區中的文化活動
            </figcaption>
          </figure>

          <p className="text-gray-700 text-xl leading-relaxed">
            此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。
          </p>
          {/* Inline Image */}
          <figure className="my-8">
            <Image
              src="/images/gallery/2.jpg"
              alt="Example Image"
              width={800}
              height={500}
              className="rounded-lg object-contain mx-auto"
            />
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              社區中的文化活動
            </figcaption>
          </figure>

          <p className="text-gray-700 text-xl leading-relaxed">
            此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。
          </p>
          {/* Inline Image */}
          <figure className="my-8">
            <Image
              src="https://drive.google.com/uc?export=view&id=1Xhz1qnxfjQQeP83pT-cWGTjgVp1dhdfQ"
              alt="Example Image"
              width={800}
              height={500}
              className="rounded-lg object-contain mx-auto"
            />
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              Google Drive image test
            </figcaption>
          </figure>

          <p className="text-gray-700 text-xl leading-relaxed">
            此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。此外，地方文化政策的推動能促進文化資產保存，但也需要社區參與，
            否則政策可能流於形式，無法真正影響居民生活。
          </p>
        </section>
      </article>
    </div>
    </PageLayout>
  );
}
