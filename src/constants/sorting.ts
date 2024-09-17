export type SortFilterItem = {
  title: string
  slug: string
  sortKey:
    | ''
    | 'BEST_SELLING'
    | 'products_id.date_created'
    | '-products_id.date_created'
    | 'price'
    | '-price'
}

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: 'relevance',
  sortKey: '',
}

export const SORTING: SortFilterItem[] = [
  defaultSort,
  //{ title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: '-products_id.date_created' },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'price' }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: '-price' },
]
