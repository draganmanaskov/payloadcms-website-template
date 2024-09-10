import { Skeleton } from '@/components/ui/skeleton'
import { VariantSelectorSkeleton } from '@/components/VariantPicker'
import React from 'react'

const loading = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Skeleton className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden " />
          </div>

          <div className="basis-full space-y-4 lg:basis-2/6">
            <div className="space-y-4 ">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
            <Skeleton className="h-2 w-full px-8" />
            <VariantSelectorSkeleton />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default loading
