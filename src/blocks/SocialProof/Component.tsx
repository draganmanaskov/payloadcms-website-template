import React from 'react'

import type { Page } from '@/payload-types'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities'
import { IconsLucide } from '@/payload/fields/IconPicker/IconsLucide'

type Props = Extract<Page['layout'][0], { blockType: 'socialProof' }>

export const SocialProofBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { icons, value, label, size } = col
            const IconComponent = icons ? IconsLucide[icons] : null
            // className="flex flex-col items-center p-6">
            return (
              <Card
                key={index}
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
              >
                <CardContent className="flex flex-col items-center p-6">
                  {/* <stat.icon className="h-12 w-12 mb-4 text-primary" /> */}
                  {IconComponent && <IconComponent className="h-12 w-12 mb-4 text-primary" />}
                  <h3 className="text-3xl font-bold mb-2">{value}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
                </CardContent>
              </Card>
            )
            // return (
            //   <div
            //     className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
            //       'md:col-span-2': size !== 'full',
            //     })}
            //     key={index}
            //   >
            //     {richText && <RichText content={richText} enableGutter={false} />}

            //     {enableLink && <CMSLink {...link} />}
            //   </div>
            // )
          })}
      </div>
    </div>
  )
}
