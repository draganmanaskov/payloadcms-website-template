import { FieldHook } from 'payload'
import { Product } from '@/payload-types'
import { getAddedValues, mergeUnique } from './utils'

export const populateParentDesigns: FieldHook<Product> = async ({
  originalDoc,

  value,
  req,
}) => {
  if (!originalDoc) return value

  let designIds = originalDoc.designs?.map((design) => {
    if (typeof design === 'number') return design

    return design.id
  })
  let newDesigns = getAddedValues(designIds || [], value || [])

  if (newDesigns.length > 0 && value.length > 0) {
    let designs = await req.payload.find({
      collection: 'designs',
      where: {
        id: {
          in: newDesigns,
        },
      },
      depth: 1,
    })

    let newDesignsIds: number[] = []
    designs.docs.forEach((design) => {
      design.breadcrumbs?.forEach((breadcrumb) => {
        if (typeof breadcrumb.doc === 'number') {
          newDesignsIds.push(breadcrumb.doc)
        }
      })
    })

    return mergeUnique(value, newDesignsIds)
  }

  return value
}
