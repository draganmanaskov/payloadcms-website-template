// import {
//   getProductDesigns,
//   getProductDesignsCount,
// } from "@/actions/products-designs";

import { defaultSort, SORTING } from '@/constants'
import { decodeURIHelper, decodeUrlString, ensureNumber } from '@/utilities'

import PaginationComponent from './pagination'
import SimpleSearch from '@/components/search/simple-search'
import SortBy from './sort-by'
import ProductCard from '@/components/product/product-card'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Modal from './modal'

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
    q,
    page = '1',
    fromPrice,
    toPrice,
  } = searchParams as {
    [key: string]: string
  }

  // TO-DO: Implement date created at products_designs it usesthe orginal created of the base product atm
  const { sortKey } = SORTING.find((item) => item.slug === sort) || defaultSort

  const designsArr = decodeURIHelper(design)
  // const colorsArr = decodeURIHelper(color)
  // const sizesArr = decodeURIHelper(size)
  const searchValue = decodeURIComponent(q)

  const pageNumber = ensureNumber(page)

  const payload = await getPayloadHMR({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    page: pageNumber,
    sort: sortKey,
    where: {
      and: [
        {
          'designs.slug': {
            in: designsArr,
          },
        },
        {
          title: {
            contains: q ? searchValue : '',
          },
        },
        {
          price: {
            greater_than_equal: fromPrice || 0,
          },
        },
        {
          price: {
            less_than_equal: toPrice || 1000000,
          },
        },
      ],
    },
  })

  const { docs, totalDocs, totalPages, hasPrevPage, hasNextPage, pagingCounter, limit } = products

  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  const fromItem = pagingCounter
  const toItem = pagingCounter + limit - 1

  return (
    <div className="relative w-full p-4">
      <p className="mb-4">
        {totalDocs == 0
          ? 'There are no products that match '
          : `Showing ${fromItem}-${toItem} of ${totalDocs} ${resultsText} `}
        {q ? (
          <>
            {' for '}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </>
        ) : null}
      </p>
      <div className="mb-2 flex items-center justify-between">
        <SimpleSearch q={searchValue} />
        <SortBy />
      </div>

      {docs.length > 0 ? (
        <div className="min-h-[300px] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-center items-center">
          {docs.map((product) => {
            return <ProductCard product={product} key={product.slug} />
          })}
        </div>
      ) : null}

      <PaginationComponent
        totalDocs={totalDocs}
        page={pageNumber}
        limit={limit}
        totalPages={totalPages}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </div>
  )
}
