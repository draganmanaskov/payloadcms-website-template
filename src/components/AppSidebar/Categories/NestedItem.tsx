import React from 'react'
import { NestedNode } from '.'
import { SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { PaginatedDocs } from 'payload'
import { Category } from '@/payload-types'

type NestedItemProps = {
  categories: NestedNode | null
  currentLevelCategories: PaginatedDocs<Category>
}

const NestedItem = ({ categories, currentLevelCategories }: NestedItemProps) => {
  if (categories && categories.child) {
    // Renders nested items if the current category has children
    return (
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild isActive={false}>
            <a href={`/search/${categories.slug}`}>{categories.label}</a>
          </SidebarMenuSubButton>
          <NestedItem
            categories={categories.child}
            currentLevelCategories={currentLevelCategories}
          />
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    )
  }

  // Base case rendering if there are no children
  return (
    <SidebarMenuSub>
      {categories ? (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild isActive={true}>
            <a href={`/search/${categories.slug}`}>{categories.label}</a>
          </SidebarMenuSubButton>
          {currentLevelCategories.docs?.length > 0 && (
            <SidebarMenuSub>
              {currentLevelCategories.docs.map((item) => (
                <SidebarMenuSubItem key={item.slug}>
                  <SidebarMenuSubButton asChild>
                    <a href={`/search/${categories.slug}/${item.slug}`} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuSubItem>
      ) : (
        currentLevelCategories.docs?.map((item) => (
          <SidebarMenuSubItem key={item.slug}>
            <SidebarMenuSubButton asChild>
              <a href={`/search/${item.slug}`} className="font-medium">
                {item.title}
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))
      )}
    </SidebarMenuSub>
  )
}

export default NestedItem
