'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CallToActionButton, HamburgerButton } from '../ui/button'

const navigationItems = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/#projects', label: 'Works', id: 'works' },
  // { path: '/ui-templates', label: 'Interactive UI', id: 'ui-templates' },
  { path: '/about', label: 'About', id: 'about' },
  { path: '/blog', label: 'Thoughts', id: 'thoughts' },
  { path: 'https://github.com/to-be-coder/portfolio', label: 'GitHub', id: 'github' },
]

const projectRoutes = ['/vercel', '/mozilla', '/lilypad', '/vision-track', '/hobby']

const SCROLL_THRESHOLD = 30 // Minimum scroll distance before header hides/shows
const TOP_THRESHOLD = 20 // Distance from top where header always shows

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isProjectsSection, setIsProjectsSection] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  const isProjectPage = projectRoutes.some((route) => pathname.startsWith(route))

  const checkProjectsSection = useCallback(() => {
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
  }, [pathname])

  const handleProjectPageScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const lastScrollY = lastScrollYRef.current

    // Always show header at the top of the page
    if (currentScrollY <= TOP_THRESHOLD) {
      setIsHeaderVisible(true)
      lastScrollYRef.current = currentScrollY
      return
    }

    // Only update if scrolled past threshold distance
    const scrollDelta = Math.abs(currentScrollY - lastScrollY)
    if (scrollDelta < SCROLL_THRESHOLD) {
      lastScrollYRef.current = currentScrollY
      return
    }

    // Only hide when scrolling down, don't show when scrolling up
    if (currentScrollY > lastScrollY) {
      setIsHeaderVisible(false)
    }

    lastScrollYRef.current = currentScrollY
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (!isProjectPage) {
          checkProjectsSection()
          return
        }

        handleProjectPageScroll()
      })
    }

    // Initialize
    lastScrollYRef.current = window.scrollY
    checkProjectsSection()

    // Reset header visibility when navigating to/from project pages
    if (isProjectPage) {
      setIsHeaderVisible(window.scrollY <= TOP_THRESHOLD)
    } else {
      setIsHeaderVisible(true)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [pathname, isProjectPage, checkProjectsSection, handleProjectPageScroll])

  const isNavItemActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' && !isProjectsSection
    }
    if (path === '/#projects') {
      return (pathname === '/' && isProjectsSection) || pathname === '/#projects'
    }
    return pathname === path
  }

  const NavItem = ({ path, label, onClick }: { path: string; label: string; onClick?: () => void }) => {
    const isExternal = path.startsWith('http://') || path.startsWith('https://')

    if (isExternal) {
      return (
        <NavigationMenuItem>
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), 'relative hover:no-underline rounded-md px-3 py-2 transition-colors', 'text-black hover:bg-gray-100 flex items-center gap-1.5')}
            onClick={onClick}
          >
            <p className="relative font-medium">{label}</p>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </NavigationMenuItem>
      )
    }

    return (
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
  }

  return (
    <header className={cn('sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-gray-200/20 transition-transform duration-300', isProjectPage && !isHeaderVisible && '-translate-y-full')}>
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between py-2 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <div className="flex items-center gap-1">
              <p className="text-lg font-semibold font-['Helvetica_Neue'] -m-1.5 p-1.5">Jessica Cheng</p>
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
              <NavigationMenuItem className="list-none flex h-full shrink-0">
                <div className="w-[120px] flex justify-end">
                  <CallToActionButton asChild>
                    <Link href={`/contact`}>Contact</Link>
                  </CallToActionButton>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex sm:hidden">
          <HamburgerButton active={mobileMenuOpen} onToggle={(active) => setMobileMenuOpen(active)} className="h-12 w-12 [&_span]:bg-gray-700 hover:bg-gray-100" />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 z-50 w-full h-full min-h-screen bg-white" role="dialog" aria-modal="true">
          <div className="px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" legacyBehavior passHref>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold font-['Helvetica_Neue'] -m-1.5 p-1.5">Jessica Cheng</p>
                </div>
              </Link>
              <div className="flex-1 flex justify-end">
                <HamburgerButton active={mobileMenuOpen} onToggle={(active) => setMobileMenuOpen(active)} className="h-12 w-12 [&_span]:bg-gray-700 hover:bg-gray-100" />
              </div>
            </div>
            <div className="flow-root">
              <div className="divide-y divide-gray-500/10">
                <div className="space-y-4 py-6">
                  {navigationItems.map((item, index) => {
                    const isExternal = item.path.startsWith('http://') || item.path.startsWith('https://')
                    return (
                      <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="w-full">
                        {isExternal ? (
                          <Link
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'flex items-center gap-1 rounded-lg px-3 py-2 text-base font-semibold leading-7',
                              isNavItemActive(item.path) ? 'text-secondary' : 'text-black hover:bg-gray-50'
                            )}
                          >
                            {item.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <Link
                            href={item.path}
                            className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', isNavItemActive(item.path) ? 'text-secondary' : 'text-black hover:bg-gray-50')}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="py-6">
                  <CallToActionButton className="w-full" asChild>
                    <Link href={`/contact`} onClick={() => setMobileMenuOpen(false)}>
                      Contact Me
                    </Link>
                  </CallToActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
