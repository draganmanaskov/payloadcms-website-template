import { ClientCollectionConfig } from 'payload'
import Link from 'next/link'
import { cn } from '@/utilities'
import { buttonVariants } from '@/components/ui/button'
import { CollectionGroup } from './utils'

type NavGroupProps = {
  collectionGroup: CollectionGroup
  closeNav: () => void
}

const NavGroup = ({ collectionGroup, closeNav }: NavGroupProps) => {
  return (
    <>
      {collectionGroup.collections.map((collection, index) => {
        return (
          <Link
            // onClick={closeNav}
            href={`/admin/collections/${collection.slug}`}
            key={`${collection.slug}-${index}`}
            className={cn(
              buttonVariants({ variant: 'ghost', className: 'justify-start w-full' }),
              'text-lg',
            )}
            style={{ textDecoration: 'none', padding: '0 1rem' }}
          >
            {typeof collection?.labels.plural === 'string' ? collection.labels.plural : ''}
          </Link>
        )
      })}
    </>
  )
}

export default NavGroup
