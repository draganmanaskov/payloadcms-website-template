import React from 'react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Input } from '@/components/ui/input'

import { CartItem } from '@/providers/Cart/reducer'

type UpdateQuantityProps = {
  item: CartItem
  addItemToCart: (item: CartItem) => void
  updateItemQuantity: (item: CartItem) => void
}

const UpdateQuantity = ({ item, updateItemQuantity }: UpdateQuantityProps) => {
  const handleUpdate = (item: CartItem, quantity: number) => {
    let updateItem = { ...item, quantity: quantity }
    updateItemQuantity(updateItem)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={item.quantity <= 1}
        onClick={() => handleUpdate(item, item.quantity - 1)}
      >
        <Icons.MinusIcon className="h-4 w-4" />

        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => handleUpdate(item, parseInt(e.target.value) || 1)}
        className="h-8 w-14 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdate(item, item.quantity + 1)}
      >
        <Icons.PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}

export default UpdateQuantity
