import type { Field } from 'payload'

export const optionFields = () => {
  const titleField: Field = {
    name: 'title',
    type: 'text',
    label: 'Title',
    required: true,
    unique: true,
    localized: true,
  }

  const valueField: Field = {
    name: 'value',
    type: 'text',
    label: 'Value',
    required: true,
    unique: true,
  }

  const codeField: Field = {
    name: 'code',
    type: 'text',
    label: 'Code',
    required: true,
    unique: true,
  }

  return [titleField, valueField, codeField]
}
