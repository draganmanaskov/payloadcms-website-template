import { Config } from '@/payload-types'

export function getValidLocale(locale: string): Config['locale'] {
  const allowedLocales: Config['locale'][] = ['en', 'mk']

  // If the passed locale is one of the allowed values, return it; otherwise, return "en"
  return allowedLocales.includes(locale as Config['locale']) ? (locale as Config['locale']) : 'en'
}
