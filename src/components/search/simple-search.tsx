'use client'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '../icons'

import useFilterHook from '@/hooks/useFilterHook'

type SimpleSearchProps = {
  q: string | undefined
}

export default function SimpleSearch({ q }: SimpleSearchProps) {
  const { urlParams, handleChange } = useFilterHook('desktop')

  return (
    <div className="relative my-2 w-full max-w-md">
      <TooltipProvider>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-md border border-input bg-background px-4 py-2 pr-12 text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          onChange={(e) => handleChange('q', e.target.value)}
          value={urlParams['q'] || ''}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-muted/5"
              onClick={() => handleChange('q', '')}
            >
              <Icons.X className="h-5 w-5" />
              <span className="sr-only">Clear</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear search</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
