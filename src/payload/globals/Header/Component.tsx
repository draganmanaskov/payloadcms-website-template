import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import SiteHeader from './site-header'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return <SiteHeader header={header} />
}
