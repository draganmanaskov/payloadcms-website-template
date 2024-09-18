'use client'
import { Category } from '@/components/search/categories'
import FilterOptionMulti from '@/components/search/filter-option-multi'
import FilterOptionSingle from '@/components/search/filter-option-single'
import useFilterHook from '@/hooks/useFilterHook'
import React from 'react'
import PriceRange from './price-range'
import { Button } from '@/components/ui/button'
import Categories from '@/components/search/categories'
import { DialogClose } from '@/components/ui/dialog'
import { filterColors, filterSizes } from '@/payload/collections/Inventories/options'

type FiltersProps = {
  filter: {
    product_categories: Category[]
    design_tags: FilterOption[]
    colors: FilterOption[]
    sizes: FilterOption[]
  }
  type: 'desktop' | 'mobile'
}

const Filters = ({ filter, type }: FiltersProps) => {
  const { urlParams, handleClickSingle, handleClickMulti, handleRange, applyUrlChange } =
    useFilterHook(type)

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-end bg-inherit pt-6">
        {type === 'mobile' ? (
          <DialogClose asChild>
            <Button onClick={applyUrlChange}>Search</Button>
          </DialogClose>
        ) : null}
      </div>
      <Categories
        data={filter.product_categories}
        title={'Categories'}
        filterKey={'category'}
        urlParams={urlParams}
        handleClick={handleClickSingle}
        type={type}
      />
      <h3 className="mt-4 hidden text-sm text-neutral-500 dark:text-neutral-400 md:block">
        Filters
      </h3>

      <FilterOptionMulti
        data={filter.design_tags}
        title={'Designs'}
        filterKey={'design'}
        urlParams={urlParams}
        handleClick={handleClickMulti}
        type={type}
      />
      {/* <FilterOptionSingle
        data={filterColors}
        title={'Colors'}
        filterKey={'color'}
        urlParams={urlParams}
        handleClick={handleClickSingle}
        type={type}
      />
      <FilterOptionSingle
        data={filterSizes}
        title={'Sizes'}
        filterKey={'size'}
        urlParams={urlParams}
        handleClick={handleClickSingle}
        type={type}
      /> */}
      <PriceRange urlParams={urlParams} handleRange={handleRange} type={type} />
    </>
  )
}

export default Filters
