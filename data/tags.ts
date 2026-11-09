import 'server-only'
import { db } from '@/db'
import { tagTable } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

export type TagsItem = Awaited<ReturnType<typeof getTags>>[number]

export const getTags = async () => {
  'use cache'
  cacheLife('max')
  cacheTag('tags')
  const tags = await db
    .select({
      name: tagTable.name,
    })
    .from(tagTable)
    .orderBy(asc(tagTable.name))

  return tags.map((tag) => tag.name)
}
