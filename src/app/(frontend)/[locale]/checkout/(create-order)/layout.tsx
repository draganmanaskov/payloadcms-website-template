'use client'
import CartSummery from '@/components/checkout/cart-summery'

import { useCart } from '@/providers/Cart'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import BreadcrumbChecout from './breadcrumbs-checkout'

interface CheckoutLayoutProps {
  children: React.ReactNode
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const lastPart = parts[parts.length - 1]

  const { cart, hasInitializedCart, cartTotal } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!hasInitializedCart) return
    if (!cart || !cart.items || cart.items.length === 0) router.push('/')
  }, [cart, hasInitializedCart, router])

  return (
    <div className="mx-auto grid w-full grid-cols-12  lg:w-3/4">
      {/* right side on top for small screens */}
      <div className="w-full col-span-12 md:col-span-5 p-6 order-1 md:order-2">
        <BreadcrumbChecout mobile lastPart={lastPart} />
        {hasInitializedCart && <CartSummery cart={cart} cartTotal={cartTotal} />}
      </div>

      {/* left side */}
      <div className="col-span-12 border-neutral-200  dark:border-neutral-700 md:col-span-7 p-6 md:border-r order-2 md:order-1">
        <BreadcrumbChecout lastPart={lastPart} />
        {children}
      </div>
    </div>
  )
}
