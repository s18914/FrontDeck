import 'server-only'
import { z } from 'zod'
import { db } from '@/db'
import {
  categoryTable,
  levelTable,
  questionTable,
  questionTagTable,
  tagTable,
} from '@/db/schema'
import { and, asc, eq, ne, ilike, inArray, sql } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

const questionsFiltersSchema = z.object({
  category: z.string().optional().catch(undefined),
  level: z.enum(['junior', 'mid', 'senior']).optional().catch(undefined),
  tag: z.string().optional().catch(undefined),
  search: z.string().trim().max(100).optional().catch(undefined),
})

export function parseQuestionFilters(
  searchParams: Record<string, string | string[] | undefined>,
) {
  return questionsFiltersSchema.parse(searchParams)
}

export type QuestionListItem = Awaited<ReturnType<typeof getQuestions>>[number]
export type QuestionDetail = NonNullable<
  Awaited<ReturnType<typeof getQuestionBySlug>>
>

export async function getQuestions(
  input: z.input<typeof questionsFiltersSchema>,
) {
  const filters = questionsFiltersSchema.parse(input)
  const questions = await db
    .select({
      id: questionTable.id,
      title: questionTable.title,
      description: questionTable.description,
      slug: questionTable.slug,
      createdAt: questionTable.createdAt,
      category: {
        name: categoryTable.name,
        slug: categoryTable.slug,
        color: categoryTable.color,
      },
      level: { name: levelTable.name },
      tags: sql<
        string[]
      >`coalesce(array_agg(${tagTable.name} order by ${tagTable.name}) filter (where ${tagTable.name} is not null), '{}')`,
    })
    .from(questionTable)
    .innerJoin(categoryTable, eq(questionTable.categoryId, categoryTable.id))
    .innerJoin(levelTable, eq(questionTable.levelId, levelTable.id))
    .leftJoin(
      questionTagTable,
      eq(questionTagTable.questionId, questionTable.id),
    )
    .leftJoin(tagTable, eq(tagTable.id, questionTagTable.tagId))
    .where(
      and(
        filters.search
          ? ilike(questionTable.title, `%${filters.search}%`)
          : undefined,
        filters.category ? eq(categoryTable.slug, filters.category) : undefined,
        filters.level ? eq(levelTable.name, filters.level) : undefined,
        filters.tag
          ? inArray(
              questionTable.id,
              db
                .select({ id: questionTagTable.questionId })
                .from(questionTagTable)
                .innerJoin(tagTable, eq(questionTagTable.tagId, tagTable.id))
                .where(eq(tagTable.name, filters.tag)),
            )
          : undefined,
      ),
    )
    .groupBy(questionTable.id, categoryTable.id, levelTable.id)
    .orderBy(asc(questionTable.title))

  return questions
}

export const getQuestionSlugs = async () => {
  'use cache'
  cacheLife('max')
  cacheTag('questions')
  const slugs = await db
    .select({
      slug: questionTable.slug,
    })
    .from(questionTable)

  return slugs.map((s) => s.slug)
}

export async function getQuestionBySlug(slug: string) {
  'use cache'
  cacheLife('max')
  cacheTag('questions')
  const [question] = await db
    .select({
      id: questionTable.id,
      title: questionTable.title,
      description: questionTable.description,
      answer: questionTable.answer,
      slug: questionTable.slug,
      sources: questionTable.sources,
      createdAt: questionTable.createdAt,
      category: {
        name: categoryTable.name,
        slug: categoryTable.slug,
        color: categoryTable.color,
      },
      level: { name: levelTable.name },
      tags: sql<
        string[]
      >`coalesce(array_agg(${tagTable.name} order by ${tagTable.name}) filter (where ${tagTable.name} is not null), '{}')`,
    })
    .from(questionTable)
    .innerJoin(categoryTable, eq(questionTable.categoryId, categoryTable.id))
    .innerJoin(levelTable, eq(questionTable.levelId, levelTable.id))
    .leftJoin(
      questionTagTable,
      eq(questionTagTable.questionId, questionTable.id),
    )
    .leftJoin(tagTable, eq(tagTable.id, questionTagTable.tagId))
    .where(eq(questionTable.slug, slug))
    .groupBy(questionTable.id, categoryTable.id, levelTable.id)

  return question ?? null
}

export async function getRelatedQuestions(question: {
  slug: string
  categorySlug: string
  levelName: string
}) {
  'use cache'
  cacheLife('max')
  cacheTag('questions')
  return db
    .select({
      title: questionTable.title,
      slug: questionTable.slug,
      level: { name: levelTable.name },
      tags: sql<
        string[]
      >`coalesce(array_agg(${tagTable.name} order by ${tagTable.name}) filter (where ${tagTable.name} is not null), '{}')`,
    })
    .from(questionTable)
    .innerJoin(categoryTable, eq(questionTable.categoryId, categoryTable.id))
    .innerJoin(levelTable, eq(questionTable.levelId, levelTable.id))
    .leftJoin(
      questionTagTable,
      eq(questionTagTable.questionId, questionTable.id),
    )
    .leftJoin(tagTable, eq(tagTable.id, questionTagTable.tagId))
    .where(
      and(
        eq(categoryTable.slug, question.categorySlug),
        eq(levelTable.name, question.levelName),
        ne(questionTable.slug, question.slug),
      ),
    )
    .groupBy(questionTable.id, categoryTable.id, levelTable.id)
    .orderBy(asc(questionTable.title))
    .limit(4)
}
