'use client'
import CartSummery from '@/components/checkout/cart-summery'

import { useCart } from '@/providers/Cart'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'

interface CheckoutLayoutProps {
  children: React.ReactNode
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const { cart, hasInitializedCart, cartTotal } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!hasInitializedCart) return
    if (!cart || !cart.items || cart.items.length === 0) router.push('/')
  }, [cart, hasInitializedCart, router])

  return (
    <>
      <div className="mx-auto grid w-full grid-cols-12 lg:w-3/4">
        {/* left side */}
        <div className="col-span-12 border-neutral-200 p-6 dark:border-neutral-700 md:col-span-7 md:border-r">
          {children}
        </div>
        {/* right side */}
        <div className="sticky top-0 z-50 col-span-5 hidden h-[100dvh] p-6 md:block">
          {hasInitializedCart && <CartSummery cart={cart} cartTotal={cartTotal} />}
        </div>
      </div>
    </>
  )
}
