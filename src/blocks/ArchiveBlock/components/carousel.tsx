'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  DotButtons,
} from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import Fade from 'embla-carousel-fade'

import ProductCard from '@/components/product/product-card'
import { ArchiveBlock, Product } from '@/payload-types'

type CarouselBlockProps = {
  products: Product[]
  type: ArchiveBlock['type']
}

const CarouselBlock = ({ products, type }: CarouselBlockProps) => {
  let plugin

  switch (type) {
    case 'autoScroll':
      plugin = [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
      break
    case 'fade':
      plugin = []
      break
    default:
      plugin = []
      break
  }

  return (
    <div className="mx-auto w-full py-12 md:px-0 ">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={plugin}
        className="w-full "
      >
        <CarouselContent>
          {products.map((product, index) => {
            return (
              <CarouselItem key={index} className="  xsm:basis-1/2 md:basis-1/3 xl:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {type !== 'autoScroll' && (
          <>
            <CarouselPrevious />
            <CarouselNext />
            <DotButtons />
          </>
        )}
      </Carousel>
    </div>
  )
}

export default CarouselBlock

// const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

// const { selectedIndex, scrollSnaps, onDotButtonClick } =
//   useDotButton(emblaApi)
