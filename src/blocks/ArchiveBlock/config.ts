import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      type: 'select',
      name: 'relationTo',
      label: 'Collections To Show',
      defaultValue: 'products',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: [
        {
          label: 'Products',
          value: 'products',
        },
        // {
        //   label: 'Posts',
        //   value: 'posts',
        // },
      ],
    },
    {
      type: 'relationship',
      name: 'categories',
      label: 'Categories To Show',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'limit',
      label: 'Limit',
      defaultValue: 10,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
    },
    {
      type: 'relationship',
      name: 'selectedDocs',
      label: 'Selection',
      relationTo: ['products'], //'products'
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
    // {
    //   type: 'relationship',
    //   name: 'populatedDocs',
    //   label: 'Populated Docs',
    //   relationTo: ['products'],
    //   hasMany: true,
    //   admin: {
    //     disabled: true,
    //     description: 'This field is auto-populated after-read',
    //     condition: (_, siblingData) => siblingData.populateBy === 'collection',
    //   },
    // },
    // {
    //   type: 'number',
    //   name: 'populatedDocsTotal',
    //   label: 'Populated Docs Total',
    //   admin: {
    //     step: 1,
    //     disabled: true,
    //     description: 'This field is auto-populated after-read',
    //     condition: (_, siblingData) => siblingData.populateBy === 'collection',
    //   },
    // },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
