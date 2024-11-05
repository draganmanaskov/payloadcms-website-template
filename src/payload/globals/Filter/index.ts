import { admins } from '@/access/admins'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import type { GlobalConfig } from 'payload'
import { revalidateFilter } from './hooks/revalidateFilter'
import { FilterArchive } from '@/blocks/FilterArchiveBlock/config'
import { slugField } from '@/payload/fields/slug'
// import { slugField } from '@/payload/fields/slug'

export const Filter: GlobalConfig = {
  slug: 'filter',
  access: {
    read: () => true,
    update: admins,
  },
  admin: {
    hidden: showToAdmin,
  },
  hooks: {
    afterChange: [revalidateFilter],
  },
  fields: [
    {
      name: 'categories',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Active',
        },
      ],
    },
    {
      name: 'designs',
      type: 'relationship',
      relationTo: 'designs',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [FilterArchive],
      required: true,
    },
  ],
}
