import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import TestComponent from '@/components/custom-admin/test-component'
import { admins } from '@/access/admins'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [], //CallToAction, Content, MediaBlock, Archive
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            // {
            //   name: 'stripeProductID',
            //   label: 'Stripe Product',
            //   type: 'text',
            //   admin: {
            //     components: {
            //       Field: ProductSelect,
            //     },
            //   },
            // },
            {
              name: 'priceJSON',
              label: 'Price JSON',
              type: 'textarea',
              admin: {
                readOnly: true,
                hidden: true,
                rows: 10,
              },
            },
            {
              name: 'enablePaywall',
              label: 'Enable Paywall',
              type: 'checkbox',
            },
            // {
            //   name: 'paywall',
            //   label: 'Paywall',
            //   type: 'blocks',
            //   access: {
            //     read: checkUserPurchases,
            //   },
            //   blocks: [CallToAction, Content, MediaBlock, Archive],
            // },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Products
