'use client'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/providers/Auth'
import ProfileButton from '../ProfileButton'
import { useTranslations } from 'next-intl'
import { useCart } from '@/providers/Cart'

const ProfileHeader = () => {
  const { user, status, logout } = useAuth()
  const { clearCart } = useCart()
  const t = useTranslations('ProfileHeader')

  const handleLogout = async () => {
    try {
      await logout()
      clearCart()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user && <ProfileButton user={user} logOut={handleLogout} />}
      {!user && status === 'loggedOut' ? (
        <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
      ) : null}
      {/* <LoginButton /> */}
      {!status ? (
        <Link className={buttonVariants({ variant: 'outline' })} href={'/sign-in'}>
          {t('signIn')}
        </Link>
      ) : null}
    </>
  )
}

export default ProfileHeader
