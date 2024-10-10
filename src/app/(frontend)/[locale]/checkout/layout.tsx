import ShippingContextProvider from '@/context/shipping-context'

interface CheckoutLayoutProps {
  children: React.ReactNode
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <>
      <ShippingContextProvider>
        <main>{children}</main>
      </ShippingContextProvider>
    </>
  )
}
