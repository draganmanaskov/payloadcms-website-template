export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str // return empty string if input is empty
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
