export function getAddedValues(original: number[], updated: number[]): number[] {
  // Return only the values in 'updated' that are not in 'original'

  const addedValues = updated.filter((num) => !original.includes(num))
  return addedValues
}

export function mergeUnique(arr1: number[], arr2: number[]): number[] {
  return Array.from(new Set([...arr1, ...arr2]))
}
