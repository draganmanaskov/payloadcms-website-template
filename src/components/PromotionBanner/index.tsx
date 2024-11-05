'use client'
import { Page } from '@/payload-types'
import React, { useEffect, useState } from 'react'

type PromotionBannerProps = {
  promotion: Page['promotion']
}

const PromotionBanner = ({ promotion }: PromotionBannerProps) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <section className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{promotion?.title}</h2>
        <div className="text-5xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <p className="text-xl mb-8">{promotion?.description}</p>
      </div>
    </section>
  )
}
//2024-10-22T12:00:00.000Z

export default PromotionBanner
