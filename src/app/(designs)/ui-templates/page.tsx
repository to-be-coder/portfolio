import Navigation from '@/components/ui/side-navigation'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: 'AI',
    url: '/designs/ai',
    id: 'ai',
  },
  {
    title: 'Article',
    url: '/designs/article',
    id: 'article',
  },
  {
    title: 'Article Card',
    url: '/designs/article-card',
    id: 'article-card',
  },
  {
    title: 'Hero Section',
    url: '/designs/hero-section',
    id: 'hero-section',
  },
  {
    title: 'Header',
    url: '/designs/header',
    id: 'header',
  },
]

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params
  const currentPage = resolvedParams.slug?.[0] || 'ai'

  return (
    <div className="flex">
      {/* Sidebar with client component */}
      <div className="w-64 bg-white text-black min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Components</h1>
        <Navigation items={items} defaultPage={'ai'} />
      </div>

      {/* New grid section */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <Link key={i} href={`/designs/${currentPage}/${i + 1}`} className="block">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl">View Code</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
