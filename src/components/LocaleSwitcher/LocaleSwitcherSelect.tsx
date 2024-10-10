'use client'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn, createUrl } from '@/utilities'
import { useSearchParams } from 'next/navigation'
import { useTransition, ReactNode, ChangeEvent } from 'react'

type LocaleSwitcherProps = {
  children: ReactNode
  defaultValue: string
  label: string
}

const LocaleSwitcher = ({ children, defaultValue, label }: LocaleSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const params = useSearchParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as 'en' | 'mk' | undefined
    const optionUrl = createUrl(pathname, params)

    startTransition(() => {
      router.replace(optionUrl, { locale: nextLocale })
    })
  }

  return (
    <label
      className={cn(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  )
}

export default LocaleSwitcher
