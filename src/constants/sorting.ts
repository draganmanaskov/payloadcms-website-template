export type SortFilterItem = {
  title: string
  slug: string
  sortKey: '' | 'BEST_SELLING' | 'createdAt' | '-createdAt' | 'price' | '-price'
}

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: 'relevance',
  sortKey: '',
}

export const SORTING: SortFilterItem[] = [
  defaultSort,
  //{ title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: '-createdAt' },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'price' }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: '-price' },
]
