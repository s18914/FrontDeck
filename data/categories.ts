import 'server-only'
import { db } from '@/db'
import { categoryTable } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

export type CategoriesItem = Awaited<ReturnType<typeof getCategories>>[number]

export const getCategories = async () => {
  'use cache'
  cacheLife('max')
  cacheTag('categories')
  const categories = await db
    .select({
      name: categoryTable.name,
      slug: categoryTable.slug,
      color: categoryTable.color,
    })
    .from(categoryTable)
    .orderBy(asc(categoryTable.name))

  return categories
}
