export const generatePreviewPath = ({ path }) => `/next/preview?path=${encodeURIComponent(path)}`

// export const generatePreviewPathMk = ({ path, slug }) => {
//   const decodedPath = decodeURIComponent(path)
//   return `/next/preview?path=${encodeURIComponent(decodedPath)}${slug}`
// }

export const generatePreviewPathMk = ({ path }) => {
  console.log('Original Path:', path) // Debugging line
  const normalizedPath = path
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase() // Convert to lowercase if needed

  // Use encodeURIComponent to safely encode the path
  const encodedPath = encodeURIComponent(normalizedPath)
  console.log('Encoded Path:', encodedPath) // Debugging line

  return `/next/preview?path=${encodedPath}`
}
