import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'

import { Providers } from '@/providers'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'

import { getMessages } from 'next-intl/server'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html
        className={cn(GeistSans.variable, GeistMono.variable)}
        lang="en"
        suppressHydrationWarning
      >
        <head>
          {/* <InitTheme /> */}
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        </head>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
  openGraph: mergeOpenGraph(),
}
