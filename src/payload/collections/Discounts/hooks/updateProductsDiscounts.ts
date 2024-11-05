export const updateProductsDiscounts = async ({
  req,
  context,
  productIDsAddingDiscount,
  productIDsRemovingDiscount,
  discountID,
  value,
}) => {
  let idsArray = productIDsAddingDiscount.concat(productIDsRemovingDiscount)

  const { docs: productsToUpdate } = await req.payload.find({
    collection: 'products',
    pagination: false,
    depth: 0,
    req,
    where: {
      id: { in: idsArray.length > 0 ? idsArray : value },
    },
  })

  const promises = productsToUpdate.map((product) => {
    let discount = product.discount

    if (productIDsAddingDiscount.length > 0 && productIDsAddingDiscount.includes(product.id)) {
      discount = discountID
    } else if (value.includes(product.id)) {
      discount = discountID
    } else {
      discount = null
    }

    if (productIDsAddingDiscount)
      return req.payload.update({
        req,
        collection: 'products',
        id: product.id,
        context,
        data: {
          discount: discount,
        },
      })
  })

  await Promise.all(promises)
}
