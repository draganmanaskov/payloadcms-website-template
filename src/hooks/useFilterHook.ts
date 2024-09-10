import { DEFAULT_CUSTOM_PRICE } from '@/constants'
import { createUrl } from '@/utilities'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const useFilterHook = (type: 'desktop' | 'mobile', latency: number = 1000) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [urlParams, setUrlParams] = useState<{ [key: string]: string }>(() => {
    const params: { [key: string]: string } = {}
    searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value)
    })
    return params
  })

  const [query] = useDebounce(urlParams, type === 'mobile' ? 0 : latency)

  useEffect(() => {
    const params: { [key: string]: string } = {}
    searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value)
    })
    setUrlParams(params)
  }, [searchParams])

  const applyUrlChange = () => {
    const queryString = Object.keys(query)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&')
    if (queryString === searchParams.toString()) return

    const updatedSearchParams = new URLSearchParams(query)

    const optionUrl = createUrl(pathname, updatedSearchParams)
    router.push(optionUrl, { scroll: false })
  }

  useEffect(() => {
    if (type === 'mobile') return
    applyUrlChange()
  }, [query, router])

  const setUrlParamsHandler = (key: string, updateOption: string) => {
    setUrlParams((prev) => {
      const newParams = { ...prev, [key]: updateOption }
      if (newParams[key] === '') {
        delete newParams[key]
      }
      if (key !== 'page') {
        delete newParams['page']
      }

      return newParams
    })
  }

  const handleClickSingle = (key: string, name: string, isActive: boolean) => {
    let updatedSelectedOption = ''

    if (!isActive) {
      updatedSelectedOption = name
    }
    setUrlParamsHandler(key, updatedSelectedOption)
  }

  const handleClickMulti = (key: string, name: string, isActive: boolean) => {
    let updatedSelectedOptions: string[] = []

    if (urlParams[key] && urlParams[key] !== '') {
      updatedSelectedOptions = urlParams[key].split('&')
    }

    if (isActive) {
      const index = updatedSelectedOptions.indexOf(name)
      if (index > -1) {
        updatedSelectedOptions.splice(index, 1)
      }
    } else {
      updatedSelectedOptions.push(name)
    }

    setUrlParamsHandler(key, updatedSelectedOptions.join('&'))
  }

  const handleRange = (range: [number, number], isCustom: boolean) => {
    const [newMin, newMax] = range

    setUrlParamsHandler('fromPrice', newMin > DEFAULT_CUSTOM_PRICE[0] ? `${newMin}` : '')
    setUrlParamsHandler('toPrice', newMax < DEFAULT_CUSTOM_PRICE[1] ? `${newMax}` : '')
    setUrlParamsHandler('customPrice', isCustom ? 'true' : '')
  }

  const handleChange = (key: string, value: string) => {
    setUrlParamsHandler(key, value)
  }

  return {
    urlParams,
    setUrlParams,
    handleClickSingle,
    handleClickMulti,
    handleRange,
    handleChange,
    applyUrlChange,
  }
}

export default useFilterHook
