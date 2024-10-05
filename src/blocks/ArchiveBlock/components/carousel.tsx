'use client'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import Autoplay from "embla-carousel-autoplay";
import AutoScroll from 'embla-carousel-auto-scroll'

import ProductCard from '@/components/product/product-card'
import { Product } from '@/payload-types'

const OPTIONS = { slidesToScroll: 'auto' }
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

type CarouselBlockProps = {
  products: Product[]
}

const CarouselBlock = ({ products }: CarouselBlockProps) => {
  // const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  return (
    <div className="mx-auto w-full px-2 py-12 md:px-0 ">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full "
      >
        <CarouselContent>
          {products.map((product, index) => {
            return (
              <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                {/* <ProductCard product={product} type="featured" /> */}
                <ProductCard product={product} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}

        {/* <DotButtons /> */}
      </Carousel>
    </div>
  )
}

export default CarouselBlock

{
  /* <div className="mb-6 flex flex-col gap-4">
<h2 className="text-2xl font-bold">{block.item.title}</h2>
{block.item.subtitle && (
  <p className="text-muted-foreground">{block.item.subtitle}</p>
)}
</div> */
}
