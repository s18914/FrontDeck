import { QuestionFilters } from '@/components/question-filters'
import { QuestionResults } from '@/components/question-results'
import { QuestionListSkeleton } from '@/components/questions-skeleton'
import { CategoriesItem, getCategories } from '@/data/categories'
import { getQuestions, parseQuestionFilters } from '@/data/questions'
import { getTags, TagsItem } from '@/data/tags'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Questions' }

export default async function Questions(props: PageProps<'/questions'>) {
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Questions
      </h1>

      <Suspense
        fallback={
          <>
            <div className="mb-5 md:mb-10">
              <QuestionFilters
                categories={categories}
                tags={tags}
                values={{}}
              />
            </div>
            <QuestionListSkeleton />
          </>
        }
      >
        <FilteredQuestions
          searchParams={props.searchParams}
          categories={categories}
          tags={tags}
        />
      </Suspense>
    </section>
  )
}

async function FilteredQuestions({
  searchParams,
  categories,
  tags,
}: Pick<PageProps<'/questions'>, 'searchParams'> & {
  categories: CategoriesItem[]
  tags: TagsItem[]
}) {
  const filters = parseQuestionFilters(await searchParams)

  return (
    <>
      <div className="mb-5 md:mb-10">
        <QuestionFilters categories={categories} tags={tags} values={filters} />
      </div>
      <Suspense
        key={JSON.stringify(filters)}
        fallback={<QuestionListSkeleton />}
      >
        <QuestionResults questionsPromise={getQuestions(filters)} />
      </Suspense>
    </>
  )
}
