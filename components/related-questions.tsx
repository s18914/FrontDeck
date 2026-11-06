import Link from 'next/link'

type RelatedQuestion = {
  slug: string
  title: string
  level: { name: string }
  tags?: string[]
}

export function RelatedQuestions({
  questions,
}: {
  questions: RelatedQuestion[]
}) {
  if (questions.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-questions"
      className="mx-auto w-full max-w-3xl px-4 pb-12"
    >
      <h2 id="related-questions" className="text-lg font-semibold">
        Related questions
      </h2>
      <ul className="mt-3 divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-dark-border-default dark:border-dark-border-default">
        {questions.map((question) => (
          <li key={question.slug}>
            <Link
              href={`/questions/${question.slug}`}
              className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 dark:hover:bg-dark-elevated"
            >
              <span className="grid gap-1.5">
                <span className="font-medium">{question.title}</span>
                {question.tags && question.tags.length > 0 && (
                  <span className="flex flex-wrap gap-1.5">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-dark-high dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <span className="shrink-0 text-xs text-gray-600 capitalize dark:text-gray-400">
                {question.level.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
