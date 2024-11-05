import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'

import { admins } from '@/access/admins'
import { slugField } from '@/payload/fields/slug'
import { showToAdmin } from '@/payload/hidden/showToAdmin'

const Categories: CollectionConfig = {
  slug: 'categories',
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

export default Categories
