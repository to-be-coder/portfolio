import CtaSection from '@/components/ui-block/cta'
import { articles, getArticleByPath } from '@/lib/articles'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    postId: string
  }>
}

const DEFAULT_METADATA = {
  title: 'Blog Post',
  description: 'A blog post from Jessica Cheng',
  author: 'Jessica Cheng',
  profileImage: '/profile-small.jpg',
} as const

// Unknown slugs cannot trigger server-side content fetching or on-demand pages.
export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({
    postId: article.path,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postId } = await params
  const article = getArticleByPath(postId)

  if (!article) {
    notFound()
  }

  const title = article.title || DEFAULT_METADATA.title
  const description = article.subtitle || DEFAULT_METADATA.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: article.image ? [article.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { postId } = await params
  const article = getArticleByPath(postId)

  if (!article) {
    notFound()
  }

  return (
    <main>
      <section className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Article Header */}
        <div className="my-12 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{article.title}</h1>

          <div className="border-b border-gray-200 w-full" />

          <div className="flex items-center gap-2 mt-3">
            <Image src={DEFAULT_METADATA.profileImage} alt={DEFAULT_METADATA.author} width={30} height={30} className="rounded-full object-cover aspect-square" />
            <p className="text-sm text-gray-500">{DEFAULT_METADATA.author}</p>
          </div>
        </div>

        {/* Locally authored article content */}
        <div className="min-h-screen">
          {article.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-gray-700">{paragraph}</p>
          ))}
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
