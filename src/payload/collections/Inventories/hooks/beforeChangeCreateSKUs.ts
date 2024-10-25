import { Inventory } from '@/payload-types'
import { CollectionBeforeChangeHook, DataFromCollectionSlug } from 'payload'

export const beforeChangeCreateSKUs: CollectionBeforeChangeHook<Inventory> = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (operation === 'create') {
    const getWithPromiseAll = async () => {
      if (!data.options) return [] // Handle the case when data.options is undefined

      return await Promise.all(
        data.options.map(async (option) => {
          const type = option.relationTo
          if (!type) return null // Return null if type is undefined

          const optionsIds = option[type]?.map((option) =>
            typeof option === 'number' ? option : option.id,
          )

          let result = await req.payload.find({
            collection: type,
            where: {
              id: {
                in: optionsIds,
              },
            },
          })

          return {
            type: OPTIONS_TYPE_SINGULAR[type],
            items: result.docs,
          }
        }),
      )
    }

    const options = (await getWithPromiseAll()) as Option[]
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

    const newOptions = data.options?.map((option) => {
      return {
        id: option.id,
        relationTo: option.relationTo,
        [option.relationTo]: option[option.relationTo],
      }
    })
    data.options = newOptions
  }

  return data
}

type Option = {
  type: 'colors' | 'sizes'
  items: DataFromCollectionSlug<'colors' | 'sizes'>[]
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

  for (const option of currentOption.items) {
    const newCombination = { ...currentCombination }
    newCombination[currentOption.type.toLowerCase()] = option.code

    const newSKU = currentSKU ? `${currentSKU}-${option.code}` : option.code

    combinations = combinations.concat(
      generateCombinations(options, currentIndex + 1, newCombination, newSKU),
    )
  }

  return combinations
}

// Not in use

function getCodeForValue(optionType: string, value: string): string {
  const lowerCaseValue = value.toLowerCase()
  const code = optionValueToCodeMapper[optionType]?.[lowerCaseValue]

  // Fallback to the first three uppercase letters if no mapping exists
  return code || value.toUpperCase().slice(0, 3)
}

export const OPTIONS_TYPE_SINGULAR = {
  colors: 'color',
  sizes: 'size',
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
