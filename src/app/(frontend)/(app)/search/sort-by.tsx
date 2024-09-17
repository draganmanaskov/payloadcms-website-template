'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useFilterHook from '@/hooks/useFilterHook'
import { SORTING } from '@/constants'

const SortBy = () => {
  const { urlParams, handleClickSingle } = useFilterHook('desktop')
  return (
    <Select
      defaultValue=""
      value={urlParams.sort}
      onValueChange={(value) => handleClickSingle('sort', value, false)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {SORTING.map((item) => (
          <SelectItem value={item.slug} key={item.title}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortBy
