import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { admins } from '@/access/admins'

const Users: CollectionConfig = {
  slug: 'users',
  // access: {
  //   read: () => true,
  //   create: admins,
  //   update: admins,
  //   delete: admins,
  // },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'sku',
              type: 'text',
              label: 'SKU',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
        // If you wanted to maintain a 'created on'
        // or 'last modified' date for the cart
        // you could do so here:
        // {
        //   name: 'createdOn',
        //   label: 'Created On',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
        // {
        //   name: 'lastModified',
        //   label: 'Last Modified',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
      ],
    },
  ],
  timestamps: true,
}

export default Users
