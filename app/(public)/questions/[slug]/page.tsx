import { QuestionArticle } from '@/components/question-article'
import { RelatedQuestions } from '@/components/related-questions'
import {
  getQuestionBySlug,
  getQuestionSlugs,
  getRelatedQuestions,
} from '@/data/questions'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  if (process.env.SKIP_DB_PRERENDER) {
    return []
  }
  const slugs = await getQuestionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/questions/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const question = await getQuestionBySlug(slug)

  if (!question) {
    return {}
  }

  return {
    title: question.title,
    description: `Question: ${question.category.name}`,
  }
}

export default async function Question(props: PageProps<'/questions/[slug]'>) {
  const { slug } = await props.params

  const question = await getQuestionBySlug(slug)

  if (!question) {
    notFound()
  }

  const relatedQuestions = await getRelatedQuestions({
    slug: question.slug,
    categorySlug: question.category.slug,
    levelName: question.level.name,
  })

  return (
    <>
      <QuestionArticle question={question} />
      <RelatedQuestions questions={relatedQuestions} />
    </>
  )
}
