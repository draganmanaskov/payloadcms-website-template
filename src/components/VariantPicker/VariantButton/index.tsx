import { Inventory } from '@/payload-types'
import { cn } from '@/utilities'
import { OptionValue } from '..'

export type RelationToTypeInventory = NonNullable<Inventory['options']>[number]['relationTo']

type VariantButtonProps = {
  optionName: RelationToTypeInventory
  optionValue: OptionValue
  isActive: boolean
  handleEventClick: (key: string, name: string, isActive: boolean) => void
  isAvailableForSale: boolean
}

const VariantButton = ({
  optionName,
  optionValue,
  isActive,
  handleEventClick,
  isAvailableForSale,
}: VariantButtonProps) => {
  const { id, title, value, code } = optionValue

  const colorsClass = 'h-12 w-12 rounded-full transition-colors shadow-lg ring-offset-2'
  const otherClass =
    'rounded-md px-4 py-2 text-sm font-medium transition-colors dark:text-neutral-200 border-2 '

  return (
    <button
      aria-disabled={!isAvailableForSale}
      disabled={!isAvailableForSale}
      onClick={() => handleEventClick(optionName.toLowerCase(), code, isActive)}
      title={`${optionName} ${title}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
      className={cn('', optionName === 'colors' ? colorsClass : otherClass, {
        'ring-2 ring-primary': isActive,
        ' text-gray-700 transition duration-300 ease-in-out hover:ring-2 hover:ring-primary':
          !isActive && isAvailableForSale,
        'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400  before:dark:bg-neutral-700':
          !isAvailableForSale,
      })}
      style={{
        backgroundColor: optionName == 'colors' ? value : '',
        filter: !isAvailableForSale && optionName === 'colors' ? 'grayscale(70%)' : 'none',
      }}
    >
      {optionName !== 'colors' ? code.toUpperCase() : null}
    </button>
  )
}

export default VariantButton
