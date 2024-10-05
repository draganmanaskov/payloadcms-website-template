import Image from 'next/image'
import React from 'react'

type LightLogoProps = {
  src?: string
}

const LightLogo = ({ src }: LightLogoProps) => {
  return (
    <Image
      className="block dark:hidden"
      src={src ? src : '/logo-v2-light.png'}
      alt="Logo Light"
      width="0"
      height="0"
      sizes="(max-width: 768px) 50vw, 170px"
      style={{ width: '100%', height: 'auto', maxWidth: '170px', maxHeight: '100px' }}
    />
  )
}

export default LightLogo
