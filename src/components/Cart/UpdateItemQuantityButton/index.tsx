'use client'

import { Icons } from '@/components/icons'
import { CartItem } from '@/providers/Cart/reducer'
import { cn } from '@/utilities'

export function UpdateItemQuantityButton({
  item,
  type,
}: {
  item: CartItem
  type: 'plus' | 'minus'
}) {
  const payload = {
    id: item.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
  }

  return (
    <>
      <button
        type="submit"
        // onClick={() => mutation.mutate(payload)}
        aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
        // aria-disabled={mutation.isPending}
        className={cn(
          'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
          {
            'ml-auto': type === 'minus',
          },
        )}
      >
        {type === 'plus' ? (
          <Icons.PlusIcon className="h-4 w-4 dark:text-neutral-500" />
        ) : (
          <Icons.MinusIcon className="h-4 w-4 dark:text-neutral-500" />
        )}
      </button>
      {type === 'plus' ? (
        <p aria-live="polite" className="sr-only" role="status">
          Add 1
        </p>
      ) : (
        <p aria-live="polite" className="sr-only" role="status">
          Remove 1
        </p>
      )}
    </>
  )
}
