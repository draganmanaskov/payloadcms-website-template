import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'

import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { slugField } from '@/payload/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import { populateParentDesigns } from './hooks/pupulateParentDesigns'
import { populateParentCategories } from './hooks/populateParentCategories'
import { getValidLocale } from '@/utilities'
import { addDiscount } from './hooks/addDiscount'
import { updateDiscountsProducts } from './hooks/updateDiscountsProducts'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  // hooks: {
  //   beforeRead: [addDiscount],
  // },
  admin: {
    useAsTitle: 'title',
    hidden: showToAdmin,
    livePreview: {
      url: async ({ data, locale }) => {
        let validLocale = getValidLocale(locale.code)
        let slug = typeof data?.slug === 'string' ? data.slug : ''

        const path = generatePreviewPath({
          path: `/${validLocale}/products/${slug}`,
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) => {
      return generatePreviewPath({
        path: `/products/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      })
    },
  },
  versions: {
    drafts: {
      // autosave: {
      //   interval: 100, // We set this interval for optimal live preview
      // },
      autosave: false,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    ...slugField(undefined, { slugOverrides: { required: true } }),
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
              blocks: [CallToAction, Content, MediaBlock, Archive],
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
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              type: 'relationship',
              name: 'inventory',
              label: 'Inventory',
              hasMany: false,
              relationTo: 'inventories',
              // required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      hooks: {
        beforeChange: [populateParentCategories],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      min: 0,
      required: true,
      admin: {
        width: '60%',
        position: 'sidebar',
      },
    },
    {
      name: 'discountedPrice',
      type: 'number',
      label: 'Discounted Price',
      hooks: {
        beforeChange: [
          async ({ siblingData, value, req, context }) => {
            if (siblingData.discount) {
              // const discount = await req.payload.findByID({
              //   context,
              //   collection: 'discounts',
              //   id: siblingData.discount,
              // })

              let value = context.value as number

              switch (context.discountType) {
                case 'percentage':
                  return siblingData.price * (value / 100)
                case 'fixed':
                  return siblingData.price - value
                default:
                  return siblingData.price
              }
            }

            return siblingData.price
          },
        ],
      },
      access: {
        update: () => false,
      },
      min: 0,
      required: true,
      admin: {
        width: '60%',
        position: 'sidebar',
      },
    },
    {
      name: 'currencyCode',
      type: 'select',
      defaultValue: 'MKD',
      required: true,
      options: [{ label: 'MKD', value: 'MKD' }],
      admin: {
        width: '50%',
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
      name: 'designs',
      type: 'relationship',
      relationTo: 'designs',
      hasMany: true,
      hooks: {
        beforeChange: [populateParentDesigns],
      },
      admin: {
        position: 'sidebar',
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
    {
      name: 'discount',
      type: 'relationship',
      relationTo: 'discounts',
      // hasMany: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        afterChange: [
          async ({ value = [], previousValue = [], context, req, originalDoc }) => {
            if (context.hasUpdatedDiscountsAfterChange) return
            context.hasUpdatedProductsAfterChange = true

            const discountIDsAddedToProducts = value ? [value] : []
            const discountIDsRemovingFromProducts = previousValue ? [previousValue] : []

            await updateDiscountsProducts({
              req,
              discountIDsAddedToProducts,
              discountIDsRemovingFromProducts,
              productID: originalDoc.id,
              context,
            })
          },
        ],
      },
    },
  ],
}

export default Products
