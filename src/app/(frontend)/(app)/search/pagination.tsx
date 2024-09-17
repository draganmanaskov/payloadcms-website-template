'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { createUrl } from '@/utilities'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
type PaginationComponentProps = {
  count: number
  page: number
  limit: number
}

const BUTTON_ARRAY_MAX = 10

const PaginationComponent = ({ count, page, limit }: PaginationComponentProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const optionSearchParams = new URLSearchParams(searchParams.toString())

  const totalPages = Math.ceil(count / limit)

  const pages = generatePagination(page, totalPages)

  const generateURL = (pageNumber: number) => {
    optionSearchParams.set('page', `${pageNumber}`)
    const optionUrl = createUrl(pathname, optionSearchParams)
    return optionUrl
  }

  return (
    <Pagination className="mt-6 ">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={page <= 1}
            variant={'ghost'}
            onClick={() => router.replace(generateURL(1))}
          >
            <Icons.ChevronsLeft />
            First
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={page <= 1}
            variant={'ghost'}
            onClick={() => router.replace(generateURL(page - 1))}
          >
            <Icons.ChevronLeft />
            Previous
          </Button>
        </PaginationItem>
        {pages.map((item, index) => {
          const URL = generateURL(item)
          return (
            <PaginationItem key={item}>
              <Button
                variant={item === page ? 'default' : 'ghost'}
                onClick={() => router.replace(URL)}
              >
                {item}
              </Button>
            </PaginationItem>
          )
        })}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <Button
            disabled={page >= totalPages}
            variant={'ghost'}
            onClick={() => router.replace(generateURL(page + 1))}
          >
            Next
            <Icons.ChevronRight />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={page >= totalPages}
            variant={'ghost'}
            onClick={() => router.replace(generateURL(totalPages))}
          >
            Last
            <Icons.ChevronsRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent

function generatePagination(currentPage: number, totalPages: number) {
  const maxButtons = 8
  let startPage, endPage

  if (totalPages <= maxButtons) {
    // If the total number of pages is less than or equal to the max buttons
    startPage = 1
    endPage = totalPages
  } else {
    // More than max buttons, calculate start and end pages
    const halfMax = Math.floor(maxButtons / 2)
    if (currentPage <= halfMax) {
      // Current page is near the start
      startPage = 1
      endPage = maxButtons
    } else if (currentPage + halfMax >= totalPages) {
      // Current page is near the end
      startPage = totalPages - maxButtons + 1
      endPage = totalPages
    } else {
      // Current page is somewhere in the middle
      startPage = currentPage - halfMax
      endPage = currentPage + halfMax

      // Ensure the total buttons remain within the limit
      if (endPage - startPage + 1 > maxButtons) {
        endPage = startPage + maxButtons - 1
      }
    }
  }

  // Create an array of pages
  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
}
