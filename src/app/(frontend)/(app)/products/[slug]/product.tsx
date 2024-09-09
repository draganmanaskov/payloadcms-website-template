'use client'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
// import AddToCart from "@/components/cart/add-to-cart";
import { Icons } from '@/components/icons'
// import Price from "@/components/price";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardSlider, Product } from '@/payload-types'
import { cn } from '@/utilities'
import { StaticImageData } from 'next/image'
// import { Separator } from "@/components/ui/separator";
// import useFilterHook from "@/hooks/useFilterHook";
// import { cn, getDirectusImageUrl } from "@/lib/utils";

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProductProps = {
  product: Product
}

export default function ProductComponent({ product }: ProductProps) {
  //   const { urlParams, handleClickSingle } = useFilterHook('desktop', 0)

  //   let images = product.images
  //     ? product.images.map((image) => {
  //         return {
  //           ...image?.directus_files_id,
  //         };
  //       })
  //     : [];

  let images = product.slider || []
  // let images = [
  //   {
  //     tags: 'dasd',
  //   },
  // ]

  const [imageIndex, setImageIndex] = useState(0)

  //   useEffect(() => {
  //     if (!urlParams['color']) return

  //     let hasTagColor = images.find((image) => {
  //       const tags = image.tags
  //       return tags && tags.includes(urlParams['color'])
  //     })
  //     if (!hasTagColor) return
  //     const index = images.findIndex((image) => image.id === hasTagColor.id)
  //     setImageIndex(index)
  //   }, [urlParams])

  const handleImageIndex = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      setImageIndex((prev) => {
        return prev - 1 < 0 ? images.length - 1 : prev - 1
      })
      return
    }
    if (action === 'next') {
      setImageIndex((prev) => {
        return prev + 1 > images.length - 1 ? 0 : prev + 1
      })
      return
    }
  }

  const handleClick = (index: number) => {
    setImageIndex(index)
  }

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="grid gap-3 md:grid-cols-5 md:gap-3">
        <div className="hidden  gap-3 overflow-auto md:order-first  md:flex max-h-[450px] md:flex-col lg:max-h-[640px] ">
          {images.map((slide, index) => {
            let width: number | undefined
            let height: number | undefined
            let alt = 'Image'
            let src: StaticImageData | string = ''

            if (!src && slide.image && typeof slide.image === 'object') {
              const {
                alt: altFromResource,
                filename: fullFilename,
                height: fullHeight,
                url,
                width: fullWidth,
              } = slide.image

              width = fullWidth!
              height = fullHeight!
              alt = altFromResource

              src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
            }
            return (
              <button
                key={slide.id}
                onClick={() => handleClick(index)}
                className={cn(
                  'max-h-[120px]  overflow-hidden rounded-lg border transition-colors hover:border-primary',
                  {
                    'border-primary': index === imageIndex,
                  },
                )}
              >
                <MediaBlock media={slide.image} blockType="mediaBlock" position={'fullscreen'} />
                <span className="sr-only">View Image {index + 1}</span>
              </button>
            )
          })}
        </div>
        <div className="relative order-first  md:col-span-4">
          <MediaBlock media={images[imageIndex].image} blockType="mediaBlock" />

          {images.length > 1 ? (
            <div className="absolute bottom-[15%] flex w-full justify-center">
              <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                <Button
                  aria-label="Previous product image"
                  variant={'ghost'}
                  className={cn('rounded-l-full')}
                  onClick={() => handleImageIndex('prev')}
                >
                  <Icons.ArrowLeft className="h-5" />
                </Button>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <Button
                  aria-label="Next product image"
                  variant={'ghost'}
                  className={cn('rounded-r-full')}
                  onClick={() => handleImageIndex('next')}
                >
                  <Icons.ArrowRight className="h-5" />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid items-start gap-4 md:gap-10">
        <div className="grid gap-4">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.title}</h1>
          <div className="flex items-center gap-4">
            {/* <Price
              className="text-4xl font-bold"
              currencyCode={product.currency_code}
              amount={product.price}
            /> */}
          </div>
          <div>
            <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
          </div>
        </div>
        <div className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <p className="text-base">Color</p>
            {/* <div className="flex flex-wrap gap-4">
              {product.colors.map((color, index) => {
                const optionNameLowerCase = "color";
                // Base option params on current params so we can preserve any other param state in the url.
                const isActive =
                  urlParams[optionNameLowerCase] === color.colors_id.name
                    ? true
                    : false;

                const isAvailableForSale = product.skus.find(
                  (sku) =>
                    sku.color === color.colors_id.name &&
                    (urlParams.size ? sku.size === urlParams.size : true) &&
                    // sku.stock > 0,
                    sku.status === "active",
                )
                  ? true
                  : false;

                return (
                  <VariantButton
                    optionName={optionNameLowerCase}
                    name={color.colors_id.name}
                    value={color.colors_id.value}
                    isActive={isActive}
                    handleEventClick={handleClickSingle}
                    isAvailableForSale={isAvailableForSale}
                    key={color.colors_id.name}
                  />
                );
              })}
            </div> */}
          </div>
          <div className="grid gap-2">
            <Label className="text-base">Size</Label>
            {/* <div className="flex flex-wrap gap-3  ">
              {product.sizes.map((size, index) => {
                const optionNameLowerCase = "size";
                // Base option params on current params so we can preserve any other param state in the url.
                const isActive =
                  urlParams[optionNameLowerCase] === size.sizes_id.name
                    ? true
                    : false;
                const isAvailableForSale = product.skus.find(
                  (sku) =>
                    (urlParams.color ? sku.color === urlParams.color : true) &&
                    sku.size === size.sizes_id.name &&
                    sku.status === "active",
                )
                  ? true
                  : false;

                return (
                  <VariantButton
                    optionName={optionNameLowerCase}
                    name={size.sizes_id.name}
                    value={size.sizes_id.value}
                    isActive={isActive}
                    handleEventClick={handleClickSingle}
                    isAvailableForSale={isAvailableForSale}
                    key={size.sizes_id.name}
                  />
                );
              })}
            </div> */}
          </div>

          {/* <AddToCart
            skus={product.skus}
            design={product.designs_id}
            productDesignId={product.product_design}
          /> */}
        </div>
        {/* <Separator /> */}

        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="text-lg font-bold">Product Details</h2>
          {/* <div
            className="prose dark:prose-invert lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div> */}
        </div>
      </div>
    </div>
  )
}

type VariantButtonProps = {
  optionName: 'color' | 'size'
  name: string
  value: string
  isActive: boolean
  handleEventClick: (key: string, name: string, isActive: boolean) => void
  isAvailableForSale: boolean
}

const VariantButton = ({
  optionName,
  name,
  value,
  isActive,
  handleEventClick,
  isAvailableForSale,
}: VariantButtonProps) => {
  const colorsClass = 'h-12 w-12 rounded-full transition-colors shadow-lg ring-offset-2'
  const otherClass =
    'rounded-md px-4 py-2 text-sm font-medium transition-colors dark:text-neutral-200 border-2 '

  return (
    <button
      aria-disabled={!isAvailableForSale}
      disabled={!isAvailableForSale}
      onClick={() => handleEventClick(optionName.toLowerCase(), name, isActive)}
      title={`${optionName} ${name}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
      className={cn('', optionName === 'color' ? colorsClass : otherClass, {
        'ring-2 ring-primary': isActive,
        ' text-gray-700 transition duration-300 ease-in-out hover:ring-2 hover:ring-primary':
          !isActive && isAvailableForSale,
        'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400  before:dark:bg-neutral-700':
          !isAvailableForSale,
      })}
      style={{
        backgroundColor: optionName == 'color' ? value : '',
        filter: !isAvailableForSale && optionName === 'color' ? 'grayscale(70%)' : 'none',
      }}
    >
      {optionName !== 'color' ? name.toUpperCase() : null}
    </button>
  )
}
