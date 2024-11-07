import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import Product from './product'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getValidLocale } from '@/utilities'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return products.docs?.map(({ slug }) => slug)
}

export default async function ProductComponent({
  params: { slug = '', locale = 'en', queryParams },
}) {
  const decodedSlug = decodeURIComponent(slug)

  const url = '/products/' + decodedSlug

  let product = await queryProductBySlug({ slug: decodedSlug, locale })

  // if (locale !== 'en' && searchParams.locale) {
  //   product = await queryProductById({
  //     id: product.id,
  //     locale: getValidLocale(locale),
  //   })
  // }

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16 min-h-screen mx-auto max-w-6xl ">
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      <Product product={product} />
      <RenderBlocks blocks={product.layout} />
    </article>
  )
}

const queryProductBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = draftMode()

  let validLocale = getValidLocale(locale)
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
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

const queryProductById = cache(async ({ id, locale }: { id: number; locale: string }) => {
  const { isEnabled: draft } = draftMode()

  let validLocale = getValidLocale(locale)
  // validLocale === getValidLocale(searchParams.locale || validLocale) ? validLocale : 'all',
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    locale: validLocale,
    overrideAccess: true,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const product = await queryProductBySlug({ slug })

//   return generateMeta({ doc: product })
// }
