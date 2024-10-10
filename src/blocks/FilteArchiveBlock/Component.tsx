import type { FilterArchiveBlock as FilterArchiveBlockProps, Design } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

import { cn } from '@/utilities'

import FilterOptionMulti from '@/components/search/filter-option-multi'
import { getValidLocale } from '@/app/(frontend)/[locale]/(app)/[slug]/page'

export const FilterArchiveBlock: React.FC<
  FilterArchiveBlockProps & {
    id?: string
    type: 'desktop' | 'mobile'
    locale: 'string'
  }
> = async (props) => {
  const {
    id,
    title,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
    type,
    locale,
  } = props

  const limit = limitFromProps || 3

  let filter

  if (populateBy === 'collection' && relationTo) {
    const payload = await getPayloadHMR({ config: configPromise })
    const validLocale = getValidLocale(locale)

    const fetchFilter = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      locale: validLocale,
    })
    filter = fetchFilter.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedFilters = selectedDocs.map((filter) => {
        if (typeof filter.value === 'object') return filter.value
      })
      filter = filteredSelectedFilters
    }
  }

  return (
    <div className={cn('w-full')} id={`block-${id}`}>
      <h3 className=" text-sm text-neutral-500 dark:text-neutral-400 ">{title}</h3>
      <FilterOptionMulti data={filter} title={'Designs'} filterKey={'design'} type={type} />
    </div>
  )
}
