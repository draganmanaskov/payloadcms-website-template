import { Product } from '@/payload-types'
import { cn } from '@/utilities'

type PriceProps = {
  amount: number
  className?: string
  currencyCode?: string
  locales?: string
  discount: Product['discount']
}

const Price = ({
  amount,
  className,
  currencyCode = 'MKD',
  locales = 'mk-MK',
  discount = null,
}: PriceProps & React.ComponentProps<'p'>) => {
  const validDiscount = discount && typeof discount === 'object' && discount.isActive

  let newAmount = amount
  if (validDiscount) {
    if (discount.discountType === 'percentage') {
      newAmount = amount - amount * (discount.value / 100)
    } else {
      newAmount = amount - discount.value
    }
  }

  const formattedNewAmount = newAmount.toLocaleString(locales, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  })

  const formattedOldAmount = amount.toLocaleString(locales, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  })
  return (
    <p className={cn(className, 'space-x-2')}>
      <span className="text-lg font-semibold ">{formattedNewAmount}</span>
      {validDiscount && (
        <span className="text-sm text-gray-500 line-through">{formattedOldAmount}</span>
      )}
    </p>
  )
}

export default Price

// let formatedAmount = new Intl.NumberFormat(undefined, {
//   style: 'currency',
//   currency: currencyCode,
//   currencyDisplay: 'narrowSymbol',
// }).format(parseFloat(`${amount}`))
