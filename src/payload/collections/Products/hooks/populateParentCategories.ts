import { FieldHook } from 'payload'
import { Product } from '@/payload-types'
import { getAddedValues, mergeUnique } from './utils'

export const populateParentCategories: FieldHook<Product> = async ({ originalDoc, value, req }) => {
  if (!originalDoc) return value

  let categoryIds = originalDoc.categories?.map((category) => {
    if (typeof category === 'number') return category

    return category.id
  })

  let newCategories = getAddedValues(categoryIds || [], value || [])

  if (newCategories.length > 0 && value.length > 0) {
    let designs = await req.payload.find({
      collection: 'categories',
      where: {
        id: {
          in: newCategories,
        },
      },
      depth: 1,
    })

    let newCategoriesIds: number[] = []
    designs.docs.forEach((design) => {
      design.breadcrumbs?.forEach((breadcrumb) => {
        if (typeof breadcrumb.doc === 'number') {
          newCategoriesIds.push(breadcrumb.doc)
        }
      })
    })

    return mergeUnique(value, newCategoriesIds)
  }

  return value
}
