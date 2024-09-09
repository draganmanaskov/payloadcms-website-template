import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import Product from './product'

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

export default async function ProductComponent({ params: { slug = '' } }) {
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />
  console.log(product.slider)

  return (
    <article className="pt-16 pb-16">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <Product product={product} />
      {/* <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={post.content}
            enableGutter={false}
          />
        </div>

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

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const product = await queryProductBySlug({ slug })

//   return generateMeta({ doc: product })
// }

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
