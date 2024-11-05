'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/payload-types'
import Price from '../Price'
import { Link } from '@/i18n/routing'
import DiscountBadge from '../DiscountBadge'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, price, featuredImage } = product
  const [isHovered, setIsHovered] = useState(false)

  let width: number | undefined
  let height: number | undefined
  let alt = ''
  let src: StaticImageData | string = ''

  if (!src && product.featuredImage && typeof product.featuredImage === 'object') {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
    } = product.featuredImage

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  const inStock = true

  return (
    <Link className="group relative inline-block h-full w-full" href={`/products/${product.slug}`}>
      <Card className="w-full max-w-xs sm:max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <DiscountBadge discount={product.discount} />
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold  mb-2 truncate">{title}</h2>
          <Price
            className="mt-1 text-lg font-medium "
            currencyCode={product.currencyCode}
            amount={product.price}
            discount={product.discount}
          />
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
