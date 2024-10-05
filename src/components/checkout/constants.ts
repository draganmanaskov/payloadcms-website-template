export const SHIPPING_DEFAULT_VALUES = {
  id: '',
  title: 'Profile',
  email: '',
  phoneNumber: '',
  country: 'Macedonia',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
} as const

export const SHIPPING_CHECKOUT_DEFAULT_VALUES = {
  profile: SHIPPING_DEFAULT_VALUES,
  valid: false,
} as const
