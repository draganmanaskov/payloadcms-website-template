import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'

import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

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
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/products/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/products/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
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
              required: true,
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
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          label: 'Price',
          min: 0,
          required: true,
          admin: {
            width: '60%',
          },
        },
        {
          name: 'currencyCode',
          type: 'select',
          defaultValue: 'MKD',
          required: true,
          options: [{ label: 'MKD', value: 'MKD' }],
          admin: {
            width: '35%',
          },
        },
      ],
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
