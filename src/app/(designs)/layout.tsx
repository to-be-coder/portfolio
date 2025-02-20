'use client'
import CtaSection from '@/components/ui/cta'
import Navigation from '@/components/ui/side-navigation'

// Menu items.
const navItems = [
  // {
  //   title: 'All',
  //   url: '/ui-templates',
  //   id: 'ui-templates',
  // },
  {
    title: 'Projects Page',
    url: '/ui-templates/projects-page',
    id: 'projects-page',
  },
  {
    title: 'Side Navigation 1',
    url: '/ui-templates/side-navigation-1',
    id: 'side-navigation-1',
  },
]
export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col my-8  container max-w-7xl mx-auto px-8 min-h-screen ">
        <div className="flex mt-8  min-h-screen  ">
          {/* Left side - Side Menu */}
          <aside className="w-64 hidden lg:block">
            <div className="w-64 bg-white text-black min-h-screen px-4">
              <p className="text-xl px-4 font-semibold mb-2">Collections</p>
              <nav>
                <Navigation items={navItems} defaultPage={'/all'} />
              </nav>
            </div>
          </aside>

          {/* Right side - Main Content */}
          <main className="px-8 space-y-8 flex-1 mx-auto ">{children}</main>
        </div>
      </div>
      <CtaSection />
    </>
  )
}
