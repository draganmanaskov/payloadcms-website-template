import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'
import { getValidLocale } from './getValidLocale'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale = 'en') {
  const payload = await getPayloadHMR({ config: configPromise })
  const validLocale = getValidLocale(locale)
  const global = await payload.findGlobal({
    slug,
    depth,
    locale: validLocale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale = 'en') =>
  unstable_cache(async () => getGlobal(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}`],
  })
