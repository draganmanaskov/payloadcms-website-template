export function formatSKUString(variantString: string): string {
  // Split the input string by the hyphen
  const parts = variantString.split('-')

  // Check if there are enough parts to exclude the first part
  if (parts.length < 2) {
    throw new Error('Invalid format')
  }

  // Remove the first part, which is always the identifier (e.g., S0002)
  parts.shift()

  // Create mappings for known codes to human-readable names
  const mappings: { [key: string]: string } = {
    WHI: 'White',
    BLA: 'Black',
    RED: 'Red',
    BLU: 'Blue',
    MED: 'M',
    LRG: 'L',
    SMA: 'S',
    XL: 'XL',
    // Add other mappings as needed
  }

  // Convert each part using the mappings, or leave as is if not found
  const formattedParts = parts.map((part) => mappings[part] || part)

  // Combine the formatted parts into the desired format
  const formattedString = formattedParts.join('/')

  return formattedString
}
