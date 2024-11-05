'use client'
import { Slider } from '@/components/ui/slider'
import useFilterHook from '@/hooks/useFilterHook'
import { cn } from '@/utilities'
import React, { useEffect, useState } from 'react'

export const DEFAULT_CUSTOM_PRICE = [0, 5000] as [number, number]

const PRICE_FILTERS = {
  id: 'price',
  name: 'Price',
  options: [
    { value: DEFAULT_CUSTOM_PRICE, label: 'Any price' },
    {
      value: [0, 500],
      label: 'Under 500 den.',
    },
    {
      value: [0, 1000],
      label: 'Under 1000 den.',
    },

    // custom option defined in JSX
  ],
} as const

type PriceRangeProps = {
  // urlParams: { [key: string]: string }
  // handleRange: (range: [number, number], isCustom: boolean) => void
  type: 'desktop' | 'mobile'
}

const PriceRange = ({ type }: PriceRangeProps) => {
  const { urlParams, handleRange } = useFilterHook(type)

  const [filter, setFilter] = useState({
    isCustom: urlParams.customPrice ? true : false,
    range: [
      +urlParams.fromPrice || DEFAULT_CUSTOM_PRICE[0],
      +urlParams.toPrice || DEFAULT_CUSTOM_PRICE[1],
    ] as [number, number],
  })

  useEffect(() => {
    let newState = {
      isCustom: urlParams.customPrice ? true : false,
      range: [
        +urlParams.fromPrice || DEFAULT_CUSTOM_PRICE[0],
        +urlParams.toPrice || DEFAULT_CUSTOM_PRICE[1],
      ] as [number, number],
    }
    setFilter(newState)
  }, [urlParams])

  // useEffect(() => {
  //   handleRange(filter.range, filter.isCustom);
  // }, [filter]);

  const minPrice = Math.min(filter.range[0], filter.range[1])
  const maxPrice = Math.max(filter.range[0], filter.range[1])

  const valueChangeHandler = (range: [number, number], isCustom: boolean) => {
    const [newMin, newMax] = range

    setFilter(() => ({
      isCustom: isCustom,
      range: [newMin, newMax],
    }))

    handleRange([newMin, newMax], isCustom)
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className=" text-sm text-neutral-500 dark:text-neutral-400 ">Price</h3>
      <ul className="space-y-4">
        {PRICE_FILTERS.options.map((option, optionIdx) => {
          const id = `${type}-price-${optionIdx}`
          return (
            <li key={option.label} className="ml-2 flex  items-center">
              <input
                type="radio"
                id={id}
                onChange={() => valueChangeHandler([option.value[0], option.value[1]], false)}
                checked={
                  !filter.isCustom &&
                  filter.range[0] === option.value[0] &&
                  filter.range[1] === option.value[1]
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={id} className="ml-3 text-sm text-gray-600">
                {option.label}
              </label>
            </li>
          )
        })}
        <li className="ml-2 flex flex-col justify-center gap-2 ">
          <div>
            <input
              type="radio"
              id={`${type}-price-${PRICE_FILTERS.options.length}`}
              onChange={() => valueChangeHandler(DEFAULT_CUSTOM_PRICE, true)}
              checked={filter.isCustom}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`${type}-price-${PRICE_FILTERS.options.length}`}
              className="ml-3 text-sm text-gray-600"
            >
              Custom
            </label>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Price</p>
            <div>
              {filter.isCustom ? minPrice.toFixed(0) : filter.range[0].toFixed(0)} den. -{' '}
              {filter.isCustom ? maxPrice.toFixed(0) : filter.range[1].toFixed(0)} den.
            </div>
          </div>

          <Slider
            className={cn({
              'opacity-50': !filter.isCustom,
            })}
            disabled={!filter.isCustom}
            onValueChange={(range) => valueChangeHandler([range[0], range[1]], true)}
            value={filter.isCustom ? filter.range : DEFAULT_CUSTOM_PRICE}
            min={DEFAULT_CUSTOM_PRICE[0]}
            defaultValue={DEFAULT_CUSTOM_PRICE}
            max={DEFAULT_CUSTOM_PRICE[1]}
            step={100}
          />
        </li>
      </ul>
    </div>
  )
}

export default PriceRange
