import Link from 'next/link'
import type { QuestionDetail } from '@/data/questions'
import { Markdown } from './markdown'

export function QuestionArticle({ question }: { question: QuestionDetail }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link
        href="/questions"
        className="text-sm text-gray-600 hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-400"
      >
        ← All questions
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            <span
              aria-hidden
              className="size-2.5 rounded-full"
              style={{ backgroundColor: question.category.color }}
            />
            {question.category.name}
          </span>
          <span aria-hidden>·</span>
          <span className="capitalize">{question.level.name}</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {question.title}
        </h1>

        {question.tags.length > 0 && (
          <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-1.5">
            {question.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-dark-high dark:text-gray-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {question.description && (
        <div className="mt-8">
          <Markdown>{question.description}</Markdown>
        </div>
      )}

      {/* Native <details>: works without JavaScript and is announced as an
          expandable control. The answer stays in the HTML for search engines. */}
      <details className="group mt-8 rounded-lg border border-gray-200 bg-background dark:border-dark-border-default">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-5 py-4 font-semibold hover:bg-gray-50 dark:hover:bg-dark-elevated [&::-webkit-details-marker]:hidden">
          Show answer
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          >
            <path
              d="m4 6 4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="border-t border-gray-200 px-5 py-4 dark:border-dark-border-default">
          <Markdown>{question.answer}</Markdown>
        </div>
      </details>

      {question.sources.length > 0 && (
        <section aria-labelledby="sources" className="mt-10">
          <h2 id="sources" className="text-lg font-semibold">
            Sources
          </h2>
          <ul className="mt-3 space-y-2">
            {question.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  className="text-primary-700 underline underline-offset-2 hover:no-underline dark:text-primary-400"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
