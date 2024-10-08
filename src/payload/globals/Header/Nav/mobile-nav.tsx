'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from '@/i18n/routing'

import { cn } from '@/utilities/cn'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import DarkLogo from '../Logos/DarkLogo'
import LightLogo from '../Logos/LightLogo'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import ModeToggle from '@/components/mode-toggle'

type MobileNavProps = {
  header: Header
}

const MobileNav = ({ header }: MobileNavProps) => {
  const [open, setOpen] = React.useState(false)

  const navItems = header?.navItems || []

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-4">
        <SheetTitle>
          <MobileLink href="/" className="flex items-center pl-2" onOpenChange={setOpen}>
            <DarkLogo />
            <LightLogo />
          </MobileLink>
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="my-4 pb-10 pl-6">
          <div className="flex items-cente justify-end gap-2">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
          <div className="flex flex-col space-y-3">
            {navItems.map((item, i) => {
              return <CMSLink key={i} {...item.link} appearance="link" />
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default MobileNav
