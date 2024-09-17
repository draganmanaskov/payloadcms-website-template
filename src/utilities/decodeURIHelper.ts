export function decodeURIHelper(component: string) {
  return decodeURIComponent(component || 'All')
    .split('&')
    .filter(Boolean)
}
