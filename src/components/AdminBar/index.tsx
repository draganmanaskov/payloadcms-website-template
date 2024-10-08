'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/cn'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { useAuth } from '@/providers/Auth'
import { checkRole } from '@/payload/collections/Users/checkRole'

// const collectionLabels = {
//   pages: {
//     plural: 'Pages',
//     singular: 'Page',
//   },

//   projects: {
//     plural: 'Projects',
//     singular: 'Project',
//   },
// }

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  // const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()
  const { user } = useAuth()

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  const isAdmin = checkRole(['admin'], user ? user : undefined)

  return (
    <>
      {user && isAdmin ? (
        <div
          className={cn('py-2 bg-black text-white ', {
            block: show,
            hidden: !show,
          })}
        >
          <div className="container">
            <PayloadAdminBar
              {...adminBarProps}
              // className="py-2 text-white z-50"
              // classNames={{
              //   controls: 'font-medium text-white',
              //   logo: 'text-white',
              //   user: 'text-red-500',

              // }}
              cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
              // collection={collection}
              // collectionLabels={{
              //   plural: collectionLabels[collection]?.plural || 'Pages',
              //   singular: collectionLabels[collection]?.singular || 'Page',
              // }}
              logo={<Title />}
              onAuthChange={onAuthChange}
              onPreviewExit={() => {
                fetch('/next/exit-preview').then(() => {
                  router.push('/')
                  router.refresh()
                })
              }}
              style={{
                backgroundColor: 'transparent',
                padding: 0,
                position: 'relative',
                zIndex: 'unset',
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
