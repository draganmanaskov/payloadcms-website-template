'use client'
import { createContext, useContext, useState } from 'react'

export type ShippingOption = {
  name: string
  value: string
  price: number
  delivery: string
}

export type ShippingContext = {
  shipping: ShippingOption
  setShipping: React.Dispatch<React.SetStateAction<ShippingOption>>
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    name: 'Standard Shipping',
    value: 'standard',
    price: 150,
    delivery: '5-7',
  },
  {
    name: 'Express Shipping',
    value: 'express',
    price: 400,
    delivery: '2-3',
  },
]

export const ShippingContext = createContext<ShippingContext | null>(null)

type ShippingContextProviderProps = {
  children: React.ReactNode
}

const ShippingContextProvider = ({ children }: ShippingContextProviderProps) => {
  const [shipping, setShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0])

  return (
    <ShippingContext.Provider value={{ shipping, setShipping }}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContextProvider

export function useShippingContext() {
  const context = useContext(ShippingContext)
  if (!context) {
    throw new Error('useShippingContext must be used within a ShippingContextProvider')
  }

  return context
}
