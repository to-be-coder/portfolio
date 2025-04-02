'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from './button'

const navigationItems = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/#projects', label: 'Projects', id: 'projects' },
  { path: '/ui-templates', label: 'UI Templates', id: 'ui-templates' },
  { path: '/about', label: 'About', id: 'about' },
]

interface NavItemProps {
  path: string
  label: string
  id: string
  pathname: string
  hoveredItem: string | null
  onMouseEnter: (item: string) => void
  onMouseLeave: () => void
  onClick?: () => void
}

const NavItem = ({ path, label, id, pathname, hoveredItem, onMouseEnter, onMouseLeave, onClick }: NavItemProps) => (
  <NavigationMenuItem>
    <Link href={path} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), pathname === path && 'text-secondary', 'relative hover:no-underline')}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="relative">
          {label}
          <span className={cn('absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300', hoveredItem === id ? 'w-full' : 'w-0')}></span>
        </span>
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
)

export default function Header() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleHover = (item: string) => {
    setHoveredItem(item)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-gray-200/20">
      <div className="px-8 flex justify-between py-2" aria-label="Global">
        <div className="flex cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <Image src="/icon.svg" alt="Jessica Cheng" width={50} height={50} />
          </Link>
        </div>
        <div className="hidden sm:flex sm:flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList className="list-none">
              <div className="flex gap-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.id} {...item} pathname={pathname} hoveredItem={hoveredItem} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} />
                ))}
              </div>
              <NavigationMenuItem className="list-none flex items-center h-full">
                <Button asChild className=" ml-4 ">
                  <Link href={`/contact`}>Contact</Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex sm:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" legacyBehavior passHref>
                <p className="text-lg font-semibold font-['Helvetica_Neue'] -m-1.5 p-1.5">Jessica Cheng</p>
              </Link>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', pathname === item.path ? 'text-[#ff9c6a]' : 'text-gray-900 hover:bg-gray-50')}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button asChild className="w-full">
                    <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_URL}`}>Contact</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
