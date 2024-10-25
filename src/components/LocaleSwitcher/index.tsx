import { useLocale, useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select' // ShadCN Select
import { routing } from '@/i18n/routing'

import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}

// import { useLocale, useTranslations } from 'next-intl'
// import LocaleSwitcherSelect from './LocaleSwitcherSelect'
// import { routing } from '@/i18n/routing'

// export default function LocaleSwitcher() {
//   const t = useTranslations('LocaleSwitcher')
//   const locale = useLocale()

//   return (
//     <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
//       {routing.locales.map((cur) => (
//         <option key={cur} value={cur}>
//           {t('locale', { locale: cur })}
//         </option>
//       ))}
//     </LocaleSwitcherSelect>
//   )
// }
