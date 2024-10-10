import { admins } from '@/access/admins'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import type { GlobalConfig } from 'payload'
import { revalidateFilter } from './hooks/revalidateFilter'
import { FilterArchive } from '@/blocks/FilteArchiveBlock/config'

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
