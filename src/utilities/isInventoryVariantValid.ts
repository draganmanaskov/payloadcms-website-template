import { Inventory } from '@/payload-types'
import { OPTIONS_TYPE_SINGULAR } from '@/payload/collections/Inventories/hooks/beforeChangeCreateSKUs'

export const isInventoryVariantValid = (
  inventory: Inventory,
  urlParams: { [key: string]: string },
) => {
  if (!inventory) return false
  // console.log(urlParams)
  return inventory.skus?.find((sku) => {
    let found = true

    inventory.options?.forEach((option) => {
      if (
        urlParams[option.relationTo]
          ? urlParams[option.relationTo] !== sku[OPTIONS_TYPE_SINGULAR[option.relationTo]]
          : false
      ) {
        // console.log('Found invalid variant')
        // console.log(urlParams[option.relationTo])
        // console.log(sku[OPTIONS_TYPE_SINGULAR[option.relationTo]])
        found = false
      }
    })
    return found
  })
}

export const isVariantReadyForSale = (
  inventory: Inventory | number | undefined | null,
  urlParams: { [key: string]: string },
) => {
  if (typeof inventory === 'number' || !inventory) return undefined

  return inventory.skus?.find((sku) => {
    let found = true
    inventory.options?.forEach((option) => {
      if (
        urlParams[option.relationTo]
          ? urlParams[option.relationTo] !== sku[OPTIONS_TYPE_SINGULAR[option.relationTo]]
          : true
      )
        found = false
    })
    return found
  }) as NonNullable<Inventory['skus']>[number] | undefined
}
