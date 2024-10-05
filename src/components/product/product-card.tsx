'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/payload-types'
import Price from '../Price'
import Link from 'next/link'

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
      <Card className="w-full max-w-sm  mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 ease-in-out hover:scale-105 "
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-primary mb-2 truncate">{title}</h2>
          <Price
            className="mt-1 text-lg font-medium text-gray-900 dark:text-white"
            currencyCode={product.currencyCode}
            amount={product.price}
          />
        </CardContent>
      </Card>
    </Link>
    // <Card
    //   className="w-full max-w-sm transition-shadow duration-300 ease-in-out hover:shadow-lg"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <CardHeader className="relative p-0">
    //     {/* <div className="relative w-full" style={{ paddingTop: '75%' }}>
    //       <Image
    //         src={src}
    //         alt={alt}
    //         layout="fill"
    //         objectFit="contain"
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //         className="rounded-t-lg"
    //       />
    //     </div> */}
    //     <div className="relative w-full h-48">
    //       <Image
    //         src={src}
    //         alt={alt}
    //         layout="fill"
    //         objectFit="cover"
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //         className="rounded-t-lg"
    //       />
    //       {/* <Image
    //         src={src}
    //         alt={alt}
    //         fill
    //         style={{ objectFit: 'cover' }}
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //         className="rounded-t-lg"
    //       /> */}
    //     </div>
    //     {inStock ? (
    //       <Badge className="absolute top-2 right-2 bg-green-500">In Stock</Badge>
    //     ) : (
    //       <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
    //     )}
    //   </CardHeader>
    //   <CardContent className="p-4">
    //     <div className="mb-2">
    //       {/* <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2> */}
    //       <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
    //     </div>

    //     <Price
    //       className="mt-1 text-lg font-medium text-gray-900 dark:text-white"
    //       currencyCode={product.currencyCode}
    //       amount={product.price}
    //     />
    //     {/* <div className="flex items-center mb-2">
    //       {[...Array(5)].map((_, i) => (
    //         <Star
    //           key={i}
    //           className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    //         />
    //       ))}
    //       <span className="ml-2 text-sm text-muted-foreground">({reviews} reviews)</span>
    //     </div> */}
    //   </CardContent>
    //   {/* <CardFooter className="p-4 pt-0">
    //     <Button className="w-full" disabled={!inStock}>
    //       <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
    //     </Button>
    //   </CardFooter> */}
    // </Card>
  )
}

export default ProductCard
