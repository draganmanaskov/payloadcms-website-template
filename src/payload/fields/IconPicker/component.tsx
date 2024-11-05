'use client'
import { SelectInput, TextInputProps, useField } from '@payloadcms/ui'
import { FC, useState, useEffect } from 'react'
import IconPicker from './IconPicker'

export const IconsField: FC<TextInputProps> = (props) => {
  const { path, label, required } = props
  const { value, setValue } = useField<string>({ path })

  return (
    <div>
      <label className="field-label">Icon</label>
      <IconPicker selectedIcon={value} onSelect={(iconName) => setValue(iconName)} />
    </div>
  )
}
