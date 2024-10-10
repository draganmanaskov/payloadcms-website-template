import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Config, Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

import { homeStatic } from '@/endpoints/seed/home-static'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => [{ params: { slug, locale: 'en' } }, { params: { slug, locale: 'mk' } }])
}

export default async function Page({ params: { slug = 'home', locale } }) {
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale,
  })

  // Remove this code once your website is seeded
  if (!page) {
    // page = homeStatic
    return <div></div>
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({
  params: { slug = 'home', locale = 'en' },
}): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = draftMode()
  const validLocale = getValidLocale(locale)
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    locale: validLocale,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export function getValidLocale(locale: string): Config['locale'] {
  const allowedLocales: Config['locale'][] = ['en', 'mk']

  // If the passed locale is one of the allowed values, return it; otherwise, return "en"
  return allowedLocales.includes(locale as Config['locale']) ? (locale as Config['locale']) : 'en'
}
