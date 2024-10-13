'use client'

import { Link, useRouter } from '@/i18n/routing'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useAuth } from '@/providers/Auth'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof formSchema>

export default function SignIn() {
  const t = useTranslations('SignIn')
  const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { login, status } = useAuth()

  useEffect(() => {
    if (status === 'loggedIn') {
      router.push('/')
    }
  }, [status, router])

  async function onSubmit(data: LoginFormData) {
    try {
      await login({
        email: data.email,
        password: data.password,
      })
      router.back()
    } catch (error) {
      form.setError('email', {
        message: 'Email address or password is invalid',
      })
    }
  }

  return (
    <div className="flex items-center justify-center py-12 lg:py-24">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-balance text-muted-foreground">{t('description')}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder="email@contact.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{t('password')}</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('title')}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t('noAccount')}
          <Link href="/sign-up" className="underline ml-2">
            {t('signUp')}
          </Link>
        </div>
      </div>
    </div>
  )
}
