'use client'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/utilities'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations('AuthLayout')

  return (
    <main className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="col-span-1 p-4">
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outline', className: 'flex items-center justify-center' }),
            )}
          >
            <Icons.ArrowLeft className="h-4 w-4" />
            {t('backHome')}
          </Link>
        </div>
        {children}
      </div>
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
