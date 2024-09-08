import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'

const StockKeepingUnits: CollectionConfig = {
  slug: 'stockKeepingUnits',
  labels: {
    plural: 'Stock Keeping Units',
    singular: 'Stock Keeping Unit',
  },
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    useAsTitle: 'sku',
  },
  fields: [
    {
      type: 'row',

      fields: [
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
          required: true,
          admin: {
            width: '80%',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Quantity',
          defaultValue: 0,
          admin: {
            width: '15%',
          },
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
          },
        },
        {
          name: 'size',
          type: 'text',
          label: 'Size',
          admin: {
            width: '30%',
          },
        },
        {
          name: 'capacity',
          type: 'text',
          label: 'Capacity',
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'unitsSold',
      type: 'number',
      label: 'Units Sold',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default StockKeepingUnits
