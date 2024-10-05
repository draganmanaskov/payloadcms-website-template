import { admins } from '@/access/admins'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import type { GlobalConfig } from 'payload'

export const Filter: GlobalConfig = {
  slug: 'filter',
  access: {
    read: () => true,
    update: admins,
  },
  admin: {
    hidden: showToAdmin,
  },
  fields: [
    {
      name: 'designs',
      type: 'relationship',
      relationTo: 'designs',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
