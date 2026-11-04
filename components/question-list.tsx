import Link from 'next/link'
import type { QuestionListItem } from '@/data/questions'
import { QuestionCard } from './question-card'

export function QuestionList({ questions }: { questions: QuestionListItem[] }) {
  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-dark-border-medium">
        <p className="font-medium">No questions match these filters.</p>
        <Link
          href="/questions"
          className="mt-2 inline-block text-sm text-primary-700 underline dark:text-primary-400"
        >
          Clear filters
        </Link>
      </div>
    )
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {questions.map((question) => (
        <li key={question.id} className="grid">
          <QuestionCard question={question} />
        </li>
      ))}
    </ul>
  )
}
