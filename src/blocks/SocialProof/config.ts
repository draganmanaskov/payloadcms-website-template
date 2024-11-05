import type { Block, Field } from 'payload'

import { IconsField } from '@/payload/fields/IconPicker'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  IconsField,
  {
    name: 'value',
    type: 'text',
    required: true,
  },
  {
    name: 'label',
    type: 'text',
    required: true,
  },
]

export const SocialProofBlock: Block = {
  slug: 'socialProof',
  interfaceName: 'SocialProofBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
