'use client'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/cn'

import type { Header } from '@/payload-types'
import MainNav from './Nav/main-nav'
import MobileNav from './Nav/mobile-nav'
import ModeToggle from '@/components/mode-toggle'

import Cart from '@/components/Cart'
import ProfileHeader from './ProfileHeader'
import LightLogo from './Logos/LightLogo'
import DarkLogo from './Logos/DarkLogo'
import { Link } from '@/i18n/routing'
import LocaleSwitcher from '@/components/LocaleSwitcher'

type SiteHeadertProps = {
  header: Header
}

const SiteHeader = ({ header }: SiteHeadertProps) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past a threshold, hide the header
        setShow(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up, show the header
        setShow(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      className={cn(
        'border/40 sticky top-0 z-50 w-full border-b bg-inherit  py-2 ',
        show ? 'translate-y-0 transform' : '-translate-y-full transform border-2',
      )}
    >
      <div className="flex h-12  items-center justify-between  px-8">
        <Link href="/" className={cn('hidden md:inline-flex')}>
          <DarkLogo />
          <LightLogo />
        </Link>
        <MainNav header={header} />
        <MobileNav header={header} />
        <div className="md:hidden">
          <DarkLogo />
          <LightLogo />
        </div>

        <nav className="flex items-center gap-2">
          <div className="hidden items-center gap-2  md:flex">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
          <Cart type="header" />
          <ProfileHeader />
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
