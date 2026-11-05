const block = 'rounded-md bg-gray-200 dark:bg-dark-high'

/**
 * Placeholder for the /questions page while its data is loading. Mirrors the
 * real layout so the content does not jump when it arrives.
 */
export function QuestionsSkeleton() {
  return (
    <section
      role="status"
      className="mx-auto max-w-6xl animate-pulse px-4 py-12 motion-reduce:animate-none"
    >
      <span className="sr-only">Loading questions…</span>

      <div aria-hidden className="mb-5 md:mb-10">
        <div className={`${block} h-9 w-44`} />
        <div className={`${block} my-4 h-5 w-28`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="grid gap-1">
              <div className={`${block} h-5 w-20`} />
              <div className={`${block} h-10`} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <div className={`${block} h-10 w-20`} />
          <div className={`${block} h-10 w-20`} />
        </div>
      </div>

      <ul aria-hidden className="grid gap-3 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <li
            key={i}
            className="grid gap-3 rounded-lg border border-gray-200 p-4 dark:border-dark-border-default"
          >
            <div className={`${block} h-4 w-32`} />
            <div className={`${block} h-5 w-4/5`} />
            <div className={`${block} h-5 w-16 rounded-full`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
