'use client'

import { Media } from '../Media'
import { useShippingContext } from '@/context/shipping-context'
import Link from 'next/link'
import { formatSKUString } from '@/utilities'
import Price from '../Price'
import { User } from '@/payload-types'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useTranslations } from 'next-intl'

type CartSummeryProps = {
  cart: User['cart']
  cartTotal: { formatted: string; raw: number }
}

const CartSummery = ({ cart, cartTotal }: CartSummeryProps) => {
  const t = useTranslations('ShoppingCart')
  const { shipping } = useShippingContext()
  const [isCollapsed, setIsCollapsed] = useState(true) // Manage collapse state

  if (!cart) return null

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Collapsible Mobile View */}
      <div className={`w-full pt-4 md:hidden`}>
        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="mb-3 flex items-center justify-between pb-1 pt-1">
            {/* Expand Button */}
            <Button onClick={toggleCollapse}>
              {isCollapsed ? t('expandCartDetails') : t('collapseCartDetails')}
            </Button>
            <Price
              className="text-right text-base text-black dark:text-white"
              amount={cartTotal.raw + (shipping?.price || 0)}
              currencyCode={'MKD'}
              discount={null}
            />
          </div>
        </div>
        <Separator />
      </div>

      {/* Cart Items List */}
      <ul
        className={`w-full flex-grow overflow-auto  flex-col gap-4 pt-6 ${isCollapsed ? 'hidden' : 'flex'} md:flex`}
      >
        {cart.items?.map((item, i) => {
          if (typeof item.product === 'number') return null
          return (
            <div key={`${item.id}-idnex `} className="flex items-center space-x-4">
              <div className="relative h-20 w-20 rounded-md">
                {item.product.featuredImage && typeof item.product.featuredImage !== 'number' && (
                  <Media resource={item.product.featuredImage} fill />
                )}
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="grid flex-1 gap-1">
                <h3 className="font-semibold">
                  <Link href={`/products/${item.product.slug}`}>{item.product.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {typeof item.product.inventory !== 'number' && formatSKUString(item.sku)}
                </p>

                <Price
                  className="text-sm font-medium"
                  amount={item.product.price}
                  currencyCode={item.product.currencyCode}
                  discount={item.product.discount}
                />
              </div>
            </div>
          )
        })}
      </ul>
      {/* Full Cart Details */}
      <div className={`w-full ${isCollapsed ? 'hidden' : 'block'} md:block`}>
        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="mb-3 flex items-center justify-between pb-1 pt-1">
            <p>{t('subtotal')}</p>
            <Price
              className="text-right text-base text-black dark:text-white"
              amount={cartTotal.raw}
              currencyCode={'MKD'}
              discount={null}
            />
          </div>
          <div className="mb-3 flex items-center justify-between pb-1 pt-1">
            <p>{t('shipping')}</p>
            {shipping ? (
              <Price
                className="text-right text-base text-black dark:text-white"
                amount={shipping.price}
                currencyCode={'MKD'}
                discount={null}
              />
            ) : (
              <p className="text-right">{t('calculatedAtCheckout')}</p>
            )}
          </div>
          <div className="mb-3 flex items-center justify-between pb-1 pt-1">
            <p className="text-xl font-bold text-black dark:text-white">{t('total')}</p>
            <Price
              className="text-right text-base text-black dark:text-white"
              amount={cartTotal.raw + (shipping?.price || 0)}
              currencyCode={'MKD'}
              discount={null}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CartSummery
