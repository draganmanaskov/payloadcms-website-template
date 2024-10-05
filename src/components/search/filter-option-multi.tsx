'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'

import React from 'react'

type FilterOptionMultiProps = {
  data: FilterOption[]
  title: string
  filterKey: string
  urlParams: { [key: string]: string }
  handleClick: (key: string, name: string, isActive: boolean) => void
  type: 'desktop' | 'mobile'
}

const FilterOptionMulti = ({
  data,
  title,
  filterKey,
  urlParams,
  handleClick,
  type,
}: FilterOptionMultiProps) => {
  return (
    <Accordion defaultValue={[filterKey]} type="multiple" className="animate-none">
      <AccordionItem value={filterKey}>
        <AccordionTrigger className="py-3 text-sm ">
          <span className="font-medium ">{title}</span>
        </AccordionTrigger>

        <AccordionContent className="animate-none pt-1">
          <ScrollArea className="h-52 w-full">
            <ul className="space-y-4">
              {data
                ? data.map((option, optionIdx) => {
                    if (!option) return
                    const isActive = urlParams[filterKey]
                      ? urlParams[filterKey].includes(option.value)
                      : false
                    const id = `${type}-${filterKey}-${optionIdx}`
                    return (
                      <li key={option.name} className="ml-2 flex items-center ">
                        <input
                          type="checkbox"
                          id={id}
                          onChange={() => handleClick(filterKey, option.value, isActive)}
                          checked={isActive}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={id} className="ml-3 text-sm ">
                          {option.name}
                        </label>
                      </li>
                    )
                  })
                : null}
            </ul>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FilterOptionMulti
