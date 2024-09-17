'use client'

import { Icons } from '../../icons'
import { cn } from '@/utilities'

import { Button } from '../../ui/button'
import { Product, User } from '@/payload-types'
import { CartItem } from '@/providers/Cart/reducer'

type DeleteItemButtonProps = {
  item: CartItem
  deleteItemFromCart: (item: CartItem) => void
}

export function DeleteItemFromCartButton({ item, deleteItemFromCart }: DeleteItemButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-0 top-0 h-5 w-5 rounded-full bg-background/80 backdrop-blur-sm',
        // {
        //   "cursor-not-allowed px-0": isPending,
        // },
      )}
      onClick={() => {
        deleteItemFromCart(item)
      }}
      //   onClick={() => mutate()}
      aria-label="Remove cart item"
      //   aria-disabled={isPending}
    >
      {/* {isPending ? (
        <Icons.spinner className=" h-3 w-3 animate-spin" />
      ) : (
        <Icons.X className="h-3 w-3" />
      )} */}
      <Icons.X className="h-3 w-3" />
    </Button>
  )
}
