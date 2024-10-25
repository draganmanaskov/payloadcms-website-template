import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'

import { beforeChangeCreateSKUs } from './hooks/beforeChangeCreateSKUs'

const Inventories: CollectionConfig = {
  slug: 'inventories',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [beforeChangeCreateSKUs],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          unique: true,
          admin: {
            width: '70%',
          },
        },
        {
          name: 'baseSku',
          type: 'text',
          label: 'Base SKU',
          required: true,
          unique: true,
          admin: {
            width: '28%',
          },
        },
      ],
    },
    // {
    //   name: 'options',
    //   type: 'select',
    //   label: 'Options',
    //   options: [
    //     { label: 'Color', value: 'color' },
    //     { label: 'Size', value: 'size' },
    //     { label: 'Capacity', value: 'capacity' },
    //   ],
    //   hasMany: true,
    //   admin: {
    //     description: 'Select what options the product will have',
    //     position: 'sidebar',
    //   },
    //   required: true,
    // },
    // {
    //   name: 'color',
    //   type: 'select',
    //   label: 'Color',
    //   hasMany: true,
    //   options: [
    //     { label: 'White', value: 'white' },
    //     { label: 'Black', value: 'black' },
    //     { label: 'Red', value: 'red' },
    //   ],
    //   admin: {
    //     position: 'sidebar',
    //     condition: (data, siblingData) => siblingData?.options?.includes('color'),
    //   },
    // },
    // {
    //   name: 'size',
    //   type: 'select',
    //   label: 'Size',
    //   hasMany: true,
    //   options: payloadSizes,
    //   admin: {
    //     position: 'sidebar',
    //     condition: (data, siblingData) => siblingData?.options?.includes('size'),
    //   },
    // },
    // {
    //   name: 'capacity',
    //   type: 'select',
    //   label: 'Capacity',
    //   hasMany: true,

    //   options: [
    //     { label: '1 Litre', value: 'one-litre' },
    //     { label: '2 Litre', value: 'two-litre' },
    //     { label: '3 Litre', value: 'three-litre' },
    //   ],

    //   admin: {
    //     position: 'sidebar',

    //     condition: (data, siblingData) => siblingData?.options?.includes('capacity'),
    //   },
    // },

    {
      name: 'options',
      type: 'array',
      label: 'Options',

      admin: {
        position: 'sidebar',
        components: {
          RowLabel: {
            path: '@/payload/fields/ArrayFieldTitle',
            clientProps: {
              fieldToUse: 'relationTo',
            },
          },
        },
      },
      fields: [
        {
          type: 'select',
          name: 'relationTo',
          label: 'Collections To Show',
          defaultValue: 'colors',
          required: true,
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Colors',
              value: 'colors',
            },
            {
              label: 'Sizes',
              value: 'sizes',
            },
          ],
        },
        {
          name: 'colors',
          type: 'relationship',
          relationTo: 'colors',
          hasMany: true,
          admin: {
            condition: (data, siblingData) => siblingData.relationTo === 'colors',
          },
        },
        {
          name: 'sizes',
          type: 'relationship',
          relationTo: 'sizes',
          hasMany: true,
          admin: {
            condition: (data, siblingData) => siblingData.relationTo === 'sizes',
          },
        },
      ],
    },

    {
      name: 'skus',
      type: 'array',

      labels: {
        plural: 'Stock Keeping Units',
        singular: 'Stock Keeping Unit',
      },
      access: {
        create: () => false,
      },
      admin: {
        components: {
          RowLabel: {
            path: '@/payload/fields/ArrayFieldTitle',
            clientProps: {
              fieldToUse: 'sku',
            },
          },
        },
      },
      fields: [
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
          required: true,
          admin: {
            width: '40%',
            readOnly: true,
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              label: 'Quantity',
              defaultValue: 0,
              admin: {},
            },
            {
              name: 'price',
              type: 'number',
              label: 'Price',
              defaultValue: 0,
            },
            {
              name: 'unitsSold',
              type: 'number',
              label: 'Units Sold',
              defaultValue: 0,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'color',
              type: 'text',
              label: 'Color',
              admin: {
                width: '30%',
                readOnly: true,
                condition: (data, siblingData) => siblingData.color !== null,
              },
            },
            {
              name: 'size',
              type: 'text',
              label: 'Size',
              admin: {
                width: '30%',
                readOnly: true,
                condition: (data, siblingData) => siblingData.size !== null,
              },
            },
            {
              name: 'capacity',
              type: 'text',
              label: 'Capacity',
              admin: {
                width: '30%',
                readOnly: true,
                condition: (data, siblingData) => siblingData.capacity !== null,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Inventories
