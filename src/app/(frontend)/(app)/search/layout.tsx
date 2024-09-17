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

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const filter = { product_categories: [] } as any
  const all = { title: 'All', slug: '', color: '' }

  filter.product_categories.unshift(all)

  return (
    <>
      <div className=" mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className=" w-full md:max-w-[220px]">
          <div className=" hidden w-full md:block">
            <Filters filter={filter} type={'desktop'} />
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
                <Filters filter={filter} type={'mobile'} />
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="order-last w-full md:order-none">{children}</div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" qeury="sort" />
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  )
}
