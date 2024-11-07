import type { ArchiveBlock as ArchiveBlockProps, Product } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import CarouselBlock from './components/carousel'
import { cn } from '@/utilities'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    type,
  } = props

  const limit = limitFromProps || 3

  let products: Product[] = []

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedProducts = await payload.find({
      collection: 'products',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    products = fetchedProducts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProducts = selectedDocs.map((product) => {
        if (typeof product.value === 'object') return product.value
      }) as Product[]

      products = filteredSelectedProducts
    }
  }

  return (
    <div
      className={cn('w-full py-4 md:py-6 lg:py-8 ', true ? 'container ' : '')}
      id={`block-${id}`}
    >
      {introContent && (
        <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
      )}

      {<CarouselBlock products={products} type={type} />}
    </div>
  )
}
