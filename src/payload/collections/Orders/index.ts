import type { CollectionConfig } from 'payload'

import adminAndUser from '@/access/adminAndUser'
import { generateOrderNumber } from './hooks/generateOrderNumber'
import { generateOrderItemTotal } from './hooks/calculateOrderItemTotal'
import { pupulateCustomer } from './hooks/populateCustomer'
import { clearUserCart } from './hooks/clearUserCart'
import { anyone } from '@/access/anyone'
import { admins } from '@/access/admins'

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    plural: 'Orders',
    singular: 'Order',
  },
  access: {
    create: anyone,
    delete: admins,
    read: adminAndUser,
    update: admins,
  },
  hooks: {
    afterChange: [clearUserCart],
  },
  admin: {
    useAsTitle: 'orderNumber',
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [generateOrderNumber],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Returned', value: 'returned' },
      ],
      admin: {
        width: '50%',
        position: 'sidebar',
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      hooks: {
        beforeChange: [pupulateCustomer],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Order Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'subTotal',
                  type: 'number',
                  label: 'Sub Total',
                  defaultValue: 0,
                  admin: {
                    width: '20%',
                  },
                },
                {
                  name: 'shipping',
                  type: 'number',
                  label: 'Shipping',
                  defaultValue: 0,
                  admin: {
                    width: '20%',
                  },
                },
                {
                  name: 'total',
                  type: 'number',
                  label: 'Total',
                  defaultValue: 0,
                  admin: {
                    width: '20%',
                  },
                },
                {
                  name: 'currencyCode',
                  type: 'select',
                  defaultValue: 'MKD',
                  required: true,
                  options: [{ label: 'MKD', value: 'MKD' }],
                  admin: {
                    width: '20%',
                  },
                },
              ],
            },
            {
              name: 'items',
              label: 'Items',
              type: 'array',
              interfaceName: 'OrderItems',
              hooks: {
                beforeChange: [generateOrderItemTotal],
              },
              fields: [
                {
                  name: 'status',
                  label: 'Status',
                  type: 'select',
                  defaultValue: 'notPriented',
                  options: [
                    { label: 'Not Printed', value: 'notPriented' },
                    { label: 'Printed', value: 'printed' },
                    { label: 'Canceled', value: 'canceled' },
                    { label: 'Leftover', value: 'leftover' },
                    { label: 'Returned', value: 'returned' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'quantity',
                      label: 'Quantity',
                      type: 'number',
                      min: 1,
                      defaultValue: 1,
                      required: true,
                      admin: {
                        step: 1,
                        width: '20%',
                      },
                    },
                    {
                      name: 'price',
                      label: 'Price',
                      type: 'number',
                      min: 1,
                      defaultValue: 1,
                      required: true,
                      admin: {
                        step: 1,
                        width: '20%',
                      },
                    },
                    {
                      name: 'total',
                      label: 'Total',
                      type: 'number',
                      min: 1,
                      defaultValue: 1,
                      required: true,
                      admin: {
                        step: 1,
                        width: '20%',
                      },
                    },
                  ],
                },
                {
                  name: 'sku',
                  label: 'SKU',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'product',
                  label: 'Product',
                  type: 'relationship',
                  relationTo: 'products',
                  hasMany: false,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Customer Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '45%',
                  },
                },
                {
                  name: 'phoneNumber',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '45%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  label: 'First Name',
                  required: true,
                  admin: {
                    width: '48%',
                  },
                },
                {
                  name: 'lastName',
                  type: 'text',
                  label: 'Last Name',
                  required: true,
                  admin: {
                    width: '48%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'address',
                  type: 'text',
                  label: 'Address',
                  required: true,
                  admin: {
                    width: '70%',
                  },
                },
                {
                  name: 'country',
                  type: 'select',
                  label: 'Country',
                  required: true,
                  defaultValue: 'Macedonia',
                  options: [
                    {
                      label: 'Macedonia',
                      value: 'Macedonia',
                    },
                  ],
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  label: 'City',
                  required: true,
                  admin: {
                    width: '32%',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  label: 'State',
                  required: true,
                  admin: {
                    width: '32%',
                  },
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  label: 'Zip Code',
                  required: true,
                  admin: {
                    width: '32%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Orders
