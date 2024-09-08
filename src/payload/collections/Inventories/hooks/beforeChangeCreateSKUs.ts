import { Inventory } from '@/payload-types'
import { CollectionBeforeChangeHook } from 'payload'

export const beforeChangeCreateSKUs: CollectionBeforeChangeHook<Inventory> = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (operation === 'create') {
    const options = data.options
      ?.map((option) => {
        return {
          name: option,
          values: data[option] ?? [],
        }
      })
      .filter((option) => option.values.length > 0)

    if (!options) return data

    const allCombinations = generateCombinations(options)

    const variants = allCombinations.map((item) => {
      const sku = `${data.baseSku}-${item.sku}`
      return {
        ...item.combination,
        sku: sku,
      }
    })

    data.skus = variants
  }

  return data // Return data to either create or update a document with
}

type AvailableOptions = 'color' | 'size' | 'capacity'

type Option = {
  name: AvailableOptions // Names of the options
  values: string[] // Allow for null or undefined
}
type Combination = {
  [key: string]: string
}

function generateCombinations(
  options: Option[],
  currentIndex: number = 0,
  currentCombination: Combination = {},
  currentSKU: string = '',
): { combination: Combination; sku: string }[] {
  if (currentIndex === options.length) {
    return [{ combination: { ...currentCombination }, sku: currentSKU }]
  }

  const currentOption = options[currentIndex]
  let combinations: { combination: Combination; sku: string }[] = []

  for (const value of currentOption.values) {
    const newCombination = { ...currentCombination }
    newCombination[currentOption.name.toLowerCase()] = value

    // Use the unified mapper to get the code
    const valueCode = getCodeForValue(currentOption.name.toLowerCase(), value)
    const newSKU = currentSKU ? `${currentSKU}-${valueCode}` : valueCode

    combinations = combinations.concat(
      generateCombinations(options, currentIndex + 1, newCombination, newSKU),
    )
  }

  return combinations
}

function getCodeForValue(optionType: string, value: string): string {
  const lowerCaseValue = value.toLowerCase()
  const code = optionValueToCodeMapper[optionType]?.[lowerCaseValue]

  // Fallback to the first three uppercase letters if no mapping exists
  return code || value.toUpperCase().slice(0, 3)
}

const optionValueToCodeMapper: { [optionType: string]: { [value: string]: string } } = {
  color: {
    black: 'BLA',
    white: 'WHI',
    red: 'RED',
    blue: 'BLU',
    green: 'GRN',
    // Add more colors as needed
  },
  size: {
    small: 'S',
    medium: 'M',
    large: 'L',
    xl: 'XL',
    // Add more sizes as needed
  },
  capacity: {
    '1L': 'one-litre',
    '2L': 'two-litre',
    '3L': 'three-litre',
    // Add more capacities as needed
  },
  // Add more option types as needed in the future
}
