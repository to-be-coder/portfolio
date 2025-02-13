import Navigation from '@/components/ui/side-navigation'

// Menu items.
const items = [
  {
    title: 'Projects Page',
    url: '/ui-templates/projects-page',
    id: 'projects-page',
  },
]
export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Side Menu */}
      <aside className="w-64 hidden lg:block">
        <div className="w-64 bg-white text-black min-h-screen p-4">
          <h1 className="text-xl font-bold mb-4">Components</h1>
          <Navigation items={items} defaultPage={'projects-page'} />
        </div>
      </aside>

      {/* Right side - Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
