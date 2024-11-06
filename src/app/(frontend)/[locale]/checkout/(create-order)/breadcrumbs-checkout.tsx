import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Link } from '@/i18n/routing'
import { Fragment } from 'react'

import { cn } from '@/utilities'
import { useTranslations } from 'next-intl'

const BREADCRUMBS = [
  {
    title: 'Information',
    slug: 'information',
  },
  {
    title: 'Shipping',
    slug: 'shipping',
  },
  {
    title: 'Order',
    slug: 'order',
  },
]

type BreadcrumbChecoutProps = {
  lastPart: string
  mobile?: boolean
}

const BreadcrumbChecout = ({ lastPart, mobile = false }: BreadcrumbChecoutProps) => {
  const t = useTranslations('BreadcrumbCheckout')
  const BREADCRUMBS = [
    {
      title: t('information'),
      slug: 'information',
    },
    {
      title: t('shipping'),
      slug: 'shipping',
    },
    {
      title: t('order'),
      slug: 'order',
    },
  ]

  return (
    <Breadcrumb className={cn(mobile ? 'md:hidden' : 'hidden md:block')}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-black dark:text-white font-bold">
            <Link href="/">{t('home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {BREADCRUMBS.map((breadCrumb, index) => {
          const isActive = lastPart === breadCrumb.slug
          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className={cn('select-none', isActive && 'font-bold')}>
                  {breadCrumb.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbChecout
