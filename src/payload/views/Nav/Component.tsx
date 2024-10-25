'use client'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { User } from '@/payload-types'
import { cn } from '@/utilities'
import { Button, useConfig, useNav } from '@payloadcms/ui'

import './index.scss'
import NavGroup from './NavGroup'

import { Collapsible } from '@payloadcms/ui'
import { filterAllowedToView, populateCollectionGroups } from './utils'
import Link from 'next/link'

type NavClientComponentProps = {
  user: User
}
const baseClass = 'nav'

const NavClientComponent = ({ user }: NavClientComponentProps) => {
  const { config, getEntityConfig } = useConfig()
  const { admin, collections, globals } = config

  const { navOpen, navRef, setNavOpen } = useNav()

  const allowedCollections = filterAllowedToView(collections, user, 'collections')
  const allowedGlobals = filterAllowedToView(globals, user, 'globals')

  const populatedCollectionGroups = populateCollectionGroups(allowedCollections)

  return (
    <aside className={cn(baseClass, 'p-4', navOpen && `${baseClass}--nav-open`)}>
      <div className="flex items-center justify-between md:justify-end px-4">
        <Button
          onClick={() => setNavOpen(false)}
          className={cn(buttonVariants({ size: 'icon', variant: 'outline' }), 'md:hidden')}
        >
          {navOpen ? <Icons.X /> : null}
        </Button>
        <Link href={'/'} className={cn(buttonVariants({ variant: 'ghost', className: 'text-lg' }))}>
          <Icons.ChevronsLeft className="h-6 w-6" />
          Back to Store
        </Link>
      </div>
      <div className={`${baseClass}__scroll `} ref={navRef}>
        <nav className={cn(`${baseClass}__wrap w-full max-w-96 gap-2`)}>
          {populatedCollectionGroups.map((collectionGroup) => {
            if (collectionGroup.type === 'default') {
              return (
                <div className="w-full" key={collectionGroup.name}>
                  <NavGroup collectionGroup={collectionGroup} />
                </div>
              )
            }
            return (
              <Collapsible
                key={collectionGroup.name}
                className="w-full shadow-none text-lg "
                header={
                  <div className="flex items-center  ">
                    <collectionGroup.icon className="mr-2 h-6 w-6 " />
                    {collectionGroup.label}
                  </div>
                }
              >
                <NavGroup collectionGroup={collectionGroup} />
              </Collapsible>
            )
          })}
          <Collapsible
            key={'GLobals'}
            className="w-full shadow-none text-lg "
            header={
              <div className="flex items-center">
                <Icons.Globe className="mr-2 h-6 w-6 " />
                Globals
              </div>
            }
          >
            {allowedGlobals.map((global, index) => {
              return (
                <Link
                  href={`/admin/globals/${global.slug}`}
                  key={`${global.slug}-${index}`}
                  className={cn(
                    buttonVariants({ variant: 'ghost', className: 'justify-start w-full' }),
                    'text-lg',
                  )}
                  style={{ textDecoration: 'none', padding: '0 1rem' }}
                >
                  {/* Optional icon */}
                  {/* {collection.icon && <collection.icon className="mr-2 h-5 w-5" />} */}

                  {typeof global?.label === 'string' ? global.label : ''}
                </Link>
              )
            })}
          </Collapsible>
        </nav>
      </div>
    </aside>
  )
}
export default NavClientComponent
