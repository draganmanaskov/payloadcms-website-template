import { Category, Filter } from '@/payload-types'
import { getValidLocale } from '@/utilities'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { PaginatedDocs } from 'payload'
import NestedItem from './NestedItem'

type CategoriesProps = {
  filterCategories: Filter['categories']
  category: string[] | undefined
  locale: string
}

const Categories = async ({ filterCategories, category, locale }: CategoriesProps) => {
  const payload = await getPayloadHMR({ config: configPromise })
  const validLocale = getValidLocale(locale)

  let categorySlug = category ? category[category.length - 1] : ''

  var categoryQuery = category
    ? {
        'parent.slug': {
          equals: categorySlug,
        },
      }
    : {
        parent: {
          equals: null,
        },
      }

  let currentLevelCategories: PaginatedDocs<Category>

  if (category) {
    currentLevelCategories = (await payload.find({
      collection: 'categories',
      depth: 1,
      locale: validLocale,
      where: {
        'parent.slug': {
          equals: categorySlug,
        },
      },
    })) as PaginatedDocs<Category>
  } else {
    currentLevelCategories = (await payload.find({
      collection: 'categories',
      depth: 1,
      locale: validLocale,
      where: {
        parent: {
          equals: null,
        },
      },
    })) as PaginatedDocs<Category>
  }

  let categories = createNestedStructure(category || [])
  console.log(categories)

  return (
    // <SidebarGroup>
    //   <SidebarMenu className="gap-2">
    //     <SidebarMenuItem>
    //       <SidebarMenuButton asChild>
    //         <a href={'/'} className="font-medium">
    //           Categoreis
    //         </a>
    //       </SidebarMenuButton>

    //       <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
    //         {category?.map((item) => (
    //           <SidebarMenuSubItem key={item}>
    //             <SidebarMenuSubButton asChild>
    //               <a href={item} className="font-medium">
    //                 {item}
    //               </a>
    //             </SidebarMenuSubButton>
    //           </SidebarMenuSubItem>
    //         ))}
    //       </SidebarMenuSub>
    //     </SidebarMenuItem>
    //   </SidebarMenu>
    // </SidebarGroup>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href={'/search'} className="font-medium">
              Categories
            </a>
          </SidebarMenuButton>

          <NestedItem categories={categories} currentLevelCategories={currentLevelCategories} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default Categories

{
  /* {item.items?.length ? (
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {item.items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null} */
}

const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
  ],
}

export type NestedNode = {
  name: string
  label: string
  slug: string
  child: NestedNode | null
}

function createNestedStructure(items: string[], parentSlug: string = ''): NestedNode | null {
  if (items.length === 0) {
    return null
  }

  const [current, ...rest] = items
  const currentSlug = `${parentSlug}/${current}`.replace(/\/+/g, '/') // Ensure no duplicate slashes

  return {
    name: current,
    slug: currentSlug,
    label: current.charAt(0).toUpperCase() + current.slice(1), // Capitalize the label
    child: createNestedStructure(rest, currentSlug),
  }
}
