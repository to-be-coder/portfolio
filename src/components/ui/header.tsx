'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from './button'

const navigationItems = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/#projects', label: 'Works', id: 'works' },
  { path: '/ui-templates', label: 'Interactive UI', id: 'ui-templates' },
  { path: '/about', label: 'About', id: 'about' },
]

interface NavItemProps {
  path: string
  label: string
  pathname: string
  onClick?: () => void
}

const NavItem = ({ path, label, pathname, onClick }: NavItemProps) => (
  <NavigationMenuItem>
    <Link href={path} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'relative hover:no-underline rounded-md px-3 py-2 transition-colors',
          pathname === path || (path === '/#projects' && pathname === '/' && typeof window !== 'undefined' && window.location.hash === '#projects') ? 'text-secondary' : 'text-black',
          'hover:bg-gray-100'
        )}
        onClick={onClick}
      >
        <p className="relative font-medium">{label}</p>
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
)

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isProjectsSection, setIsProjectsSection] = useState(false)

  useEffect(() => {
    // Function to check if projects section is visible
    const checkProjectsSection = () => {
      if (pathname !== '/') {
        setIsProjectsSection(false)
        return
      }

      const projectsSection = document.getElementById('projects')
      if (!projectsSection) {
        setIsProjectsSection(false)
        return
      }

      const rect = projectsSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2

      setIsProjectsSection(isVisible)
    }

    // Initial check
    checkProjectsSection()

    // Add scroll event listener
    window.addEventListener('scroll', checkProjectsSection)

    // Clean up
    return () => {
      window.removeEventListener('scroll', checkProjectsSection)
    }
  }, [pathname])

  const isNavItemActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' && !isProjectsSection
    }
    if (path === '/#projects') {
      return (pathname === '/' && isProjectsSection) || pathname === '/#projects'
    }
    return pathname === path
  }

  const NavItem = ({ path, label, onClick }: { path: string; label: string; onClick?: () => void }) => (
    <NavigationMenuItem>
      <Link href={path} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            'relative hover:no-underline rounded-md px-3 py-2 transition-colors',
            isNavItemActive(path) ? 'text-secondary' : 'text-black',
            'hover:bg-gray-100'
          )}
          onClick={onClick}
        >
          <p className="relative font-medium">{label}</p>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )

  return (
    <header className={`sticky top-0 z-50 ${mobileMenuOpen ? 'bg-white/50' : 'bg-white/50'} backdrop-blur-md border-b border-gray-200/20`}>
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between py-2 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <div className="flex items-center gap-1">
              <Image src="/icon.svg" alt="Jessica Cheng" width={40} height={40} />
              <p className="text-md font-normal font-['Helvetica_Neue'] -m-1.5 p-1.5">Jessica Cheng</p>
            </div>
          </Link>
        </div>
        <div className="hidden sm:flex sm:flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList className="list-none">
              <div className="flex gap-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.id} path={item.path} label={item.label} onClick={() => {}} />
                ))}
              </div>
              <NavigationMenuItem className="list-none flex items-center h-full">
                <Button variant="default" className=" ml-4" asChild>
                  <Link href={`/contact`}>Contact</Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex sm:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 z-50 w-full h-full min-h-screen bg-white" role="dialog" aria-modal="true">
          <div className="px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" legacyBehavior passHref>
                <div className="flex items-center gap-1">
                  <Image src="/icon.svg" alt="Jessica Cheng" width={40} height={40} />
                  <p className="text-md font-normal font-['Helvetica_Neue'] -m-1.5 p-1.5">Jessica Cheng</p>
                </div>
              </Link>
              <div className="flex-1 flex justify-end">
                <button type="button" className="rounded-md  text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>
            </div>
            <div className="flow-root">
              <div className="divide-y divide-gray-500/10">
                <div className="space-y-4 py-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', isNavItemActive(item.path) ? 'text-secondary' : 'text-black hover:bg-gray-50')}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button variant="secondary" className="w-full">
                    <Link href={`/contact`} onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
