import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import Product from './product'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getValidLocale } from '../../[slug]/page'

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

export default async function ProductComponent({ params: { slug = '', locale = 'en' } }) {
  const decodedSlug = decodeURIComponent(slug)
  const url = '/products/' + decodedSlug

  const product = await queryProductBySlug({ slug: decodedSlug, locale })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16 min-h-screen mx-auto max-w-6xl ">
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      <Product product={product} />
      <RenderBlocks blocks={product.layout} />
      {/* <PostHero post={post} />
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )}
      </div> */}
    </article>
  )
}

const queryProductBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  console.log(slug)
  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    locale: getValidLocale(locale),
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
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
