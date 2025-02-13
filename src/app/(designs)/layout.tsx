import Navigation from '@/components/ui/side-navigation'

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
export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Side Menu */}
      <aside className="w-64 border-r border-gray-200">
        <div className="w-64 bg-white text-black min-h-screen p-4">
          <h1 className="text-xl font-bold mb-4">Components</h1>
          <Navigation items={items} defaultPage={'ai'} />
        </div>
      </aside>

      {/* Right side - Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
