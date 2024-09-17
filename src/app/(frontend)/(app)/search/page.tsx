// import {
//   getProductDesigns,
//   getProductDesignsCount,
// } from "@/actions/products-designs";

import { defaultSort, SORTING } from '@/constants'
import { decodeURIHelper, decodeUrlString, ensureNumber } from '@/utilities'

import PaginationComponent from './pagination'
import SimpleSearch from '@/components/search/simple-search'
import SortBy from './sort-by'
import ProductCard from '@/components/product/product-cart'
import { Product } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

const LIMIT = 8

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const {
    category,
    sort,
    design,
    color,
    size,
    q: searchValue,
    page = '1',
    fromPrice,
    toPrice,
  } = searchParams as {
    [key: string]: string
  }

  // TO-DO: Implement date created at products_designs it usesthe orginal created of the base product atm
  const { sortKey } = SORTING.find((item) => item.slug === sort) || defaultSort

  const designsArr = decodeURIHelper(design)
  const colorsArr = decodeURIHelper(color)
  const sizesArr = decodeURIHelper(size)

  const pageNumber = ensureNumber(page)

  const payload = await getPayloadHMR({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
  })
  let count = 1

  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  const fromItem = LIMIT * (pageNumber - 1) + 1
  const toItem = LIMIT * (pageNumber - 1) + products.docs.length

  return (
    <>
      <p className="mb-4">
        {count == 0
          ? 'There are no products that match '
          : `Showing ${fromItem}-${toItem} of ${count} ${resultsText} `}
        {searchValue ? (
          <>
            {' for '}
            <span className="font-bold">&quot;{decodeURIComponent(searchValue)}&quot;</span>
          </>
        ) : null}
      </p>
      <div className="mb-2 flex items-center justify-between">
        <SimpleSearch q={searchValue} />
        <SortBy />
      </div>
      <div className="min-h-[300px]">
        {products.docs.length > 0 ? (
          <ul className="grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.docs.map((product) => {
              return (
                <li key={product.slug}>
                  <ProductCard product={product} color={color} type="smart" />
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
      {count && <PaginationComponent count={count} page={pageNumber} limit={LIMIT} />}
    </>
  )
}
