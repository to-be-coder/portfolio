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
              <NavigationMenuItem>
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
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button asChild className="bg-[#ff9c6a] text-white shadow-none border-none hover:bg-[#ff9c6a]/90 font-bold">
                  <Link href="mailto:jessicacheng.code@gmail.com">Contact Me</Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="lg:hidden" role="dialog" aria-modal="true"></div>
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
