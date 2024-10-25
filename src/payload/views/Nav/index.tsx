import { ImportMap, Permissions, SanitizedConfig } from 'payload'
import NavClientComponent from './Component'
import { User } from '@/payload-types'

type NavProps = {
  i18n: any
  locale: any
  params: Promise<{
    segments: string[]
  }>
  payload: any
  importMap: ImportMap
  permissions: Permissions
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
  user: User
}

const DefaultNav = async ({
  i18n,
  locale,
  params,
  payload,
  importMap,
  permissions,
  searchParams,
  user,
}: NavProps) => {
  return (
    <>
      <NavClientComponent user={user} />
    </>
  )
}

export default DefaultNav
