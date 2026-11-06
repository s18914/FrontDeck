import { getQuestionSlugs } from '@/data/questions'
import { siteUrl } from '@/lib/site-url'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl },
    { url: `${siteUrl}/questions` },
  ]

  if (process.env.SKIP_DB_PRERENDER) {
    return staticPages
  }

  const questions = await getQuestionSlugs()

  return [
    ...staticPages,
    ...questions.map((question) => ({
      url: `${siteUrl}/questions/${question}`,
    })),
  ]
}
