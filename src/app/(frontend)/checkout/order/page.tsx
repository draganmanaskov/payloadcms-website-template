'use client'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

import { cn } from '@/utilities'

import Link from 'next/link'
import React, { useEffect } from 'react'

const OrderPage = () => {
  const { status } = useAuth()
  const { clearCart } = useCart()
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="flex  flex-col items-center justify-start gap-8 p-4 md:p-6">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 md:p-8">
        <div className="relative flex flex-col items-center justify-center gap-4">
          <div className="animate-confetti absolute inset-0 -z-10" />
          <Icons.circleCheckIcon className="h-12 w-12 text-green-500" />
          <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            We have sent a confirmation email to your registered email address.
          </p>
          {status === 'loggedOut' ? (
            <p className="text-gray-500 dark:text-gray-400">
              To view your order history, please create an account or log in to your existing
              account.
            </p>
          ) : null}

          <div className="flex w-full gap-2">
            <Link
              href={'/admin/collections/orders'}
              className={cn(buttonVariants({ variant: 'default' }), 'w-full ', {
                'pointer-events-none opacity-60 ': status === 'loggedOut',
              })}
              aria-disabled={status === 'loggedOut'}
              tabIndex={status === 'loggedOut' ? -1 : undefined}
            >
              View Orders
            </Link>
            <Link href={'/'} className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
