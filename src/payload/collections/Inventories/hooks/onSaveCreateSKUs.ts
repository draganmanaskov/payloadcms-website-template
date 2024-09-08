import type {
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  RequiredDataFromCollectionSlug,
} from 'payload'

import { Inventory } from '@/payload-types'

export const onSaveCreateSKUs: CollectionAfterChangeHook<Inventory> = async ({
  doc,
  req,
  operation,
}) => {
  const { payload } = req

  if (operation === 'create') {
    const options = doc.options
      ?.map((option) => {
        return {
          name: option,
          values: doc[option] ?? [],
        }
      })
      .filter((option) => option.values.length > 0)

    if (!options) return

    const allCombinations = generateCombinations(options)

    const variants = allCombinations.map((item) => {
      const sku = `${doc.baseSku}-${item.sku}`
      return {
        ...item.combination,
        sku: sku,
      }
    })
    console.log(variants)
    let skus: number[] = []

    for (let i = 0; i < variants.length; i++) {
      console.log(variants[i])
      let sku = await payload.create({
        collection: 'stockKeepingUnits',
        data: {
          ...variants[i],
        },
      })
      skus.push(sku.id)
    }

    await payload.update({
      collection: 'inventories',
      req: req,
      id: doc.id,
      data: {
        stockKeepingUnits: skus,
      },
    })
  }
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
