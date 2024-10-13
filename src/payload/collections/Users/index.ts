import type { CollectionConfig } from 'payload'

import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { admins } from '@/access/admins'
import adminsAndUser from '@/access/adminAndUser'
import { showToAdmin } from '@/payload/hidden/showToAdmin'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: adminsAndUser,
    create: () => true,
    update: adminsAndUser,
    delete: admins,
  },
  admin: {
    hidden: showToAdmin,
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },

  auth: {
    verify: {
      generateEmailSubject: () => 'Verify your email',
      generateEmailHTML: ({ token }) =>
        `<p>Verify your account here ${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}.</p>`,
    },
  },
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

      // admin: {
      //   hidden: true,
      // },
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
              hasMany: false,
              required: true,
            },
            {
              name: 'sku',
              type: 'text',
              label: 'SKU',
              required: true,
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              required: true,
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
    {
      label: 'Shipping Profiles',
      name: 'shippingProfiles',
      type: 'array',

      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              type: 'text',
              label: 'Email',
              required: true,
              admin: {
                width: '48%',
              },
            },
            {
              name: 'phoneNumber',
              type: 'text',
              label: 'Phone Number',
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
  timestamps: true,
}

export default Users
