import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { loadEnvConfig } from '@next/env'
import { eq, inArray, sql } from 'drizzle-orm'
import type { BatchItem } from 'drizzle-orm/batch'
import {
  categoryTable,
  levelTable,
  questionTable,
  questionTagTable,
  repeatTable,
  tagTable,
  userTable,
} from '../schema'
import { LEVELS, loadContent, type QuestionContent } from './content'

type QuestionRow = typeof questionTable.$inferInsert

// jsonb does not keep key order, so compare sources field by field.
const sourcesKey = (sources: QuestionRow['sources']) =>
  JSON.stringify(sources?.map(({ title, url }) => [title, url]))

function hasChanged(existing: QuestionRow, next: QuestionRow) {
  return (
    existing.title !== next.title ||
    existing.description !== next.description ||
    existing.answer !== next.answer ||
    existing.categoryId !== next.categoryId ||
    existing.levelId !== next.levelId ||
    sourcesKey(existing.sources) !== sourcesKey(next.sources)
  )
}

async function main() {
  loadEnvConfig(process.cwd())
  // Imported after env is loaded, because the client reads DATABASE_URL on import.
  const { db } = await import('../index')

  const content = await loadContent(path.join(process.cwd(), 'content'))

  // Lookup tables: upserted by their natural key, never deleted.
  await db
    .insert(categoryTable)
    .values(content.categories)
    .onConflictDoUpdate({
      target: categoryTable.slug,
      set: { name: sql`excluded.name`, color: sql`excluded.color` },
    })
  await db
    .insert(levelTable)
    .values(LEVELS)
    .onConflictDoUpdate({
      target: levelTable.name,
      set: { rank: sql`excluded.rank` },
    })
  await db
    .insert(tagTable)
    .values(content.tags.map((name) => ({ name })))
    .onConflictDoNothing()

  const [categories, levels, tags, existingQuestions, users] =
    await Promise.all([
      db.select().from(categoryTable),
      db.select().from(levelTable),
      db.select().from(tagTable),
      db.select().from(questionTable),
      db.select({ id: userTable.id }).from(userTable),
    ])

  const categoryIds = new Map(categories.map((c) => [c.slug, c.id]))
  const levelIds = new Map(levels.map((l) => [l.name, l.id]))
  const tagIds = new Map(tags.map((t) => [t.name, t.id]))
  const existingBySlug = new Map(existingQuestions.map((q) => [q.slug, q]))

  const toRow = (q: QuestionContent, id: string): QuestionRow => ({
    id,
    slug: q.slug,
    title: q.title,
    description: q.description,
    answer: q.answer,
    sources: q.sources,
    categoryId: categoryIds.get(q.category)!,
    levelId: levelIds.get(q.level)!,
  })

  const inserts: QuestionRow[] = []
  const updates: QuestionRow[] = []
  const questionIds = new Map<string, string>()

  for (const question of content.questions) {
    const existing = existingBySlug.get(question.slug)
    const row = toRow(question, existing?.id ?? randomUUID())
    questionIds.set(question.slug, row.id!)

    if (!existing) inserts.push(row)
    else if (hasChanged(existing, row)) updates.push(row)
  }

  const questionTags = content.questions.flatMap((q) =>
    q.tags.map((tag) => ({
      questionId: questionIds.get(q.slug)!,
      tagId: tagIds.get(tag)!,
    })),
  )

  // neon-http has no interactive transactions, but a batch runs atomically,
  // so question rows, their tags and the repeats either all land or none do.
  const statements: BatchItem<'pg'>[] = []

  if (inserts.length) {
    statements.push(db.insert(questionTable).values(inserts))
  }
  for (const { id, ...row } of updates) {
    statements.push(
      db.update(questionTable).set(row).where(eq(questionTable.id, id!)),
    )
  }
  if (questionIds.size) {
    statements.push(
      db
        .delete(questionTagTable)
        .where(inArray(questionTagTable.questionId, [...questionIds.values()])),
    )
  }
  if (questionTags.length) {
    statements.push(db.insert(questionTagTable).values(questionTags))
  }
  // Every user has a repeat row for every question; existing ones are kept.
  const repeats = users.flatMap((user) =>
    [...questionIds.values()].map((questionId) => ({
      questionId,
      userId: user.id,
    })),
  )
  if (repeats.length) {
    statements.push(
      db.insert(repeatTable).values(repeats).onConflictDoNothing(),
    )
  }

  await db.batch(statements as [BatchItem<'pg'>, ...BatchItem<'pg'>[]])

  const removed = existingQuestions.filter((q) => !questionIds.has(q.slug))
  const unchanged = content.questions.length - inserts.length - updates.length

  console.log(
    `Seeded ${content.categories.length} categories, ${LEVELS.length} levels, ${content.tags.length} tags.`,
  )
  console.log(
    `Questions: ${inserts.length} added, ${updates.length} updated, ${unchanged} unchanged.`,
  )
  if (removed.length) {
    console.warn(
      `Not in content (left in the database, delete manually if intended): ${removed
        .map((q) => q.slug)
        .join(', ')}`,
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
