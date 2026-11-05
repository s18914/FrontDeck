'use client'

import { buttonClasses } from '@/components/ui/button'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center md:py-24">
      <h1 className="text-2xl font-bold tracking-tight text-balance text-gray-900 md:text-3xl dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-3 mb-8 text-pretty text-gray-700 dark:text-gray-300">
        We couldn&apos;t load this page. Please try again in a moment.
      </p>
      <button className={buttonClasses()} onClick={retry}>
        Try again
      </button>
    </div>
  )
}
