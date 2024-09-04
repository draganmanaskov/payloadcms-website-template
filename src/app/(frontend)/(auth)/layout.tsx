import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      {children}
      <div className="hidden h-screen bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1578932750294-f5075e85f44a"
          alt="Image"
          width="1920"
          height="580"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  )
}
