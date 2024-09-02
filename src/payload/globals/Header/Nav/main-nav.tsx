'use client'

import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'

import Image from 'next/image'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type MainNavProps = {
  header: Header
}

const MainNav = ({ header }: MainNavProps) => {
  const pathname = usePathname()

  const navItems = header?.navItems || []

  return (
    <nav className=" hidden items-center justify-around gap-4 md:flex">
      {navItems.map((item, i) => (
        <CMSLink key={i} {...item.link} appearance="link" />
      ))}
    </nav>
  )
}

export default MainNav
