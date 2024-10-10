import type { FieldHook } from 'payload'

// export const formatSlug = (val: string): string =>
//   val
//     .replace(/ /g, '-')
//     .replace(/[^\wа-шА-ШѓЃќЌжЖљЉњЊѕЅ]+/g, '') // Allow Cyrillic letters
//     .toLowerCase()

export const formatSlug = (val: string): string =>
  val
    .toLowerCase() // Convert to lowercase first
    .replace(/[^\wа-шѓќжљњѕ\s-]+/gi, '') // Allow both Latin, Macedonian Cyrillic letters, spaces, and hyphens
    .trim() // Trim leading and trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
