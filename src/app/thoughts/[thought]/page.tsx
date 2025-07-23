import NotionContent from '@/components/notion-content'
import CtaSection from '@/components/ui/cta'
import { getAllPaths, getPageByPath } from '@/lib/notion'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    thought: string
  }>
}

interface PageMetadata {
  title?: string
  description?: string
  subtitle?: string
  image?: string
  category?: string
  date?: string
}

const DEFAULT_METADATA = {
  title: 'Blog Post',
  description: 'A blog post from Jessica Cheng',
  author: 'Jessica Cheng',
  profileImage: '/profile-small.jpg',
} as const

// Generate static params for all blog posts
export async function generateStaticParams() {
  const paths = await getAllPaths()
  return paths.map((path: string) => ({
    thought: path,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { thought } = await params
  const pageData = await getPageByPath(thought)

  if (!pageData) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const { pageData: metadata } = pageData
  const title = metadata.title || DEFAULT_METADATA.title
  const description = metadata.description || metadata.subtitle || DEFAULT_METADATA.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: metadata.image ? [metadata.image] : [],
    },
  }
}

export default async function ThoughtPage({ params }: PageProps) {
  const { thought } = await params
  const pageData = await getPageByPath(thought)

  if (!pageData) {
    notFound()
  }

  const { recordMap, pageData: metadata } = pageData

  return (
    <main>
      <section className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Article Header */}
        <div className="mb-12 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{metadata.title}</h1>

          <div className="border-b border-gray-200 w-full" />

          <div className="flex items-center gap-2 mt-3">
            <Image src={DEFAULT_METADATA.profileImage} alt={DEFAULT_METADATA.author} width={30} height={30} className="rounded-full object-cover aspect-square" />
            <p className="text-sm text-gray-500">{DEFAULT_METADATA.author}</p>
          </div>
        </div>

        {/* Notion Content */}
        <div className="min-h-screen">
          <NotionContent recordMap={recordMap} fullPage={false} darkMode={false} />
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
