import Link from 'next/link'
import { Suspense } from 'react'
import { UserMenu } from './user-menu'

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          FrontDeck
        </Link>
        <div className="flex items-center gap-6">
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
          <Suspense fallback={<div className="h-8 w-44" aria-hidden />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
