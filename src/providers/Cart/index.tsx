'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

import { Inventory, Product, User } from '@/payload-types'
import { useAuth } from '../Auth'
import { CartItem, cartReducer } from './reducer'

export type CartContext = {
  cart: User['cart']
  addItemToCart: (incomingItem: CartItem) => void
  updateItemQuantity: (incomingItem: CartItem) => void
  deleteItemFromCart: (incomingItem: CartItem) => void
  cartIsEmpty: boolean | undefined
  clearCart: () => void
  isProductInCart: (
    product: Product,
    incomingInventoryItem: NonNullable<Inventory['skus']>[number],
  ) => boolean
  cartTotal: {
    formatted: string
    raw: number
  }
  hasInitializedCart: boolean
}

const Context = createContext({} as CartContext)

export const useCart = () => useContext(Context)

const arrayHasItems = (array) => Array.isArray(array) && array.length > 0

/**
 * ensure that cart items are fully populated, filter out any items that are not
 * this will prevent discontinued products from appearing in the cart
 */
const flattenCart = (cart: User['cart']): User['cart'] => ({
  ...cart,
  items:
    cart && cart.items
      ? (cart.items
          .map((item) => {
            if (!item?.product || typeof item?.product !== 'object') {
              return null
            }

            return {
              ...item,
              // flatten relationship to product
              product: item?.product?.id,
              quantity: typeof item?.quantity === 'number' ? item?.quantity : 0,
            }
          })
          .filter(Boolean) as CartItem[])
      : [],
})

// Step 1: Check local storage for a cart
// Step 2: If there is a cart, fetch the products and hydrate the cart
// Step 3: Authenticate the user
// Step 4: If the user is authenticated, merge the user's cart with the local cart
// Step 4B: Sync the cart to Payload and clear local storage
// Step 5: If the user is logged out, sync the cart to local storage only

export const CartProvider = (props) => {
  // const { setTimedNotification } = useNotifications();
  const { children } = props
  const { user, status: authStatus } = useAuth()

  const [cart, dispatchCart] = useReducer(cartReducer, {})

  const [total, setTotal] = useState<{
    formatted: string
    raw: number
  }>({
    formatted: '0.00',
    raw: 0,
  })

  const hasInitialized = useRef(false)
  const [hasInitializedCart, setHasInitialized] = useState(false)

  // Check local storage for a cart
  // If there is a cart, fetch the products and hydrate the cart
  useEffect(() => {
    if (user === undefined) return
    if (!hasInitialized.current) {
      hasInitialized.current = true

      const syncCartFromLocalStorage = async () => {
        const localCart = localStorage.getItem('cart')
        const parsedCart = JSON.parse(localCart || '{}')

        // Ensure we don't overwrite the cart with an empty object or undefined values
        if (parsedCart?.items && parsedCart.items.length > 0) {
          const initialCart = await Promise.all(
            parsedCart.items.map(async ({ product, quantity, sku }) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${product}`,
              )
              const data = await res.json()
              return {
                product: data,
                quantity,
                sku,
              }
            }),
          )

          dispatchCart({
            type: 'SET_CART',
            payload: {
              items: initialCart,
            },
          })
        } else {
          dispatchCart({
            type: 'SET_CART',
            payload: {
              items: [],
            },
          })
        }
      }

      syncCartFromLocalStorage()
    }
  }, [user])

  // authenticate the user and if logged in, merge the user's cart with local state
  // only do this after we have initialized the cart to ensure we don't lose any items
  useEffect(() => {
    if (!hasInitialized.current) return

    if (authStatus === 'loggedIn') {
      // merge the user's cart with the local state upon logging in
      dispatchCart({
        type: 'MERGE_CART',
        payload: user?.cart,
      })
    }

    if (authStatus === 'loggedOut') {
      // clear the cart from local state after logging out
      dispatchCart({
        type: 'CLEAR_CART',
      })
    }
  }, [user, authStatus])

  // every time the cart changes, determine whether to save to local storage or Payload based on authentication status
  // upon logging in, merge and sync the existing local cart to Payload
  useEffect(() => {
    if (!hasInitialized.current || user === undefined || !cart?.items) return

    const flattenedCart = flattenCart(cart)

    if (user) {
      if (
        JSON.stringify(flattenCart(user.cart)) === JSON.stringify(flattenedCart) &&
        !hasInitializedCart
      ) {
        setHasInitialized(true)
        return
      }

      try {
        const syncCartToPayload = async () => {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
              cart: flattenedCart,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (req.ok) {
            localStorage.setItem('cart', '[]') // Clear local storage when cart is synced with backend
          }
        }

        syncCartToPayload()
      } catch (e) {
        console.error('Error while syncing cart to Payload.')
      }
    } else {
      // If user is not logged in, persist cart in local storage
      localStorage.setItem('cart', JSON.stringify(flattenedCart))
    }

    setHasInitialized(true)
  }, [user, cart, hasInitializedCart])

  const isProductInCart = useCallback(
    (
      incomingProduct: Product,
      incomingInventoryItem: NonNullable<Inventory['skus']>[number],
    ): boolean => {
      let isInCart = false
      const { items: itemsInCart } = cart || {}
      if (Array.isArray(itemsInCart) && itemsInCart.length > 0) {
        isInCart = Boolean(
          itemsInCart.find(({ product, sku }) =>
            typeof product === 'number'
              ? product === incomingProduct.id && sku === incomingInventoryItem.sku
              : product?.id === incomingProduct.id && sku === incomingInventoryItem.sku,
          ), // eslint-disable-line function-paren-newline
        )
      }
      return isInCart
    },
    [cart],
  )

  // this method can be used to add new items AND update existing ones
  const addItemToCart = useCallback((incomingItem) => {
    dispatchCart({
      type: 'ADD_ITEM',
      payload: incomingItem,
    })
  }, [])

  const updateItemQuantity = useCallback((incomingItem) => {
    dispatchCart({
      type: 'UPDATE_QUANTITY',
      payload: incomingItem,
    })
  }, [])

  const deleteItemFromCart = useCallback((incomingItem: CartItem) => {
    dispatchCart({
      type: 'DELETE_ITEM',
      payload: incomingItem,
    })
  }, [])

  const clearCart = useCallback(() => {
    dispatchCart({
      type: 'CLEAR_CART',
    })
  }, [])

  // calculate the new cart total whenever the cart changes
  useEffect(() => {
    if (!hasInitialized) return

    const newTotal =
      cart?.items?.reduce((acc, item) => {
        let price = 0
        if (typeof item.product === 'object') {
          price = item.product.discountedPrice * item.quantity
        }
        return acc + price
      }, 0) || 0

    setTotal({
      formatted: (newTotal / 100).toLocaleString('mk-MK', {
        style: 'currency',
        currency: 'MKD',
      }),
      raw: newTotal,
    })
  }, [cart, hasInitialized])

  return (
    <Context.Provider
      value={{
        cart,
        addItemToCart,
        updateItemQuantity,
        deleteItemFromCart,
        cartIsEmpty: hasInitializedCart && !arrayHasItems(cart?.items),
        clearCart,
        isProductInCart,
        cartTotal: total,
        hasInitializedCart,
      }}
    >
      {children && children}
    </Context.Provider>
  )
}

// useEffect(() => {
//   // wait until we have attempted authentication (the user is either an object or `null`)
//   if (!hasInitialized.current || user === undefined || !cart?.items) return

//   const flattenedCart = flattenCart(cart)

//   if (user) {
//     // prevent updating the cart when the cart hasn't changed
//     if (JSON.stringify(flattenCart(user.cart)) === JSON.stringify(flattenedCart)) {
//       setHasInitialized(true)
//       return
//     }

//     try {
//       const syncCartToPayload = async () => {
//
//         const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
//           // Make sure to include cookies with fetch
//           credentials: 'include',
//           method: 'PATCH',
//           body: JSON.stringify({
//             cart: flattenedCart,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//
//         if (req.ok) {
//           localStorage.setItem('cart', '[]')
//         }
//       }

//       syncCartToPayload()
//     } catch (e) {
//       console.error('Error while syncing cart to Payload.') // eslint-disable-line no-console
//     }
//   } else {
//     localStorage.setItem('cart', JSON.stringify(flattenedCart))
//   }

//   setHasInitialized(true)
// }, [user, cart])
