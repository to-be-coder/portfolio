import NotionContent from '@/components/notion-content'
import CtaSection from '@/components/ui/cta'
import { getAllPaths, getPageByPath } from '@/lib/notion'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    thought: string
  }
}

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

  return {
    title: metadata.title || 'Blog Post',
    description: metadata.description || metadata.subtitle || 'A blog post from Jessica Cheng',
    openGraph: {
      title: metadata.title || 'Blog Post',
      description: metadata.description || metadata.subtitle || 'A blog post from Jessica Cheng',
      images: metadata.image ? [metadata.image] : [],
    },
  }
}

export default async function ThoughtPage({ params }: PageProps) {
  const { thought } = await params

  // Get the page data from Notion
  const pageData = await getPageByPath(thought)

  if (!pageData) {
    notFound()
  }

  const { recordMap, pageData: metadata } = pageData

  return (
    <main>
      {/* Header Section */}
      <section className="container mx-auto px-4 py-8 max-w-3xl">
        {/* <Link href="/thoughts" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Thoughts
        </Link> */}

        {/* Article Header */}
        <div className="mb-12 px-6">
          {/* {metadata.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md">{metadata.category}</span>
            </div>
          )} */}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{metadata.title}</h1>

          <div className="border-b border-gray-200 w-full"></div>
          <div className="flex items-center gap-2 mt-3">
            <Image src={'/profile-small.jpg'} alt={'Jessica Cheng'} width={30} height={30} className="rounded-full object-cover aspect-square" />
            <p className="text-sm text-gray-500">Jessica Cheng</p>
          </div>

          {/* {metadata.subtitle && <p className="text-xl text-gray-600 mb-4">{metadata.subtitle}</p>} */}

          {/* {metadata.date && <p className="text-sm text-gray-500">{metadata.date}</p>} */}
        </div>
        {/* Featured Image */}
        {/* {metadata.image && (
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image src={metadata.image} alt={metadata.title || 'Featured image'} fill className="object-cover" />
          </div>
        )} */}

        {/* Notion Content */}
        <div className="min-h-screen ">
          <NotionContent recordMap={recordMap} fullPage={false} darkMode={false} />
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
