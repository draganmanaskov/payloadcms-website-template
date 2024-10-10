import React from 'react'
import { DesignWihtChildren } from './filter-option-multi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type AcordionFilterItemProps = {
  option: DesignWihtChildren
  type: 'desktop' | 'mobile'
  filterKey: string
  urlParams: { [key: string]: string }
  handleClickMulti: (key: string, name: string, isActive: boolean) => void
}

const AcordionFilterItem = ({
  option,
  type,
  filterKey,
  urlParams,
  handleClickMulti,
}: AcordionFilterItemProps) => {
  if (option.children && option.children.length > 0) {
    const filterKeySlug =
      option.parent && typeof option.parent === 'object'
        ? `${filterKey}-${option.parent.slug}`
        : `${filterKey}-${option.slug}`

    const isActive = urlParams[filterKeySlug]
      ? urlParams[filterKeySlug].includes(`${option.id}`)
      : false
    const id = `${type}-${filterKeySlug}-${option.id}`
    return (
      <Accordion defaultValue={[filterKeySlug]} type="multiple" className="animate-none px-2">
        <AccordionItem value={filterKeySlug}>
          <AccordionTrigger className="py-0 text-sm ">
            <span className="font-medium ">{option.title}</span>
          </AccordionTrigger>

          <AccordionContent className="animate-none pt-1">
            <ul className="space-y-2">
              <li key={option.title} className="ml-2 flex items-center ">
                <input
                  type="checkbox"
                  id={id}
                  onChange={() => handleClickMulti(filterKeySlug, `${option.id}`, isActive)}
                  checked={isActive}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={id} className="ml-3 text-sm ">
                  {'All'}
                </label>
              </li>
              {option.children.map((option, index) => {
                return (
                  <AcordionFilterItem
                    key={`${option.id}-${index}`}
                    option={option}
                    type={type}
                    filterKey={filterKey}
                    urlParams={urlParams}
                    handleClickMulti={handleClickMulti}
                  />
                )
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  const filterKeySlug =
    option.parent && typeof option.parent === 'object'
      ? `${filterKey}-${option.parent.slug}`
      : filterKey
  const isActive = urlParams[filterKeySlug]
    ? urlParams[filterKeySlug].includes(`${option.id}`)
    : false
  const id = `${type}-${filterKeySlug}-${option.id}`
  return (
    <li key={option.title} className="ml-2 flex items-center ">
      <input
        type="checkbox"
        id={id}
        onChange={() => handleClickMulti(filterKeySlug, `${option.id}`, isActive)}
        checked={isActive}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={id} className="ml-3 text-sm ">
        {option.title}
      </label>
    </li>
  )
}

export default AcordionFilterItem
