import { User } from '@/payload-types'
import { ClientCollectionConfig, ClientGlobalConfig } from 'payload'
import { Image, Package, Settings } from 'lucide-react'

export const filterAllowedToView = <T extends { slug: string }>(
  items: T[],
  user: User,
  type: 'collections' | 'globals',
): T[] => {
  return items.filter((item) => {
    if (user.roles?.includes('admin')) return true

    if (user.roles?.includes('customer') && item.slug) {
      return ROLES_VIEW_PERMISSIONS.customer[type].includes(item.slug)
    }

    return false
  })
}

export const populateCollectionGroups = (allowedCollections: ClientCollectionConfig[]) => {
  // Create a copy of COLLECTION_GROUPS to avoid mutating the original
  const populatedGroups = COLLECTION_GROUPS.map((group) => ({
    ...group,
  }))
  // Iterate over each allowed collection
  allowedCollections.forEach((collection) => {
    // Iterate over each group to check if the current collection's slug matches any in collectionSlugs
    populatedGroups.forEach((group) => {
      if (group.collectionSlugs.includes(collection.slug)) {
        // Avoid duplicates by checking if the collection is already in the group's collections array
        if (
          !group.collections.some(
            (existingCollection) => existingCollection.slug === collection.slug,
          )
        ) {
          group.collections.push(collection)
        }
      }
    })
  })

  return populatedGroups
}

export type Group = {
  name: string
  label: string
  type: 'default' | 'colapasable'
  icon?: any
}

export type CollectionGroup = Group & {
  collectionSlugs: string[]
  collections: ClientCollectionConfig[]
}

export const COLLECTION_GROUPS: CollectionGroup[] = [
  {
    name: 'default',
    label: '',
    type: 'default',
    collectionSlugs: ['pages', 'posts', 'orders', 'products', 'categories', 'designs', 'discounts'],
    collections: [],
  },
  {
    name: 'media',
    label: 'Media',
    type: 'colapasable',
    collectionSlugs: ['media', 'tags'],
    collections: [],
    icon: Image,
  },
  {
    name: 'inventory',
    label: 'Inventory',
    type: 'colapasable',
    collectionSlugs: ['inventories', 'colors', 'sizes'],
    collections: [],
    icon: Package,
  },
  {
    name: 'system',
    label: 'System',
    type: 'colapasable',
    collectionSlugs: ['users', 'redirects', 'forms', 'form-submissions'],
    collections: [],
    icon: Settings,
  },
]

type RoleViewPermissionsProps = {
  [key: string]: {
    collections: string[]
    globals: string[]
  }
}

export const ROLES_VIEW_PERMISSIONS: RoleViewPermissionsProps = {
  customer: {
    collections: ['orders'],
    globals: [],
  },
  admin: {
    collections: [
      'pages',
      'posts',
      'media',
      'categories',
      'users',
      'products',
      'inventories',
      'discounts',
      'designs',
      'orders',
      'tags',
      'colors',
      'sizes',
      'redirects',
      'forms',
      'form-submissions',
    ],
    globals: ['header', 'footer', 'filter'],
  },
}
