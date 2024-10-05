'use client'
import { useEffect, useState } from 'react'

const useSessionStorage = <T>(key: string, initalValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initalValue
    const jsonValue = sessionStorage.getItem(key)
    return jsonValue ? JSON.parse(jsonValue) : null
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

export default useSessionStorage
