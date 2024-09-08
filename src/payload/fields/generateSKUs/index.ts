import type { Field } from 'payload'

export const generateSKUsField: Field = {
  name: 'generate-skus',
  type: 'ui',
  label: 'Generate SKUs',

  admin: {
    components: {
      Field: {
        path: '@/payload/fields/generateSKUs/GenerateSKUsComponent',
        // clientProps: {
        //   fieldToUse,
        //   checkboxFieldPath: checkBoxField.name,
        // },
      },
    },
  },
}
