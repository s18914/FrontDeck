import type { QuestionListItem } from '@/data/questions'
import { QuestionList } from './question-list'

export async function QuestionResults({
  questionsPromise,
}: {
  questionsPromise: Promise<QuestionListItem[]>
}) {
  const questions = await questionsPromise
  return (
    <>
      <p className="mb-4">{questions.length} questions</p>
      <QuestionList questions={questions} />
    </>
  )
}
