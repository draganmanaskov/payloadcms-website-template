export default function Loading() {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              key={index}
              className="aspect-square animate-pulse bg-neutral-100 transition-opacity dark:bg-neutral-900"
            />
          )
        })}
    </ul>
  )
}
