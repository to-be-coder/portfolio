'use client'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/ui/side-navigation'
import Link from 'next/link'

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
  {
    title: 'Grid Layout',
    url: '/ui-templates/grid-layout',
    id: 'grid-layout',
  },
  {
    title: 'Login Flow',
    url: '/ui-templates/login-flow',
    id: 'login-flow',
  },
]
export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col my-8  container max-w-7xl mx-auto  min-h-screen ">
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
      <div className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-8 md:py-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">See any templates you like?</h2>
            <p className="text-[#ffffff] mb-8">Let me know how I can customize it for you!</p>
            <Button variant={'secondary'}>
              <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_URL}`}>Contact Me</Link>
            </Button>
          </section>
        </div>
      </div>
    </>
  )
}
