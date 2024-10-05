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

import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'

import { SHIPPING_CHECKOUT_DEFAULT_VALUES } from './constants'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities'
import ShippingForm, { ShippingInformationForm } from '@/components/forms/shipping-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useAuth } from '@/providers/Auth'
import { User } from '@/payload-types'

export type ShippingInformaptionChecout = {
  profile: ShippingProfile
  valid: boolean
}

export type ShippingProfiles = User['shippingProfiles']

export type ShippingProfile = NonNullable<ShippingProfiles>[number]

const InformationForm = () => {
  const { user, status: authStatus } = useAuth()
  const router = useRouter()

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
          <h3 className=" text-2xl font-bold">Profiles</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Select a profile to fill in the form. Changing the values will not save the changes.
          </p>
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
            <Link className={cn(buttonVariants({ variant: 'link' }))} href="/admin/account">
              {' '}
              Manage Profiles
            </Link>
          </div>

          <Separator />
        </div>
      ) : null}
      {authStatus === 'loggedOut' ? (
        <div className="py-4 flex justify-start items-center gap-2">
          <p>Login to have acces to saved shipping profiles</p>
          <Link
            className={cn(buttonVariants({ variant: 'ghost', className: 'font-bold' }))}
            href="/sign-in"
          >
            Login
          </Link>
        </div>
      ) : null}
      <ShippingForm
        profile={selectedProfile}
        onSubmit={onSubmit}
        type="checkout"
        buttonText="Continue to shipping"
      />
    </>
  )
}

export default InformationForm
