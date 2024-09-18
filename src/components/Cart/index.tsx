'use client'

import { Icons } from '../icons'
import { useCart } from '@/providers/Cart'
import CartModalDrawer from './cart-modal-drawer'

type CartProps = {
  type: 'header' | 'product'
}

const Cart = ({ type = 'header' }: CartProps) => {
  const { cart, deleteItemFromCart, addItemToCart, updateItemQuantity } = useCart()

  return (
    <>
      {cart ? (
        <CartModalDrawer
          cart={cart}
          deleteItemFromCart={deleteItemFromCart}
          addItemToCart={addItemToCart}
          updateItemQuantity={updateItemQuantity}
          type={type}
        />
      ) : (
        <Icons.ShoppingCart className="h-[1.2rem] w-[1.2rem] text-gray-500" />
      )}
    </>
  )
}

export default Cart
