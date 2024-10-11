import { Inventory } from '@/payload-types'

export const isInventoryVariantValid = (
  inventory: Inventory,
  urlParams: { [key: string]: string },
) => {
  if (!inventory) return false
  return inventory.skus?.find((sku) => {
    let found = true
    inventory.options.forEach((option) => {
      if (urlParams[option] ? urlParams[option] !== sku[option] : false) found = false
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
    inventory.options.forEach((option) => {
      if (urlParams[option] ? urlParams[option] !== sku[option] : true) found = false
    })
    return found
  }) as NonNullable<Inventory['skus']>[number] | undefined
}
