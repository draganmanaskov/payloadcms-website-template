// import Shipping from "@/components/checkout/shipping";
'use server'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

import dynamic from 'next/dynamic'
// import Shipping from '@/components/checkout/shipping'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import configPromise from '@payload-config'
import { Order } from '@/payload-types'

const Shipping = dynamic(() => import('@/components/checkout/shipping'), {
  ssr: false,
})

const ShippingPage = async () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-black dark:text-white">
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-black dark:text-white">
              <Link href="/checkout/information">Information</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shipping</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-slate-600">Order</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Shipping />
    </>
  )
}

export default ShippingPage
