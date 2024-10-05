'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, textColor }) => {
  console.log(textColor)
  return (
    <div className="relative  flex items-end ">
      <div className="container mb-8 z-10 relative">
        <div className="max-w-[34rem]">
          {richText && (
            <RichText
              className={`mb-6`}
              content={richText}
              enableGutter={false}
              textColor={textColor}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {media && typeof media === 'object' && (
        <div className="min-h-[80vh] select-none ">
          <Media className="" fill imgClassName="-z-10 object-cover " priority resource={media} />
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}
    </div>
  )
}
