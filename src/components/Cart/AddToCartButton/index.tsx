'use client'

import React, { useEffect, useState } from 'react'

import { Button, buttonVariants } from '../../ui/button'
import { VariantProps } from 'class-variance-authority'
import { cn, isVariantReadyForSale } from '@/utilities'
import { Product } from '@/payload-types'
import { useCart } from '@/providers/Cart'
import Cart from '..'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  urlParams: { [key: string]: string }
  className?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
}> = (props) => {
  const {
    product,
    quantity = 1,

    className,
    variant = 'default',
    size = 'default',
    urlParams,
  } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>()

  let inventory = product.inventory

  const inventoryVariant = isVariantReadyForSale(inventory, urlParams)

  useEffect(() => {
    setIsInCart(inventoryVariant ? isProductInCart(product, inventoryVariant) : false)
  }, [isProductInCart, product, cart, inventoryVariant])

  return (
    <>
      {isInCart ? (
        <Cart type="product" />
      ) : (
        <Button
          variant={'default'}
          disabled={inventoryVariant ? false : true}
          //   label={isInCart ? `✓ View in cart` : `Add to cart`}
          //   el={isInCart ? 'link' : undefined}
          //   appearance={appearance}
          //   className={[
          //     className,
          //     classes.addToCartButton,
          //     appearance === 'default' && isInCart && classes.green,
          //     !hasInitializedCart && classes.hidden,
          //   ]
          //     .filter(Boolean)
          //     .join(' ')}
          className={cn('w-full', !variant && 'cursor-not-allowed opacity-60 hover:opacity-60')}
          onClick={
            !isInCart && typeof inventory !== 'number' && inventoryVariant
              ? () => {
                  addItemToCart({
                    product,
                    quantity,
                    sku: inventoryVariant.sku,
                  })
                }
              : undefined
          }
        >
          {isInCart ? `✓ View in cart` : `Add to cart`}
        </Button>
      )}
    </>
  )
}
