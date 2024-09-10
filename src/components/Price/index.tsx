import { cn } from '@/utilities'

const Price = ({
  amount,
  className,
  currencyCode = 'MKD',
  locales = 'mk-MK',
}: {
  amount: number
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
  locales?: string
} & React.ComponentProps<'p'>) => {
  let formatedAmount = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(parseFloat(`${amount}`))

  let locals = amount.toLocaleString(locales, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  })
  return <p className={cn(className)}>{locals}</p>
}

export default Price
