import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
import { slugField } from '@/payload/fields/slug'

const Designs: CollectionConfig = {
  slug: 'designs',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },

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

export default Designs
