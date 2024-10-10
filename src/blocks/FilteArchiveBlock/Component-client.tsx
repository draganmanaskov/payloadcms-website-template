'use client'

import useFilterHook from '@/hooks/useFilterHook'

type ComponentClientProps = {
  type: 'desktop' | 'mobile'
}

const ComponentClient = ({ type }: ComponentClientProps) => {
  const { urlParams, handleClickSingle, handleClickMulti, handleRange, applyUrlChange } =
    useFilterHook(type)
  return <div>ComponentClient</div>
}

export default ComponentClient
