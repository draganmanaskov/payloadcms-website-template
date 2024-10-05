import type { CartItems, Product, User } from '@/payload-types'

export type CartItem = NonNullable<CartItems>[number]

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'UPDATE_QUANTITY'
      payload: CartItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: CartItem
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      // Combine items from the local cart and user cart without duplicates
      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        const productId = typeof item.product === 'number' ? item.product : item?.product?.id

        const indexInAcc = acc.findIndex(({ product, sku }) =>
          typeof product === 'number'
            ? product === productId && sku === item.sku
            : product?.id === productId && sku === item.sku,
        )

        if (indexInAcc > -1) {
          // Optionally handle how to merge quantities or other item properties
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // You can customize this logic to merge the quantity if needed
            quantity: acc[indexInAcc].quantity + item.quantity,
          }
        } else {
          acc.push(item)
        }

        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      const incomingItem = action.payload as CartItem // Explicitly cast the payload as a CartItem

      // Ensure incomingItem is defined before proceeding
      if (!incomingItem || !('product' in incomingItem)) return cart

      const productId =
        typeof incomingItem.product === 'number' ? incomingItem.product : incomingItem?.product?.id

      const indexInCart = cart?.items?.findIndex(
        ({ product, sku }) =>
          (typeof product === 'number' ? product === productId : product?.id === productId) &&
          sku === incomingItem.sku,
      )

      let withAddedItem = [...(cart?.items || [])]

      // Add the item to the cart if it doesn't exist
      if (indexInCart === -1) {
        withAddedItem.push(incomingItem)
      }

      // Update the quantity if the item already exists
      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: (incomingItem.quantity || 0) > 0 ? incomingItem.quantity : 0,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'UPDATE_QUANTITY': {
      // const { payload } = action
      const { payload: incomingItem } = action
      const currentCart = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ product, sku }) =>
        typeof incomingItem.product === 'number'
          ? product === incomingItem.product && sku === incomingItem.sku
          : typeof product !== 'number' &&
            product?.id === incomingItem.product?.id &&
            sku === incomingItem.sku,
      )

      if (typeof indexInCart === 'number' && currentCart.items && indexInCart > -1) {
        currentCart.items[indexInCart].quantity = incomingItem.quantity
      }

      return currentCart
    }

    case 'DELETE_ITEM': {
      const { payload: incomingItem } = action
      const { product: incomingProduct, sku: incomingSku } = incomingItem
      const withDeletedItem = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ product, sku }) =>
        typeof incomingProduct === 'number'
          ? product === incomingProduct && sku === incomingSku
          : typeof product !== 'number' &&
            product?.id === incomingProduct?.id &&
            sku === incomingSku,
      )

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}

// const syncedItems: CartItem[] = [
//   ...(cart?.items || []),
//   ...(incomingCart?.items || []),
// ].reduce((acc: CartItem[], item) => {
//   // remove duplicates
//   const productId = typeof item.product === 'number' ? item.product : item?.product?.id

//   const indexInAcc = acc.findIndex(({ product }) =>
//     typeof product === 'number' ? product === productId : product?.id === productId,
//   ) // eslint-disable-line function-paren-newline

//   if (indexInAcc > -1) {
//     acc[indexInAcc] = {
//       ...acc[indexInAcc],
//       // customize the merge logic here, e.g.:
//       // quantity: acc[indexInAcc].quantity + item.quantity
//     }
//   } else {
//     acc.push(item)
//   }
//   return acc
// }, [])

// return {
//   ...cart,
//   items: syncedItems,
// }

// case 'ADD_ITEM': {
//   // if the item is already in the cart, increase the quantity
//   const { payload: incomingItem } = action

//   if (!incomingItem) return cart

//   const productId =
//     typeof incomingItem.product === 'number' ? incomingItem.product : incomingItem?.product?.id

//   const indexInCart = cart?.items?.findIndex(({ product }) =>
//     typeof product === 'number' ? product === productId : product?.id === productId,
//   ) // eslint-disable-line function-paren-newline

//   let withAddedItem = [...(cart?.items || [])]

//   if (
//     indexInCart === -1 ||
//     (typeof indexInCart === 'number' && withAddedItem[indexInCart].sku !== incomingItem.sku)
//   ) {
//     withAddedItem.push(incomingItem)
//   }

//   // if (typeof indexInCart === 'number' && indexInCart > -1) {
//   //   withAddedItem[indexInCart] = {
//   //     ...withAddedItem[indexInCart],
//   //     quantity: (incomingItem.quantity || 0) > 0 ? incomingItem.quantity : 0,
//   //   }
//   // }
//   if (
//     indexInCart === -1 ||
//     (typeof indexInCart === 'number' && withAddedItem[indexInCart].sku !== incomingItem.sku)
//   ) {
//     withAddedItem.push(incomingItem)
//   }

//   return {
//     ...cart,
//     items: withAddedItem,
//   }
// }

// case 'MERGE_CART': {
//   const { payload: incomingCart } = action

//   const syncedItems: CartItem[] = [
//     ...(cart?.items || []),
//     ...(incomingCart?.items || []),
//   ].reduce((acc: CartItem[], item) => {
//     const productId = typeof item.product === 'number' ? item.product : item?.product?.id
//     const sku = item.sku

//     const indexInAcc = acc.findIndex(
//       ({ product, sku: existingSku }) =>
//         (typeof product === 'number' ? product === productId : product?.id === productId) &&
//         sku === existingSku, // Check SKU as well
//     )

//     if (indexInAcc > -1) {
//       acc[indexInAcc] = {
//         ...acc[indexInAcc],
//         // Customize the merge logic here
//         // e.g. quantity: acc[indexInAcc].quantity + item.quantity
//       }
//     } else {
//       acc.push(item)
//     }
//     return acc
//   }, [])
// }