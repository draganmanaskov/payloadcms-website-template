import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { User } from '@/payload-types'
import { useTranslations } from 'next-intl'

type ProfileButtonProps = {
  user: User
  logOut: () => Promise<void>
}

const ProfileButton = ({ user, logOut }: ProfileButtonProps) => {
  const t = useTranslations('ProfileButton')

  const profileButtonItems = [
    {
      label: t('orders'),
      href: '/admin/collections/orders',
    },
    {
      label: t('settings'),
      href: '/admin/account',
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          size="icon"
          variant="ghost"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('toggleUserMenu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <DropdownMenuLabel className="font-medium text-gray-900 dark:text-gray-50">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
        {profileButtonItems.map((item, index) => (
          <DropdownMenuItem
            key={`${item.label}-${index}`}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
          >
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
        <DropdownMenuItem
          onClick={logOut}
          className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-900"
        >
          {t('logOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
