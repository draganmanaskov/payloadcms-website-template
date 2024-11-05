import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// import { linkGroup } from '@/fields/linkGroup'
import { linkGroup } from '@/payload/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',

  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
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
      label: false,
    },
    {
      name: 'textColor',
      type: 'radio',
      label: 'Color',
      admin: {
        layout: 'horizontal',
      },

      options: [
        { label: 'None', value: '' },
        {
          label: 'White',
          value: 'text-white',
        },
        {
          label: 'Black',
          value: 'text-black',
        },
        {
          label: 'Red',
          value: 'text-red-500',
        },
        {
          label: 'Green',
          value: 'text-green-500',
        },
        {
          label: 'Blue',
          value: 'text-blue-500',
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
