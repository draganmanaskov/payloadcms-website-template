import type { CollectionAfterChangeHook } from 'payload'

import type { Order } from '@/payload-types'

export const clearUserCart: CollectionAfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req

  if (operation === 'create' && doc.customer) {
    const orderedBy = typeof doc.customer === 'object' ? doc.customer.id : doc.customer

    const user = await payload.findByID({
      collection: 'users',
      id: orderedBy,
      req: req,
    })

    if (user) {
      await payload.update({
        collection: 'users',
        id: orderedBy,
        req: req,
        data: {
          cart: {
            items: [],
          },
        },
      })
    }
  }

  return
}
