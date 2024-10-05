import type { TextField } from 'payload'

export const validateHexColor = (value: string = ''): true | string => {
  return value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null || `Please give a valid hex color`
}

const colorField: TextField = {
  name: 'color',
  type: 'text',
  //   validate: validateHexColor,
  required: true,
  admin: {
    components: {
      Field: {
        path: '@/payload/fields/ColorPicker/InputField',
      },
      Cell: {
        path: '@/payload/fields/ColorPicker/Cell',
      },
      //   Cell,
    },
  },
}

export default colorField
