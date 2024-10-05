import Image from 'next/image'
import React from 'react'

type DarkLogoProps = {
  src?: string
}

const DarkLogo = ({ src }: DarkLogoProps) => {
  return (
    <Image
      className="hidden dark:block "
      src={src ? src : '/logo-v2-dark.png'}
      alt="Logo Dark"
      width="0"
      height="0"
      sizes="(max-width: 768px) 50vw, 170px"
      style={{ width: '100%', height: 'auto', maxWidth: '170px', maxHeight: '100px' }}
    />
  )
}

export default DarkLogo
