'use client'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

import { cn } from '@/utilities'
import Link from 'next/link'
import { Link as LocaleLink } from '@/i18n/routing'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

const OrderPage = () => {
  const t = useTranslations('OrderComplete')
  const { status } = useAuth()
  const { clearCart } = useCart()
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="flex  flex-col items-center justify-start gap-8 p-4 md:p-6">
      <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 md:p-8">
        <div className="relative flex flex-col items-center justify-center gap-4">
          <div className="animate-confetti absolute inset-0 -z-10" />
          <Icons.circleCheckIcon className="h-12 w-12 text-green-500" />
          <h1 className="text-2xl font-bold text-center">{t('title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">{t('subtitle')}</p>
          {status === 'loggedOut' ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">{t('description')}</p>
          ) : null}

          <div className="flex flex-col sm:flex-row w-full gap-2">
            <Link
              href={'/admin/collections/orders'}
              className={cn(buttonVariants({ variant: 'default' }), 'w-full sm:w-auto', {
                'pointer-events-none opacity-60': status === 'loggedOut',
              })}
              aria-disabled={status === 'loggedOut'}
              tabIndex={status === 'loggedOut' ? -1 : undefined}
            >
              {t('viewOrders')}
            </Link>
            <LocaleLink
              href={'/'}
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'mt-4 sm:mt-0 sm:ml-2',
              )}
            >
              {t('continueShopping')}
            </LocaleLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
