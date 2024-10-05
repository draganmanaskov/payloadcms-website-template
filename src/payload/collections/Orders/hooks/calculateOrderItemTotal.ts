import { Order } from '@/payload-types'
import { FieldHook } from 'payload'

export const generateOrderItemTotal: FieldHook<Order> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    const updatedItems = await Promise.all(
      value.map(async (item, index) => {
        const product = await req.payload.findByID({
          id: typeof item.product === 'number' ? item.product : item.product.id,
          collection: 'products',
          depth: 0,
          req,
        })

        if (product) {
          item.price = product.price
          item.total = product.price * item.quantity
        }

        return item // Return the updated item to be collected by Promise.all
      }),
    )

    return updatedItems
  }
  return value
}
