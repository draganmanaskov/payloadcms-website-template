import { Inventory } from '@/payload-types'
import React from 'react'
import VariantButton from './VariantButton'
import { capitalizeFirstLetter, isInventoryVariantValid } from '@/utilities'
import { Skeleton } from '../ui/skeleton'

type VariantPickerProps = {
  inventory: number | Inventory
  type: 'color' | 'size'
  urlParams: { [key: string]: string }
  handleClick: (key: string, name: string, isActive: boolean) => void
}

const VarianPicker = ({ inventory, type, urlParams, handleClick }: VariantPickerProps) => {
  if (typeof inventory === 'number') return null

  return (
    <div>
      {inventory.options.map((option, index) => {
        return (
          <div key={`${option}-${index + 1}`} className="grid gap-2">
            <p className="text-base">{capitalizeFirstLetter(option)}</p>
            <div className="flex flex-wrap gap-4">
              {inventory[option]?.map((optionValue, index) => {
                const optionNameLowerCase = option
                // Base option params on current params so we can preserve any other param state in the url.
                const isActive = urlParams[optionNameLowerCase] === optionValue ? true : false

                const isAvailableForSale = isInventoryVariantValid(inventory, urlParams)
                  ? true
                  : false

                return (
                  <VariantButton
                    optionName={optionNameLowerCase}
                    name={optionValue}
                    value={optionValue}
                    isActive={isActive}
                    handleEventClick={handleClick}
                    isAvailableForSale={isAvailableForSale}
                    key={optionValue}
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
