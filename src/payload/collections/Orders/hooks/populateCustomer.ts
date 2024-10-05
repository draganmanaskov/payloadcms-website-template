import { FieldHook } from 'payload'

import type { Order } from '@/payload-types'

export const pupulateCustomer: FieldHook<Order> = async ({ req, operation, value }) => {
  if (operation === 'create' && !value && req.user) {
    return req.user.id
  }

  return value
}
