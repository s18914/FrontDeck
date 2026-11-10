const block = 'rounded-md bg-gray-200 dark:bg-dark-high'
const pulse = 'animate-pulse motion-reduce:animate-none'

/**
 * Placeholder for the question count and list only. Used on its own as the
 * Suspense fallback when filters change.
 */
export function QuestionListSkeleton() {
  return (
    <div role="status" className={pulse}>
      <span className="sr-only">Loading questions…</span>
      <div aria-hidden>
        <div className={`${block} mb-4 h-5 w-28`} />
        <ul className="grid gap-3 md:grid-cols-2">
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
      </div>
    </div>
  )
}
