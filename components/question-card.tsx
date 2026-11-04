import Link from 'next/link'
import type { QuestionListItem } from '@/data/questions'

export function QuestionCard({ question }: { question: QuestionListItem }) {
  return (
    <article className="relative rounded-lg border border-gray-200 bg-background p-4 transition-colors focus-within:border-primary-600 hover:border-primary-600 dark:border-dark-border-default">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <span
            aria-hidden
            className="size-2 rounded-full"
            style={{ backgroundColor: question.category.color }}
          />
          {question.category.name}
        </span>
        <span aria-hidden>·</span>
        <span className="capitalize">{question.level.name}</span>
        {question.description && (
          <>
            <span aria-hidden>·</span>
            <span>Code snippet</span>
          </>
        )}
      </div>

      <h2 className="mt-2 font-semibold">
        {/* The ::after layer stretches the link over the whole card. */}
        <Link
          href={`/questions/${question.slug}`}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
        >
          {question.title}
        </Link>
      </h2>

      {question.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {question.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-dark-high dark:text-gray-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
