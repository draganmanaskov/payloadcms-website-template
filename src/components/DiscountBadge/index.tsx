import { Product } from '@/payload-types'
import { cn } from '@/utilities'
import { Tag, Percent } from 'lucide-react'

interface DiscountProps {
  discount: Product['discount']
}

// const DiscountBadge = ({ discount }) => {
//   if (!discount) return null

//   return (
//     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-50">
//       {discount}% OFF
//     </span>
//   )
// }

const DiscountBadge: React.FC<DiscountProps> = ({ discount }) => {
  if (!discount) return null
  if (typeof discount === 'number') return null
  return (
    <>
      {discount.isActive && (
        <div
          className={cn(
            'absolute top-2 left-2  z-50  bg-blue-500 text-white py-1 px-3 rounded-r-full font-bold shadow-md flex items-center',
          )}
        >
          <Tag className="w-4 h-4 mr-1" />
          <span>{discount.value}</span>
          <span>{discount.discountType === 'percentage' ? '%' : '$'}</span>
          <span className="ml-1">Sale</span>
        </div>
      )}
    </>
  )
}

export default DiscountBadge
