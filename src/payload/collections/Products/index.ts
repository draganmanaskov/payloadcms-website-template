import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'

import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import { populateParentDesigns } from './hooks/pupulateParentDesigns'
import { populateParentCategories } from './hooks/populateParentCategories'
import { getValidLocale } from '@/utilities'

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
      localized: true,
      label: 'Title',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
      admin: { position: 'sidebar' },
    },
    ...slugField('name', { slugOverrides: { required: true } }),
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
      name: 'designs',
      type: 'relationship',
      relationTo: 'designs',
      hasMany: true,
      hooks: {
        beforeChange: [
          populateParentDesigns,
          // async ({ originalDoc, operation, value, req }) => {
          //   let newDesigns = getAddedValues(originalDoc.designs, value)
          //   console.log(newDesigns, value)
          //   if (newDesigns.length > 0 && value.length > 0) {
          //     let designs = await req.payload.find({
          //       collection: 'designs',
          //       where: {
          //         id: {
          //           in: newDesigns,
          //         },
          //       },
          //       depth: 1,
          //     })

          //     let newDesignsIds: number[] = []
          //     designs.docs.forEach((design) => {
          //       design.breadcrumbs?.forEach((breadcrumb) => {
          //         if (typeof breadcrumb.doc === 'number') {
          //           newDesignsIds.push(breadcrumb.doc)
          //         }
          //       })
          //     })

          //     return mergeUnique(value, newDesignsIds)
          //   }

          //   return value
          // },
        ],
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
  ],
}

export default Products
