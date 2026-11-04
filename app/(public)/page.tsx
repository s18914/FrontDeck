import Link from 'next/link'
import { buttonClasses } from '@/components/ui/button'

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
        Prepare for frontend interviews <br className="hidden sm:block" />
        <span className="text-primary-700 dark:text-primary-400">
          with spaced repetition
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
        Questions on JavaScript, React, Next.js, accessibility, performance and
        more, with answers linked to official documentation.
      </p>
      <Link
        href="/questions"
        className={`${buttonClasses({ variant: 'gradient', size: 'lg' })} mt-10`}
      >
        Browse questions
      </Link>
    </section>
  )
}
