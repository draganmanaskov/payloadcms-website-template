'use client'
import React, { useEffect } from 'react'

import {
  useField,
  useFieldProps,
  Button,
  TextInput,
  FieldLabel,
  useFormFields,
} from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'
import { TextFieldClientProps } from 'payload'

type SlugComponentProps = {
  fieldToUse: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({ field, fieldToUse }) => {
  const { label } = field
  const { path, readOnly: readOnlyFromProps } = useFieldProps()
  const { value, setValue } = useField<string>({ path })

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (targetFieldValue) {
      const formattedSlug = formatSlug(targetFieldValue)

      if (value !== formattedSlug) setValue(formattedSlug)
    } else {
      if (value !== '') setValue('')
    }
  }, [targetFieldValue, setValue, value])

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>

      <TextInput value={value} onChange={setValue} path={path} readOnly />
    </div>
  )
}
