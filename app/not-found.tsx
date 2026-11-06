import { GradientBackdrop } from '@/components/gradient-backdrop'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { buttonClasses } from '@/components/ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <div className="relative isolate flex flex-1 flex-col">
      <GradientBackdrop />
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center md:py-24">
        <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-balance text-gray-900 md:text-3xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 mb-8 max-w-md text-pretty text-gray-700 dark:text-gray-300">
          The page you&apos;re looking for doesn&apos;t exist. Check the address
          or browse the questions instead.
        </p>
        <Link className={buttonClasses()} href="/questions">
          Browse questions
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}
