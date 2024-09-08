import { cn } from '@/utilities'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { useAuth } from '@/providers/Auth'

const LoginButton = () => {
  const { user } = useAuth()

  return (
    <>
      {!user ? (
        <Link href={'/sign-in'} className={cn(buttonVariants({ variant: 'outline' }))}>
          Login
        </Link>
      ) : null}
    </>
  )
}

export default LoginButton
