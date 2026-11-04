import 'server-only'
import { db } from '@/db'
import { tagTable } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { cache } from 'react'

export type TagsItem = Awaited<ReturnType<typeof getTags>>[number]

export const getTags = cache(async () => {
  const tags = await db
    .select({
      name: tagTable.name,
    })
    .from(tagTable)
    .orderBy(asc(tagTable.name))

  return tags.map((tag) => tag.name)
})
