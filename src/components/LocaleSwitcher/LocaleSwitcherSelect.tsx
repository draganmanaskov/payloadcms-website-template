'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { cn, createUrl } from '@/utilities'
import { useSearchParams } from 'next/navigation'
import { useTransition, ReactNode, ChangeEvent } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select' // ShadCN Select

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

  function onSelectChange(value: string) {
    const nextLocale = value as 'en' | 'mk' | undefined
    const optionUrl = createUrl(pathname, params)

    startTransition(() => {
      router.replace(optionUrl, { locale: nextLocale })
    })
  }

  return (
    <div className="relative">
      <Select onValueChange={onSelectChange} defaultValue={defaultValue} disabled={isPending}>
        <SelectTrigger className="w-full mr-2">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}

export default LocaleSwitcher

// 'use client'
// import { usePathname, useRouter } from '@/i18n/routing'
// import { cn, createUrl } from '@/utilities'
// import { useSearchParams } from 'next/navigation'
// import { useTransition, ReactNode, ChangeEvent } from 'react'

// type LocaleSwitcherProps = {
//   children: ReactNode
//   defaultValue: string
//   label: string
// }

// const LocaleSwitcher = ({ children, defaultValue, label }: LocaleSwitcherProps) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [isPending, startTransition] = useTransition()
//   const params = useSearchParams()

//   function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
//     const nextLocale = event.target.value as 'en' | 'mk' | undefined
//     const optionUrl = createUrl(pathname, params)

//     startTransition(() => {
//       router.replace(optionUrl, { locale: nextLocale })
//     })
//   }

//   return (
//     <label
//       className={cn(
//         'relative text-gray-400',
//         isPending && 'transition-opacity [&:disabled]:opacity-30',
//       )}
//     >
//       <p className="sr-only">{label}</p>
//       <select
//         className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
//         defaultValue={defaultValue}
//         disabled={isPending}
//         onChange={onSelectChange}
//       >
//         {children}
//       </select>
//       <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
//     </label>
//   )
// }

// export default LocaleSwitcher
