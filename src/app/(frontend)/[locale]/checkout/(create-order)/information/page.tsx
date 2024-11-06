'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import useSessionStorage from '@/hooks/useSessionSotrage'
import { useRouter, Link as LinkLocale } from '@/i18n/routing'

import { SHIPPING_CHECKOUT_DEFAULT_VALUES } from './constants'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities'
import ShippingForm from '@/components/forms/shipping-form'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/providers/Auth'
import { User } from '@/payload-types'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

export type ShippingInformaptionChecout = {
  profile: ShippingProfile
  valid: boolean
}

export type ShippingProfiles = User['shippingProfiles']

export type ShippingProfile = NonNullable<ShippingProfiles>[number]

const InformationPage = () => {
  const { user, status: authStatus, refresh } = useAuth()
  const router = useRouter()
  const t = useTranslations('InformationPage')

  const [value, setValue] = useSessionStorage<ShippingInformaptionChecout>(
    'shipping-information-checkout',
    SHIPPING_CHECKOUT_DEFAULT_VALUES,
  )

  const profiles = user?.shippingProfiles || null
  const [profileId, setProfileId] = useState<string>(() => {
    if (profiles && profiles.length > 0) {
      if (profiles[0].id) return profiles[0].id
    }

    return ''
  })

  const [selectedProfile, setSelectedProfile] = useState<ShippingProfile | null>(null)

  const onSubmit = async (data: ShippingProfile) => {
    const newState = { profile: data, valid: true }
    setValue(newState)
    router.push('/checkout/shipping')
  }

  useEffect(() => {
    if (profileId && profiles) {
      let profile = profiles.find((profile) => profile.id === profileId)

      setSelectedProfile(profile ? profile : null)
    }
  }, [profileId, profiles])
  useEffect(() => {
    if (!profiles || profiles.length === 0) return
    if (!profiles[0].id) return
    setProfileId(profiles[0].id)
  }, [profiles])

  return (
    <>
      {profiles ? (
        <div className="space-y-4 py-4">
          <h3 className=" text-2xl font-bold">{t('title')}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{t('subtitle')}</p>
          <div className="flex items-center gap-2">
            <Select
              defaultValue={profileId}
              disabled={!profiles[0]}
              onValueChange={(value) => {
                setProfileId(value)
              }}
              value={profileId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => {
                  if (!profile.id) return null
                  return (
                    <SelectItem value={profile.id} key={profile.id}>
                      {profile.title}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <div className="flex justify-center items-center ">
              <Link
                target="_blank"
                className={cn(buttonVariants({ variant: 'linkHover2' }))}
                href="/admin/account"
              >
                {t('manageProfiles')}
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={refresh}>
                    <Icons.Refresh className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>{t('refresh')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Separator />
        </div>
      ) : null}
      {authStatus === 'loggedOut' ? (
        <div className="py-4 flex justify-start items-center gap-2">
          <p>{t('loginToHaveAcces')}</p>
          <LinkLocale
            className={cn(buttonVariants({ variant: 'ghost', className: 'font-bold' }))}
            href="/sign-in"
          >
            {t('signIn')}
          </LinkLocale>
        </div>
      ) : null}
      <ShippingForm
        profile={selectedProfile}
        onSubmit={onSubmit}
        type="checkout"
        buttonText={t('continueToShipping')}
      />
    </>
  )
}

export default InformationPage
