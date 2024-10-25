import { ClientCollectionConfig } from 'payload'
import Link from 'next/link'
import { cn } from '@/utilities'
import { buttonVariants } from '@/components/ui/button'
import { CollectionGroup } from './utils'

type NavGroupProps = {
  collectionGroup: CollectionGroup
}

const NavGroup = ({ collectionGroup }: NavGroupProps) => {
  return (
    <>
      {collectionGroup.collections.map((collection, index) => {
        return (
          <Link
            href={`/admin/collections/${collection.slug}`}
            key={`${collection.slug}-${index}`}
            className={cn(
              buttonVariants({ variant: 'ghost', className: 'justify-start w-full' }),
              'text-lg',
            )}
            style={{ textDecoration: 'none', padding: '0 1rem' }}
          >
            {/* Optional icon */}
            {/* {collection.icon && <collection.icon className="mr-2 h-5 w-5" />} */}

            {typeof collection?.labels.plural === 'string' ? collection.labels.plural : ''}
          </Link>
        )
      })}
    </>
  )
}

export default NavGroup
