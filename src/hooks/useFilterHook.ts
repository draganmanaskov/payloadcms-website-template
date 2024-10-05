import { DEFAULT_CUSTOM_PRICE } from '@/constants'
import { createUrl } from '@/utilities'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
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

  const applyUrlChange = useMemo(
    () => () => {
      // Normalize the current search params and query for comparison
      const currentParams = new URLSearchParams(searchParams.toString())
      const nextParams = new URLSearchParams()

      Object.keys(query).forEach((key) => {
        nextParams.set(encodeURIComponent(key), encodeURIComponent(query[key]))
      })

      // If they are the same, don't trigger a URL change
      if (currentParams.toString() === nextParams.toString()) return

      const optionUrl = createUrl(pathname, nextParams)
      router.push(optionUrl, { scroll: false })
    },
    [query, searchParams, pathname, router],
  )
  useEffect(() => {
    if (type === 'mobile') return
    applyUrlChange()
  }, [query, applyUrlChange, type])

  // useEffect(() => {
  //   if (type === 'mobile') return

  //   const currentQueryString = searchParams.toString()
  //   const nextQueryString = Object.keys(query)
  //     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  //     .join('&')

  //   console.log('Current Params:', currentQueryString)
  //   console.log('Next Params:', nextQueryString)

  //   // if (currentQueryString !== nextQueryString) {
  //   //   console.log('Applying URL Change')
  //   //   applyUrlChange()
  //   // }
  // }, [query, searchParams, type, applyUrlChange])

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
