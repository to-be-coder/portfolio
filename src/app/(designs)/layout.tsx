'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Navigation from '@/components/ui/side-navigation'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

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
]
export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const generateBreadcrumbs = () => {
    const breadcrumbs: JSX.Element[] = []
    let href = ''

    paths.forEach((path, index) => {
      href += `/${path}`
      const formattedPath = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      if (index < paths.length - 1) {
        breadcrumbs.push(
          <BreadcrumbItem key={href}>
            <BreadcrumbLink className="text-gray-500" href={href}>
              {formattedPath}
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        )
      } else {
        breadcrumbs.push(
          <BreadcrumbItem key={href}>
            <BreadcrumbPage className="text-black">{formattedPath}</BreadcrumbPage>
          </BreadcrumbItem>
        )
      }
    })

    return breadcrumbs
  }

  return (
    <div className="flex flex-colmt-8  min-h-screen  mx-auto">
      {/* Left side - Side Menu */}
      <aside className="w-64 hidden lg:block">
        <div className="w-64 bg-white text-black min-h-screen px-4">
          <p className="text-xl px-4 font-semibold mb-2">Components</p>
          <nav>
            <Navigation items={navItems} defaultPage={'/all'} />
          </nav>
        </div>
      </aside>

      {/* Right side - Main Content */}
      <main className="px-8 space-y-8 ">
        <nav aria-label="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
          </Breadcrumb>
        </nav>
        {children}
      </main>
    </div>
  )
}
