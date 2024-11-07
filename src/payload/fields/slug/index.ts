import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, TextField]

export const slugField: Slug = (fieldToUse, overrides = {}) => {
  const { slugOverrides } = overrides

  let fieldToUseCUrrent = fieldToUse ? fieldToUse : 'slugTitle'

  // @ts-expect-error
  const slugTitleField: TextField = {
    name: 'slugTitle',
    type: 'text',
    index: true,
    label: 'Slug Title',
    ...(slugOverrides || {}),
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
    },
  }

  // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  // @ts-expect-error
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUseCUrrent)],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/payload/fields/slug/SlugComponent',
          exportName: 'SlugComponent',
          clientProps: {
            fieldToUse: fieldToUseCUrrent,
          },
        },
      },
    },
  }

  return [slugTitleField, slugField]
}
