'use client'
import React, { useEffect, useState, useCallback, Fragment } from 'react'

// this is how we'll interface with Payload itself
// import { useFieldType } from 'payload/components/forms';

// retrieve and store the last used colors of your users
// import { usePreferences } from 'payload/components'

// re-use Payload's built-in button component

// import Error from 'payload/dist/admin/components/forms/Error/index'

// we can use existing Payload types easily
import { TextInputProps } from '@payloadcms/ui/fields/Text'

// we'll import and reuse our existing validator function on the frontend, too
import { validateHexColor } from './config'

// Import the SCSS stylesheet
import './styles.scss'
import { Button, useField, usePreferences } from '@payloadcms/ui'

// keep a list of default colors to choose from
const defaultColors = ['#333333', '#9A9A9A', '#F3F3F3', '#FF6F76', '#FDFFA4', '#B2FFD6', '#F3DDF3']
const baseClass = 'custom-color-picker'

const preferenceKey = 'color-picker-colors'

const InputField: React.FC<TextInputProps> = (props) => {
  const { path, label, required } = props

  const {
    value = '',
    setValue,
    errorMessage,
    showError,
  } = useField({
    path,
  })
  const classes = ['field-type', 'text', baseClass, showError && 'error'].filter(Boolean).join(' ')

  const { getPreference, setPreference } = usePreferences()
  const [colorOptions, setColorOptions] = useState(defaultColors)
  const [isAdding, setIsAdding] = useState(false)
  const [colorToAdd, setColorToAdd] = useState('')

  useEffect(() => {
    const mergeColorsFromPreferences = async () => {
      const colorPreferences = await getPreference<string[]>(preferenceKey)
      if (colorPreferences) {
        setColorOptions(colorPreferences)
      }
    }
    mergeColorsFromPreferences()
  }, [getPreference, setColorOptions])

  const handleAddColor = useCallback(() => {
    setIsAdding(false)
    setValue(colorToAdd)

    // prevent adding duplicates
    if (colorOptions.indexOf(colorToAdd) > -1) return

    let newOptions = colorOptions
    newOptions.unshift(colorToAdd)

    // update state with new colors
    setColorOptions(newOptions)
    // store the user color preferences for future use
    setPreference(preferenceKey, newOptions)
  }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue])

  return (
    <div className={classes}>
      <label className="field-label" htmlFor={path}>
        Text Color
      </label>

      {isAdding && (
        <div>
          <input
            className={`${baseClass}__input`}
            type="text"
            placeholder="#000000"
            onChange={(e) => setColorToAdd(e.target.value)}
            value={colorToAdd}
          />
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
            disabled={validateHexColor(colorToAdd) !== true}
          >
            Add
          </Button>
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="secondary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {!isAdding && (
        <Fragment>
          <ul className={`${baseClass}__colors ${showError ? 'error' : ''}`}>
            {colorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  key={color}
                  className={`chip ${color === value ? 'chip--selected' : ''} chip--clickable`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                  onClick={() => setValue(color)}
                />
              </li>
            ))}
          </ul>
          <Button
            className="add-color"
            icon="plus"
            buttonStyle="icon-label"
            iconPosition="left"
            iconStyle="with-border"
            onClick={() => {
              setIsAdding(true)
              setValue('')
            }}
          />
        </Fragment>
      )}
    </div>
  )
}
export default InputField
