import Filters from './filters'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Filter } from '@/payload-types'

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const filter = { product_categories: [] } as any
  const all = { title: 'All', slug: '', color: '' }

  filter.product_categories.unshift(all)

  const filters: Filter = await getCachedGlobal('filter', 1)()

  return (
    <>
      <div className=" mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className=" w-full md:max-w-[220px]">
          <div className=" hidden w-full md:block">
            <Filters filters={filters} filter={filter} type={'desktop'} />
          </div>
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Filters</Button>
              </DialogTrigger>
              <DialogContent className="h-5/6 overflow-scroll px-4 md:px-8">
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                  <DialogDescription>
                    Filter your products by category, design, color, size, and price.
                  </DialogDescription>
                </DialogHeader>
                <Filters filters={filters} filter={filter} type={'mobile'} />
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
