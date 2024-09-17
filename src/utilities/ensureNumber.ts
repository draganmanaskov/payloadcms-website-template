export function ensureNumber(input: string): number {
  const num = parseFloat(input)
  return isNaN(num) ? 1 : num
}
