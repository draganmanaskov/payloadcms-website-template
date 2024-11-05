import type { FilterArchiveBlock } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

import { cn } from '@/utilities'

import FilterOptionMulti from '@/components/search/filter-option-multi'
import { getValidLocale } from '@/utilities'

type FilterArchiveBlockProps = {
  block: FilterArchiveBlock
  id?: string
  type: 'desktop' | 'mobile'
  locale: string
}

const FilterArchiveBlock = async ({ block, id, type, locale }: FilterArchiveBlockProps) => {
  const { title, populateBy, relationTo, selectedDocs, type: typeFromProps, limit } = block

  let filter

  if (populateBy === 'collection' && relationTo) {
    const payload = await getPayloadHMR({ config: configPromise })
    const validLocale = getValidLocale(locale)

    const fetchFilter = await payload.find({
      collection: relationTo,
      depth: 1,
      limit: limit || undefined,
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
    <FilterOptionMulti data={filter} title={title || ''} filterKey={relationTo || ''} type={type} />
  )
}

export default FilterArchiveBlock
