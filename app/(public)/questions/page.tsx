import { QuestionFilters } from '@/components/question-filters'
import { QuestionResults } from '@/components/question-results'
import { QuestionListSkeleton } from '@/components/questions-skeleton'
import { getCategories } from '@/data/categories'
import { getQuestions, parseQuestionFilters } from '@/data/questions'
import { getTags } from '@/data/tags'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Questions' }

export default async function Questions(props: PageProps<'/questions'>) {
  const filters = parseQuestionFilters(await props.searchParams)

  const questionsPromise = getQuestions(filters)
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-5 md:mb-10">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Questions
        </h1>
        <QuestionFilters categories={categories} tags={tags} values={filters} />
      </div>

      <Suspense
        key={JSON.stringify(filters)}
        fallback={<QuestionListSkeleton />}
      >
        <QuestionResults questionsPromise={questionsPromise} />
      </Suspense>
    </section>
  )
}
