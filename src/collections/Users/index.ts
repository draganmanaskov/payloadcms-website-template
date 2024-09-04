import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { admins } from '@/access/admins'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
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
    },
  ],
  timestamps: true,
}

export default Users
