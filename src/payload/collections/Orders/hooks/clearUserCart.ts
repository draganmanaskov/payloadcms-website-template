import type { CollectionAfterChangeHook } from 'payload'

import type { Order } from '@/payload-types'

export const clearUserCart: CollectionAfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req
  const { email, items, total, customer } = doc
  if (operation === 'create' && items) {
    payload.sendEmail({
      to: email,
      from: 'dmanaskov@hotmail.com',
      subject: 'Order Confirmation',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50; text-align: center;">Thank you for your order!</h1>
        <p style="font-size: 16px;">Here is your order summary:</p>
        <ul style="list-style: none; padding: 0;">
          ${items
            .map((item) => {
              const productTitle = typeof item.product === 'number' ? item.sku : item.product.title
              const featuredImageUrl =
                typeof item.product !== 'number' && typeof item.product.featuredImage !== 'number'
                  ? item.product.featuredImage?.url
                  : ''
              const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${featuredImageUrl}`

              return `
              <li style="border-bottom: 1px solid #ccc; padding: 10px 0;">
                <div style="display: flex; align-items: center;">
                  ${featuredImageUrl ? `<img src="${url}" alt="${productTitle}" style="max-width: 80px; margin-right: 15px;" />` : ''}
                  <div>
                    <h2 style="margin: 0; font-size: 18px; color: #333;">${productTitle}</h2>
                    <p style="margin: 5px 0; color: #555;">Total: <strong>${item.total}</strong></p>
                  </div>
                </div>
              </li>
            `
            })
            .join('')}
        </ul>
        <p style="font-size: 18px; font-weight: bold;">Total Order Value: ${total}</p>
        <p style="color: #777; font-size: 14px;">Thank you for shopping with us!</p>
      </div>
    `,
    })
  }

  if (operation === 'create' && customer) {
    const orderedBy = typeof customer === 'object' ? customer.id : customer

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
