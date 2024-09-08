import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import TestComponent from '@/components/custom-admin/test-component'
import { admins } from '@/access/admins'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'

import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { slugField } from '@/fields/slug'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
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
              blocks: [CallToAction, Content, MediaBlock, Archive], //CallToAction, Content, MediaBlock, Archive
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              type: 'upload',
              name: 'featuredImage',
              relationTo: 'media',
              label: 'Featured Image',
            },
            {
              name: 'slider', // required
              type: 'array', // required
              label: 'Image Slider',
              minRows: 2,
              maxRows: 10,
              interfaceName: 'CardSlider', // optional
              labels: {
                singular: 'Slide',
                plural: 'Slides',
              },
              fields: [
                // required
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              type: 'relationship',
              name: 'inventory',
              label: 'Inventory',
              hasMany: false,
              relationTo: 'inventories',
            },

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
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

export default Products
