'use client'

import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type MainNavProps = {
  header: Header
}

const MainNav = ({ header }: MainNavProps) => {
  const navItems = header?.navItems || []

  return (
    <nav className=" hidden items-center justify-around gap-4 md:flex">
      {navItems.map((item, i) => (
        <CMSLink key={i} {...item.link} appearance="linkHover2" className="text-foreground" />
      ))}
    </nav>
  )
}

export default MainNav
