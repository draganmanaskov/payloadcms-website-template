import { Inventory } from '@/payload-types'
import React from 'react'
import VariantButton from './VariantButton'
import { capitalizeFirstLetter, isInventoryVariantValid } from '@/utilities'
import { Skeleton } from '../ui/skeleton'
import { OPTIONS_TYPE_SINGULAR } from '@/payload/collections/Inventories/hooks/beforeChangeCreateSKUs'

type VariantPickerProps = {
  inventory: number | Inventory

  urlParams: { [key: string]: string }
  handleClick: (key: string, name: string, isActive: boolean) => void
}

export type OptionValue = {
  id: number
  title: string
  value: string
  code: string
}

const VarianPicker = ({ inventory, urlParams, handleClick }: VariantPickerProps) => {
  if (typeof inventory === 'number') return null

  return (
    <div>
      {inventory.options?.map((option, index) => {
        const optionType = option.relationTo as string

        return (
          <div key={`${option}-${index + 1}`} className="grid gap-2">
            <p className="text-base">{capitalizeFirstLetter(optionType)}</p>
            <div className="flex flex-wrap gap-4">
              {option[optionType]?.map((optionValue: OptionValue, index) => {
                // Base option params on current params so we can preserve any other param state in the url.

                const isActive = urlParams[optionType] === optionValue.code ? true : false

                const isAvailableForSale = isInventoryVariantValid(inventory, urlParams)
                  ? true
                  : false

                return (
                  <VariantButton
                    optionName={option.relationTo}
                    optionValue={optionValue}
                    isActive={isActive}
                    handleEventClick={handleClick}
                    isAvailableForSale={isAvailableForSale}
                    key={optionValue.code}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VarianPicker

export const VariantSelectorSkeleton = () => {
  const skeletonItems = Array(4).fill(null) // Adjust the number as needed

  return (
    <div className="mb-8 space-y-6">
      {Array(2)
        .fill(null)
        .map((item, index) => {
          return (
            <div key={index} className="p-2">
              <div className="mb-4">
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="flex flex-wrap gap-3">
                {skeletonItems.map((_, index) => (
                  <Skeleton
                    key={index}
                    className="flex h-7 min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900"
                  />
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}
