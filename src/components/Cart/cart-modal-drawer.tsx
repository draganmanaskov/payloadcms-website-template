import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MinusIcon, PlusIcon, ShoppingCartIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import {
  //   calculateCartTotal,
  cn,
  formatSKUString,
  //   formatSKUString,
  //   getDirectusImageUrl,
} from '@/utilities'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import Price from '../Price'
import { User } from '@/payload-types'
import { Media } from '../Media'
import { DeleteItemFromCartButton } from './DeleteItemFromCartButton'
import { CartItem } from '@/providers/Cart/reducer'
import UpdateQuantity from './UpdateQuantity'

type CartDrawerProps = {
  side?: 'top' | 'right' | 'bottom' | 'left'
  cart: User['cart']
  deleteItemFromCart: (item: CartItem) => void
  addItemToCart: (item: CartItem) => void
  updateItemQuantity: (item: CartItem) => void
}

const CartModalDrawer = ({
  side = 'right',
  cart,
  deleteItemFromCart,
  addItemToCart,
  updateItemQuantity,
}: CartDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const isVertical = side === 'left' || side === 'right'

  const [drawerDirection, setDrawerDirection] = useState<'right' | 'bottom'>('right')

  useEffect(() => {
    const handleResize = () => {
      setDrawerDirection(window.innerWidth < 640 ? 'bottom' : 'right')
    }

    handleResize() // Set initial direction
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer direction={drawerDirection} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCartIcon className=" h-4 w-4" />

          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bottom-0 left-auto right-0 mt-0 h-5/6 w-full rounded-none sm:top-0 sm:h-screen  sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Your Shopping Cart</DrawerTitle>
        </DrawerHeader>
        <div className="flex h-full flex-col p-4">
          <ScrollArea className={'h-full'}>
            <Card>
              <CardContent className="grid gap-6 p-4">
                {!cart ? (
                  <p className="text-center text-muted-foreground">Your cart is empty</p>
                ) : (
                  cart.items?.map((item, index) => {
                    if (typeof item.product === 'number') return null
                    return (
                      <div key={`${item.id}-idnex `} className="flex items-center space-x-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          {item.product.featuredImage &&
                            typeof item.product.featuredImage !== 'number' && (
                              <Media resource={item.product.featuredImage} fill />
                            )}
                          <DeleteItemFromCartButton
                            item={item}
                            deleteItemFromCart={deleteItemFromCart}
                          />
                        </div>
                        <div className="grid flex-1 gap-1">
                          <h3 className="font-semibold">
                            <Link href={`/product/${item.product.slug}`}>{item.product.title}</Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {typeof item.product.inventory !== 'number' &&
                              formatSKUString(item.sku)}
                          </p>

                          <Price
                            className="text-sm font-medium"
                            amount={item.product.price}
                            currencyCode={item.product.currencyCode}
                          />
                        </div>

                        <UpdateQuantity
                          addItemToCart={addItemToCart}
                          updateItemQuantity={updateItemQuantity}
                          item={item}
                        />
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </ScrollArea>
          <Card className={`mt-4 ${isVertical ? '' : 'mx-auto w-full max-w-lg'}`}>
            <CardFooter className="flex flex-col items-start gap-4 p-4">
              <div className="text-md flex w-full justify-between font-semibold">
                <span> Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex w-full justify-between text-lg font-semibold">
                <span>Total:</span>

                {/* <Price amount={calculateCartTotal(cart)} currencyCode={cart.currency_code} /> */}
              </div>
              <Link
                href={'/checkout/information'}
                className={cn(buttonVariants({ variant: 'default' }), 'w-full ', {
                  'pointer-events-none opacity-60 ': itemCount <= 0,
                })}
                aria-disabled={itemCount <= 0}
                tabIndex={itemCount <= 0 ? -1 : undefined}
              >
                Proceed to Checkout
              </Link>
            </CardFooter>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CartModalDrawer

{
  /* <Button className="w-full" onClick={() => setIsOpen(false)}>
                Proceed to Checkout
              </Button> */
}
