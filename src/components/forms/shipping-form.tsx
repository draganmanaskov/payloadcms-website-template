'use client'
import { SHIPPING_DEFAULT_VALUES } from '@/components/checkout/constants'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import * as z from 'zod'
import { ShippingProfile } from '../checkout/information-form'

const shippingFormSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.enum(['Macedonia']),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(2),
})
export type ShippingInformationForm = z.infer<typeof shippingFormSchema>

type ShippingFormProps = {
  profile: ShippingProfile | null
  onSubmit: (data: ShippingInformationForm) => void
  type: 'checkout' | 'settings'
  buttonText?: string
}

const ShippingForm = ({ profile, onSubmit, type, buttonText = 'Save' }: ShippingFormProps) => {
  const form = useForm<ShippingProfile>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: profile ? profile : SHIPPING_DEFAULT_VALUES,
  })

  useEffect(() => {
    if (profile) {
      form.reset(profile)
    }
  }, [profile, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <>
                {type === 'settings' ? (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input className="text-xl" placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : null}
              </>
            )
          }}
        />

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="mb-6 text-2xl font-bold">Contact</h3>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@contact.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phonenumber</FormLabel>
                <FormControl>
                  <PhoneInputWithCountry placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormDescription>
                  Your phone number is used to send you notifications and updates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Shipping */}
        <div className="w-full space-y-4">
          <h3 className="mb-6 text-2xl font-bold">Shipping Address</h3>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Macedonia">Macedonia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-2 ">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ZIP code</FormLabel>
                  <FormControl>
                    <Input placeholder="ZIP code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-end pt-4">
          <Button type="submit" size={'lg'}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ShippingForm
