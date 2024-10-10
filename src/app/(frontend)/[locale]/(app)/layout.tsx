import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'

import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()

  return (
    <>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <LivePreviewListener />
      <Header />
      <main> {children}</main>
      <Footer />
    </>
  )
}
