import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/payload/globals/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'

import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { [key: string]: string }
}) {
  const { isEnabled } = draftMode()
  const { locale } = params
  return (
    <>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <LivePreviewListener />
      <Header locale={locale} />
      <main> {children}</main>
      <Footer />
    </>
  )
}
