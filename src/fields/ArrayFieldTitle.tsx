'use client'
import type { Data } from 'payload'
import { useRowLabel } from '@payloadcms/ui'

function ArrayFieldTitle(props) {
  const { data, rowNumber } = useRowLabel<Data>()
  console.log(data, props)
  return <>{data?.sku || props.label}</>
}

export default ArrayFieldTitle
