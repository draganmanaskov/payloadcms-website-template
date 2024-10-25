'use client'
import type { Data } from 'payload'
import { useRowLabel } from '@payloadcms/ui'

function ArrayFieldTitle(props) {
  const { data, rowNumber } = useRowLabel<Data>()

  let { fieldToUse } = props

  return <>{data[fieldToUse] || props.label}</>
}

export default ArrayFieldTitle
