import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
import { slugField } from '@/fields/slug'
import { showToAdmin } from '@/payload/hidden/showToAdmin'

const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    hidden: showToAdmin,
    useAsTitle: 'title',
  },
  hooks: {},
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      unique: true,
      localized: true,
    },
    ...slugField('title', { slugOverrides: { localized: true, required: true } }),
  ],
}

export default Tags
