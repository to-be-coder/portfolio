'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from './button'

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
    <header>
      <div className="container mx-auto px-8 flex items-center justify-between pt-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" legacyBehavior passHref className="text-lg font-semibold text-gray-900">
            Jessica Cheng
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/#projects" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), pathname === '/#projects' && 'text-[#ff9c6a]', 'relative hover:no-underline')}
                    onMouseEnter={() => handleHover('projects')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="relative">
                      Projects
                      <span className={cn('absolute bottom-0 left-0 h-0.5 bg-[#ff9c6a] transition-all duration-300', hoveredItem === 'projects' ? 'w-full' : 'w-0')}></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), pathname === '/about' && 'text-[#ff9c6a]', 'relative hover:no-underline')}
                    onMouseEnter={() => handleHover('about')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="relative">
                      About
                      <span className={cn('absolute bottom-0 left-0 h-0.5 bg-[#ff9c6a] transition-all duration-300', hoveredItem === 'about' ? 'w-full' : 'w-0')}></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), pathname === '/docs' && 'text-[#ff9c6a]', 'relative hover:no-underline')}
                    onMouseEnter={() => handleHover('cv')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="relative">
                      CV
                      <span className={cn('absolute bottom-0 left-0 h-0.5 bg-[#ff9c6a] transition-all duration-300', hoveredItem === 'cv' ? 'w-full' : 'w-0')}></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <Button asChild className="bg-[#ff9c6a] text-white shadow-none border-none hover:bg-[#ff9c6a]/90 font-bold">
                  <Link href="mailto:jessicacheng.code@gmail.com">Contact Me</Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:hidden">
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
                <a className="-m-1.5 p-1.5 text-lg font-semibold">Jessica Cheng</a>
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
                  <Link
                    href="/#projects"
                    className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', pathname === '/#projects' ? 'text-[#ff9c6a]' : 'text-gray-900 hover:bg-gray-50')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/about"
                    className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', pathname === '/about' ? 'text-[#ff9c6a]' : 'text-gray-900 hover:bg-gray-50')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  {/* <Link
                    href="/"
                    className={cn('block rounded-lg px-3 py-2 text-base font-semibold leading-7', pathname === '/docs' ? 'text-[#ff9c6a]' : 'text-gray-900 hover:bg-gray-50')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    CV
                  </Link> */}
                </div>
                <div className="py-6">
                  <Button asChild className="w-full bg-[#ff9c6a] text-white shadow-none border-none hover:bg-[#ff9c6a]/90 font-bold">
                    <Link href="mailto:jessicacheng.code@gmail.com">Contact Me</Link>
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

// const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = 'ListItem'
