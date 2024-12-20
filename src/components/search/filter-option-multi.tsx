'use client'

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionSimpleTrigger,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import useFilterHook from '@/hooks/useFilterHook'
import { Design, Category } from '@/payload-types'

import React from 'react'
import AcordionFilterItem from './acordionFilterItem'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar'
import { Minus, Plus } from 'lucide-react'

type FilterOptionMultiProps = {
  data: Design[] | Category[]
  title: string
  filterKey: string
  // urlParams: { [key: string]: string }
  // handleClick: (key: string, name: string, isActive: boolean) => void
  type: 'desktop' | 'mobile'
}

const FilterOptionMulti = ({
  data,
  title,
  filterKey,

  type,
}: FilterOptionMultiProps) => {
  const { urlParams, handleClickMulti } = useFilterHook(type, 0)

  const transformedData = buildHierarchy(data)

  return (
    // <SidebarMenuItem>
    //   <Accordion defaultValue={[filterKey]} type="multiple" className="animate-none">
    //     <AccordionItem value={filterKey}>
    //       <AccordionHeader>
    //         <AccordionSimpleTrigger>
    //           <span className="font-medium ">{title}</span>
    //         </AccordionSimpleTrigger>
    //       </AccordionHeader>

    //       <AccordionContent className="animate-none pt-1">
    //         <ScrollArea className="h-80 w-full">
    //           <ul className="space-y-4">
    //             {transformedData.map((option, index) => {
    //               return (
    //                 <AcordionFilterItem
    //                   key={`${option.id}-${index}`}
    //                   option={option}
    //                   type={type}
    //                   filterKey={filterKey}
    //                   urlParams={urlParams}
    //                   handleClickMulti={handleClickMulti}
    //                 />
    //               )
    //             })}
    //           </ul>
    //         </ScrollArea>
    //       </AccordionContent>
    //     </AccordionItem>
    //   </Accordion>
    // </SidebarMenuItem>
    <Collapsible key={title} defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {title}
            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {transformedData.map((option, index) => {
          return (
            <CollapsibleContent key={`${option.id}-${index}`}>
              <SidebarMenuSub>
                <AcordionFilterItem
                  key={`${option.id}-${index}`}
                  option={option}
                  type={type}
                  filterKey={filterKey}
                  urlParams={urlParams}
                  handleClickMulti={handleClickMulti}
                />
              </SidebarMenuSub>
            </CollapsibleContent>
          )
        })}
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default FilterOptionMulti

export type DesignWihtChildren = Design & {
  children: DesignWihtChildren[]
}

function buildHierarchy(data: Design[]) {
  const itemsMap = new Map()
  const rootItems: DesignWihtChildren[] = []

  // Step 1: Create a map of items by their id
  data.forEach((item) => {
    itemsMap.set(item.id, { ...item, children: [] })
  })

  // Step 2: Organize each item under its parent
  data.forEach((item) => {
    if (item.parent) {
      const parentId = typeof item.parent === 'number' ? item.parent : item.parent.id
      const parentItem = itemsMap.get(parentId)
      if (parentItem) {
        parentItem.children.push(itemsMap.get(item.id))
      }
    } else {
      // If there's no parent, add the item to the root level
      rootItems.push(itemsMap.get(item.id))
    }
  })

  return rootItems
}

// 'use client'

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import useFilterHook from '@/hooks/useFilterHook'
// import { Design } from '@/payload-types'

// import React from 'react'

// type FilterOptionMultiProps = {
//   data: Design[]
//   title: string
//   filterKey: string
//   // urlParams: { [key: string]: string }
//   // handleClick: (key: string, name: string, isActive: boolean) => void
//   type: 'desktop' | 'mobile'
// }

// const FilterOptionMulti = ({
//   data,
//   title,
//   filterKey,

//   type,
// }: FilterOptionMultiProps) => {
//   const { urlParams, handleClickMulti } = useFilterHook(type)

//   return (
//     <Accordion defaultValue={[filterKey]} type="multiple" className="animate-none">
//       <AccordionItem value={filterKey}>
//         <AccordionTrigger className="py-3 text-sm ">
//           <span className="font-medium ">{title}</span>
//         </AccordionTrigger>

//         <AccordionContent className="animate-none pt-1">
//           <ScrollArea className="h-52 w-full">
//             <ul className="space-y-4">
//               {data
//                 ? data.map((option, optionIdx) => {
//                     if (!option) return
//                     const isActive = urlParams[filterKey]
//                       ? urlParams[filterKey].includes(`${option.id}`)
//                       : false
//                     const id = `${type}-${filterKey}-${optionIdx}`
//                     return (
//                       <li key={option.title} className="ml-2 flex items-center ">
//                         <input
//                           type="checkbox"
//                           id={id}
//                           onChange={() => handleClickMulti(filterKey, `${option.id}`, isActive)}
//                           checked={isActive}
//                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                         <label htmlFor={id} className="ml-3 text-sm ">
//                           {option.title}
//                         </label>
//                       </li>
//                     )
//                   })
//                 : null}
//             </ul>
//           </ScrollArea>
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   )
// }

// export default FilterOptionMulti
