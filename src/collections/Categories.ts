import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'

import { admins } from '@/access/admins'
import { slugField } from '@/fields/slug'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}

export default Categories
