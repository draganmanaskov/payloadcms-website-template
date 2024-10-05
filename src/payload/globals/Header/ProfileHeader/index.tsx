'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/providers/Auth'
import ProfileButton from '../ProfileButton'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProfileHeader = () => {
  const { user, status, logout } = useAuth()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logout()
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
          Sign In
        </Link>
      ) : null}
    </>
  )
}

export default ProfileHeader
