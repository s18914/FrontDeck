import { QuestionFilters } from '@/components/question-filters'
import { QuestionList } from '@/components/question-list'
import { getCategories } from '@/data/categories'
import { getQuestions, parseQuestionFilters } from '@/data/questions'
import { getTags } from '@/data/tags'

export default async function Questions(props: PageProps<'/questions'>) {
  const filters = parseQuestionFilters(await props.searchParams)

  const [categories, tags, questions] = await Promise.all([
    getCategories(),
    getTags(),
    getQuestions(filters),
  ])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-[20px] md:mb-[40px]">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Questions
        </h1>
        <p className="my-4">{questions.length} questions</p>
        <QuestionFilters categories={categories} tags={tags} values={filters} />
      </div>

      <QuestionList questions={questions} />
    </section>
  )
}
