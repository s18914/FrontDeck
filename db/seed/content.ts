import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

export const LEVELS = [
  { name: 'junior', rank: 1 },
  { name: 'mid', rank: 2 },
  { name: 'senior', rank: 3 },
]

const ANSWER_MARKER = '<!-- answer -->'

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be kebab-case')

const categoriesSchema = z.array(
  z.strictObject({
    slug: slugSchema,
    name: z.string().trim().min(1),
    color: z.string().regex(/^#[0-9a-f]{6}$/, 'must be #rrggbb'),
  }),
)

const tagsSchema = z.array(slugSchema)

const frontmatterSchema = z.strictObject({
  title: z.string().trim().endsWith('?'),
  category: slugSchema,
  level: z.enum(['junior', 'mid', 'senior']),
  tags: z.array(slugSchema).min(1).max(4),
  sources: z.array(
    z.strictObject({ title: z.string().trim().min(1), url: z.url() }),
  ),
})

export type Category = z.infer<typeof categoriesSchema>[number]

export type QuestionContent = z.infer<typeof frontmatterSchema> & {
  slug: string
  description: string | null
  answer: string
}

export type Content = {
  categories: Category[]
  tags: string[]
  questions: QuestionContent[]
}

export function parseQuestion(slug: string, raw: string): QuestionContent {
  const { data, content } = matter(raw)
  const frontmatter = frontmatterSchema.parse(data)
  const parts = content.split(ANSWER_MARKER)

  if (parts.length > 2) {
    throw new Error(`"${ANSWER_MARKER}" can appear at most once`)
  }

  const answer = parts.at(-1)!.trim()
  const description = parts.length === 2 ? parts[0].trim() : null

  if (!answer) throw new Error('answer is empty')
  if (description === '') throw new Error('description is empty')

  return { ...frontmatter, slug, description, answer }
}

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await fs.readFile(file, 'utf8'))
}

export async function loadContent(dir: string): Promise<Content> {
  const categories = categoriesSchema.parse(
    await readJson(path.join(dir, 'categories.json')),
  )
  const tags = tagsSchema.parse(await readJson(path.join(dir, 'tags.json')))

  const categorySlugs = new Set(categories.map((c) => c.slug))
  const tagNames = new Set(tags)
  const questions: QuestionContent[] = []
  const seenSlugs = new Map<string, string>()
  const errors: string[] = []

  const questionsDir = path.join(dir, 'questions')
  const folders = await fs.readdir(questionsDir, { withFileTypes: true })

  for (const folder of folders.filter((f) => f.isDirectory())) {
    const files = await fs.readdir(path.join(questionsDir, folder.name))

    for (const file of files.filter((f) => f.endsWith('.md'))) {
      const rel = `${folder.name}/${file}`
      const slug = file.slice(0, -'.md'.length)

      try {
        slugSchema.parse(slug)
        const raw = await fs.readFile(path.join(questionsDir, rel), 'utf8')
        const question = parseQuestion(slug, raw)

        if (question.category !== folder.name) {
          throw new Error(`category "${question.category}" ≠ folder`)
        }
        if (!categorySlugs.has(question.category)) {
          throw new Error(`unknown category "${question.category}"`)
        }
        const unknownTags = question.tags.filter((t) => !tagNames.has(t))
        if (unknownTags.length) {
          throw new Error(`unknown tags: ${unknownTags.join(', ')}`)
        }
        if (seenSlugs.has(slug)) {
          throw new Error(`duplicate slug, also in ${seenSlugs.get(slug)}`)
        }

        seenSlugs.set(slug, rel)
        questions.push(question)
      } catch (error) {
        const message =
          error instanceof z.ZodError
            ? z.prettifyError(error)
            : (error as Error).message
        errors.push(`${rel}: ${message}`)
      }
    }
  }

  if (errors.length) {
    throw new Error(`Invalid content:\n${errors.join('\n')}`)
  }

  return { categories, tags, questions }
}
