import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Product } from '@/payload-types'

import ProductCard from '../product/product-cart'

export type Props = {
  products: Product[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { products } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {products?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <ProductCard product={result} type="featured" />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
