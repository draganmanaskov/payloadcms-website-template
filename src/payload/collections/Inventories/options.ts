export type OptionItem = {
  label: string
  value: string
  code: string
}

type PayloadOptionItem = {
  label: string
  value: string
}

export type ColorItem = OptionItem & {
  extra: string
}

export type SizeItem = OptionItem & {}

export let filterColors: ColorItem[] = [
  { label: 'White', value: 'white', code: 'WHI', extra: '#FFFFFF' },
  { label: 'Black', value: 'black', code: 'BLA', extra: '#18222F' },
  { label: 'Red', value: 'red', code: 'RED', extra: '#E35169' },
  { label: 'Orange', value: 'orange', code: 'ORN', extra: '#FFA439' },
]

export let filterSizes: SizeItem[] = [
  { label: 'Small', value: 'small', code: 'S' },
  { label: 'Medium', value: 'medium', code: 'M' },
  { label: 'Large', value: 'large', code: 'L' },
]

export let payloadColors: PayloadOptionItem[] = filterColors.map((color) => {
  return {
    label: color.label,
    value: color.value,
  }
})

export let payloadSizes: PayloadOptionItem[] = filterSizes.map((size) => {
  return {
    label: size.label,
    value: size.value,
  }
})
