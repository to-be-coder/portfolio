'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from './button'

export default function Header() {
  const pathname = usePathname()

  return (
    <header>
      <div className="mx-auto flex max-w-7sm items-center justify-between p-6 lg:px-8" aria-label="Global">
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
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === '/#projects' && 'text-[#ff7043]', 'relative hover:no-underline')}>
                    <span className="relative">
                      Projects
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ff7043] transition-all duration-300 hover:w-full group-hover:w-full peer-hover:w-full"></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === '/about' && 'text-[#ff7043]', 'relative hover:no-underline')}>
                    <span className="relative">
                      About
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ff7043] transition-all duration-300 hover:w-full group-hover:w-full peer-hover:w-full"></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === '/docs' && 'text-[#ff7043]', 'relative hover:no-underline')}>
                    <span className="relative">
                      CV
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ff7043] transition-all duration-300 hover:w-full group-hover:w-full peer-hover:w-full"></span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button asChild className="bg-[#ff7043] text-white shadow-none border-none hover:bg-[#ff8a65] font-bold">
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
