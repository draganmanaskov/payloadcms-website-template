import { admins } from '@/access/admins'
import type { CollectionConfig } from 'payload'
import { updateProductsDiscounts } from './hooks/updateProductsDiscounts'

const Discounts: CollectionConfig = {
  slug: 'discounts',
  labels: {
    singular: 'Discount',
    plural: 'Discounts',
  },
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },
  //   hooks: {
  //     afterDelete: [
  //       async ({ id, context, req, doc }) => {
  //         if (context.hasUpdatedDiscountsAfterChange) return
  //         context.hasUpdatedDiscountsAfterChange = true

  //         const productIDs = doc.eligibleProducts.map(({ id }) => id)

  //         await updateProductsDiscounts({
  //           req,
  //           productsAddingDiscount: [],
  //           productsRemovingDiscount: productIDs,
  //           discountID: id,
  //           context,
  //         })
  //       },
  //     ],
  //   },
  admin: {
    useAsTitle: 'name',
    description: 'Manage discount codes and rules for your store.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'discountType',
      type: 'select',
      required: true,
      options: [
        { label: 'Percentage', value: 'percentage' },
        { label: 'Fixed Amount', value: 'fixed' },
        { label: 'Free Shipping', value: 'free_shipping' },
      ],
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      admin: {
        description:
          'For percentage, enter as a whole number (e.g., "10" for 10%). For fixed, enter the amount (e.g., 5 for $5 off).',
      },
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Enter the discount code that customers will use at checkout.',
      },
    },
    {
      name: 'usageLimit',
      type: 'number',
      admin: {
        description: 'Optional. Limit on the number of times this discount can be used.',
      },
    },
    {
      name: 'eligibleProducts',
      type: 'relationship',
      relationTo: 'products',

      hasMany: true,
      hooks: {
        afterChange: [
          async ({ value = [], previousValue = [], context, req, originalDoc, siblingData }) => {
            if (
              context.hasUpdatedProductsAfterChange ||
              (value.length === 0 && previousValue.length === 0)
            )
              return
            context.hasUpdatedDiscountsAfterChange = true
            context.value = siblingData.value
            context.discountType = siblingData.discountType
            const productIDsAddingDiscount = value.reduce((ids, product) => {
              if (!previousValue.includes(product)) {
                ids.push(product)
              }
              return ids
            }, [])

            const productIDsRemovingDiscount = previousValue.reduce((ids, product) => {
              if (!value.includes(product)) {
                ids.push(product)
              }
              return ids
            }, [])

            await updateProductsDiscounts({
              req,
              productIDsAddingDiscount,
              productIDsRemovingDiscount,
              discountID: originalDoc.id,
              context,
              value,
            })
          },
        ],
      },
      admin: {
        description: 'Optional. Select products eligible for this discount.',
      },
    },
    {
      name: 'minimumPurchase',
      type: 'number',
      admin: {
        description: 'Optional. Minimum cart total required to use this discount.',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Discounts
