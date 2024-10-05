export type Initializer<T> = {
  [K in keyof T]: T[K] extends number
    ? number
    : T[K] extends string
      ? string
      : T[K] extends boolean
        ? boolean
        : T[K] extends Array<any>
          ? any[]
          : T[K] extends object
            ? Initializer<T[K]>
            : any
}
function inferDefaultValue(value: any): any {
  if (typeof value === 'number') return 0
  if (typeof value === 'string') return ''
  if (typeof value === 'boolean') return false
  if (Array.isArray(value)) return []

  // Check if it's a union of string literals like "0%" | "5%" | "10%"
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'includes')
  ) {
    return value[0] // Return the first literal in the union
  }

  if (typeof value === 'object' && value !== null) return createInitialObject<typeof value>()
  return null // Fallback for unhandled types
}

export function createInitialObject<T>(): Initializer<T> {
  return new Proxy(
    {},
    {
      get: (target, prop: string) => {
        if (typeof prop === 'string') {
          return inferDefaultValue(({} as T)[prop as keyof T])
        }
        return target[prop]
      },
    },
  ) as Initializer<T>
}
