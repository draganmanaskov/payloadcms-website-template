import { SortFilterItem } from '@/constants'

import { cn } from '@/utilities'

import { Button } from '@/components/ui/button'

export type ListItem = SortFilterItem | Category

export type Category = {
  color: string
  title: string
  slug: string
}

type CategoriesType = {
  data: Category[]
  title: string
  filterKey: string
  urlParams: { [key: string]: string }
  handleClick: (key: string, name: string, isActive: boolean) => void
  type: 'desktop' | 'mobile'
}

export default function Categories({
  data,
  title,
  filterKey,
  urlParams,
  handleClick,
  type,
}: CategoriesType) {
  return (
    <nav>
      <h3 className=" text-sm text-neutral-500 dark:text-neutral-400 ">Categories</h3>
      <ul>
        {data.map((item: ListItem, i) => {
          const active = urlParams[filterKey] === item.slug

          return (
            <li className=" flex text-sm text-black dark:text-white" key={item.title}>
              <Button
                variant={'link'}
                size={'sm'}
                className={cn('m-0 p-0', {
                  'underline underline-offset-4': active,
                })}
                onClick={() => handleClick(filterKey, item.slug, active)}
              >
                {item.title}
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
