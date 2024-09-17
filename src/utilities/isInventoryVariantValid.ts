import { Inventory } from '@/payload-types'

export const isInventoryVariantValid = (
  inventory: Inventory,
  urlParams: { [key: string]: string },
) => {
  return inventory.skus?.find((sku) => {
    let found = true
    inventory.options.forEach((option) => {
      if (urlParams[option] ? urlParams[option] !== sku[option] : false) found = false
    })
    return found
  })
}

export const isVariantReadyForSale = (
  inventory: Inventory | number,
  urlParams: { [key: string]: string },
) => {
  if (typeof inventory === 'number') return undefined

  return inventory.skus?.find((sku) => {
    let found = true
    inventory.options.forEach((option) => {
      if (urlParams[option] ? urlParams[option] !== sku[option] : true) found = false
    })
    return found
  }) as NonNullable<Inventory['skus']>[number] | undefined
}
