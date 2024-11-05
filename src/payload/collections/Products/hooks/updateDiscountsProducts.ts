export const updateDiscountsProducts = async ({
  req,
  context,
  discountIDsAddedToProducts,
  discountIDsRemovingFromProducts,
  productID,
}) => {
  const { docs: discountsToUpdate } = await req.payload.find({
    collection: 'discounts',
    pagination: false,
    depth: 0,
    req,
    where: {
      id: { in: discountIDsAddedToProducts.concat(discountIDsRemovingFromProducts) },
    },
  })

  const promises = discountsToUpdate.map((discount) => {
    let products = discount.products || []

    if (discountIDsAddedToProducts.includes(discount.id)) {
      products = products.concat(productID)
    } else {
      products = products.filter((id) => id !== productID)
    }

    return req.payload.update({
      req,
      collection: 'discounts',
      id: discount.id,
      context,
      data: {
        eligibleProducts: products,
      },
    })
  })

  await Promise.all(promises)
}
