import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'

import { showToAdmin } from '@/payload/hidden/showToAdmin'
import { optionFields } from '../fields/optionFields'

const Colors: CollectionConfig = {
  slug: 'colors',
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
  fields: [...optionFields()],
}

export default Colors
