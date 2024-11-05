'use client'

import * as React from 'react'
import { LinkProps } from 'next/link'
import { useRouter, Link } from '@/i18n/routing'

import { cn } from '@/utilities/cn'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import DarkLogo from '../Logos/DarkLogo'
import LightLogo from '../Logos/LightLogo'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import ModeToggle from '@/components/mode-toggle'
import { Icons } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

type MobileNavProps = {
  header: Header
}

const MobileNav = ({ header }: MobileNavProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const navItems = header?.navItems || []
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className=" md:hidden"
        >
          <Icons.Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0 w-80">
        <SheetTitle>
          <Link href="/" className="flex items-center absolute left-4 top-4 ">
            <DarkLogo />
            <LightLogo />
          </Link>
        </SheetTitle>

        <div className="flex flex-col h-full pt-16 pb-8">
          <ul className="flex-grow">
            {navItems.map((item) => {
              return (
                <li key={item.link.label}>
                  <Link
                    href={item.link.url ?? '/'}
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                        className: 'w-full justify-start px-4 py-2 text-lg',
                      }),
                    )}
                  >
                    {/* {item.icon} */}
                    <span className="ml-2">{item.link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="px-4 py-2 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Dark Mode</span>
              <ModeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Language</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

{
  /* {navItems.map((item, i) => {
              return <CMSLink key={i} {...item.link} appearance="link" />
            })} */
}

// interface MobileLinkProps extends LinkProps {
//   onOpenChange?: (open: boolean) => void
//   children: React.ReactNode
//   className?: string
// }

// function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
//   const router = useRouter()
//   return (
//     <Link
//       href={href}
//       onClick={() => {
//         router.push(href.toString())
//         onOpenChange?.(false)
//       }}
//       className={cn(className)}
//       {...props}
//     >
//       {children}
//     </Link>
//   )
// }

export default MobileNav
