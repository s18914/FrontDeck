import Link from 'next/link'

const linkClasses =
  'text-sm text-gray-600 hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-400'

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border-subtle">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-lg font-semibold">FrontDeck</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Spaced-repetition practice for frontend interviews.
          </p>
        </div>
        <nav aria-label="Footer" className="sm:justify-self-end">
          <ul className="space-y-2">
            <li>
              <Link href="/questions" className={linkClasses}>
                Questions
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/s18914/FrontDeck"
                className={linkClasses}
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
