// import { getDirectusImageUrl, getDirectusProductImageUrl } from "@/utilities";
import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/Price'
import { Product } from '@/payload-types'
import { Media } from '@/components/Media'

type ProductCardProps = {
  product: Product

  type: 'smart' | 'featured'
}

const ProductCard = ({ product }: ProductCardProps) => {
  if (typeof product === 'number') return null

  return (
    <div className="aspect-square animate-fadeIn transition-opacity">
      <Link
        className="group relative inline-block h-full w-full"
        href={`/products/${product.slug}`}
      >
        <div className="relative overflow-hidden rounded-md h-80  group-hover:opacity-75">
          {product.featuredImage && typeof product.featuredImage !== 'number' && (
            <Media resource={product.featuredImage} fill />
          )}
        </div>

        <h3 className="dark: mt-4 text-base font-bold text-gray-700 dark:text-gray-300">
          {product.title}
        </h3>
        <Price
          className="mt-1 text-lg font-medium text-gray-900 dark:text-white"
          currencyCode={product.currencyCode}
          amount={product.price}
        />
      </Link>
    </div>
  )
}

export default ProductCard

{
  /* <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 relative w-full overflow-hidden rounded-lg bg-gray-200">
<Image
  src={imageUrl}
  alt={product.title}
  className="h-full w-full object-cover object-center transition duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
  width={300}
  height={300}
/>
</div> */
}
