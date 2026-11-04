import Link from 'next/link'

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          FrontDeck
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/questions"
                className="text-sm font-medium hover:text-primary-700 dark:hover:text-primary-400"
              >
                Questions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
