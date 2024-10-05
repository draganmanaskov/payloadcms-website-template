export function decodeURIHelper(component: string | undefined) {
  return component ? decodeURIComponent(component).split('&').filter(Boolean) : []
}
