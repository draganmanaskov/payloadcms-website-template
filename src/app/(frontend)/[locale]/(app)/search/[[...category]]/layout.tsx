import { getCachedGlobal } from '@/utilities/getGlobals'
import { Filter } from '@/payload-types'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

type SearchLayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
    category: string[] | undefined
  }
}

export default async function SearchLayout(props: SearchLayoutProps) {
  const { children, params } = props

  const filters = (await getCachedGlobal('filter', 1, params.locale)()) as Filter

  return (
    <SidebarProvider className="items-start">
      <AppSidebar category={params.category} locale={params.locale} filters={filters} />

      {children}
    </SidebarProvider>
  )
}

// const filter = { product_categories: [] } as any
// const all = { title: 'All', slug: '', color: '' }

// filter.product_categories.unshift(all)

// <>
//   {/* <div className=" mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
//     <div className=" w-full md:max-w-[220px]">
//       <div className=" hidden w-full md:block">
//         <RenderFilterBlocks locale={params.locale} blocks={filters.layout} type={'desktop'} />
//         <Filters filters={filters} filter={filter} type={'desktop'} />
//       </div>
//       <div className="md:hidden px-4">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="outline" className="mt-4">
//               Filters
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="h-5/6 overflow-scroll px-4 md:px-8">
//             <DialogHeader>
//               <DialogTitle>Filters</DialogTitle>
//               <DialogDescription>
//                 Filter your products by category, design, color, size, and price.
//               </DialogDescription>
//             </DialogHeader>
//             <RenderFilterBlocks
//               locale={params.locale}
//               blocks={filters.layout}
//               type={'mobile'}
//             />
//             <Filters filters={filters} filter={filter} type={'mobile'} />
//             <DialogFooter></DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>

//   </div> */}
//   {children}
// </>
