'use client'
import { SHIPPING_CHECKOUT_DEFAULT_VALUES } from '@/components/checkout/constants'

import { SHIPPING_OPTIONS, useShippingContext } from '@/context/shipping-context'
import useSessionStorage from '@/hooks/useSessionSotrage'
import { useRouter } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'

import { capitalizeFirstLetter } from '@/utilities'

import {
  ShippingInformaptionChecout,
  ShippingProfile,
} from '@/app/(frontend)/[locale]/checkout/(create-order)/information/page'

import Price from '@/components/Price'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

const Shipping = () => {
  const router = useRouter()
  const { cart, hasInitializedCart, cartTotal } = useCart()
  const { user, status: authStatus } = useAuth()

  const [information, setValue] = useSessionStorage<ShippingInformaptionChecout>(
    'shipping-information-checkout',
    SHIPPING_CHECKOUT_DEFAULT_VALUES,
  )

  const { shipping, setShipping } = useShippingContext()

  const handleShippingChange = async (value: string) => {
    let newState = SHIPPING_OPTIONS.filter((option) => option.value === value)[0]
    if (newState) {
      await setShipping(newState)
    }
  }

  const handleCreateOrder = async () => {
    if (!cart || !cart.items) return

    let orderItem = cart.items?.map((item) => {
      if (typeof item.product === 'number') {
        return {
          product: item.product,
          quantity: item.quantity,
          sku: item.sku,
        }
      }
      return {
        product: item.product.id,
        quantity: item.quantity,
        sku: item.sku,
      }
    })

    let order = {
      subTotal: cartTotal.raw,
      shipping: shipping.price,
      total: cartTotal.raw + shipping.price,
      currencyCode: 'MKD',
      items: orderItem,
      email: information.profile.email,
      phoneNumber: information.profile.phoneNumber,
      firstName: information.profile.firstName,
      lastName: information.profile.lastName,
      address: information.profile.address,
      country: information.profile.country,
      city: information.profile.city,
      state: information.profile.state,
      zipCode: information.profile.zipCode,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      router.push('/checkout/order')
    } catch (error) {
      console.error('Failed to create order', error)
    }
  }

  return (
    <>
      <h2 className="mt-6 text-2xl font-bold">Shipping Options</h2>
      <span> Choose your preferred shipping method for your order.</span>

      <Card className="my-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 p-3">
              <p>Contact</p>
              <p>
                {information.profile.email} {information.profile.phoneNumber}
              </p>
            </div>
            <Link className={buttonVariants({ variant: 'link' })} href="/checkout/information">
              Change
            </Link>
          </div>
          <Separator className="mx-auto w-11/12" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 p-3">
              <p className="text-nowrap"> Ship To</p>
              <p>{fullAddress(information.profile)}</p>
            </div>
            <Link className={buttonVariants({ variant: 'link' })} href="/checkout/information">
              Change
            </Link>
          </div>
        </CardContent>
      </Card>

      <RadioGroup
        className="m-0 gap-0"
        defaultValue={SHIPPING_OPTIONS[0].value}
        onValueChange={(value) => handleShippingChange(value)}
      >
        {SHIPPING_OPTIONS.map((option) => {
          return (
            <Label
              key={option.value}
              className="flex cursor-pointer items-center justify-between rounded-lg border p-4 [&:has([data-state=checked])]:cursor-default [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:border-blue-400 dark:[&:has([data-state=checked])]:bg-blue-800"
              htmlFor={option.value}
            >
              <RadioGroupItem className="peer sr-only" id={option.value} value={option.value} />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{option.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Estimated delivery in {option.delivery} business days
                </p>
              </div>

              <Price
                className="text-lg font-semibold "
                amount={option.price}
                currencyCode={'MKD'}
                discount={null}
              />
            </Label>
          )
        })}
      </RadioGroup>
      <div className="flex items-center justify-end pt-4">
        <Button
          disabled={!information.valid || cart?.items?.length === 0}
          onClick={handleCreateOrder}
          size={'lg'}
        >
          Place Order
        </Button>
      </div>
    </>
  )
}

export default Shipping

export const fullAddress = (profile: ShippingProfile) => {
  return `${profile.address}, ${profile.city}, ${profile.state}, ${profile.zipCode}, ${capitalizeFirstLetter(profile.country)}`
}
