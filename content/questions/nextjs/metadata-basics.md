---
title: How do you set the page title and meta tags in the App Router?
category: nextjs
level: junior
tags: [server-components]
sources:
  - title: Metadata and OG images – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
---

Export a **`metadata` object** or a **`generateMetadata` function** from a `layout.tsx` or `page.tsx`. Next.js turns it into `<title>`, `<meta>` and Open Graph tags in the `<head>`.

```tsx
import type { Metadata } from 'next'

// static
export const metadata: Metadata = { title: 'Dashboard', description: 'Your stats' }

// dynamic, depends on route data
export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title }
}
```

Key points:

- Metadata exports work **only in Server Components** (layouts and pages).
- Metadata **merges down the tree**: a page overrides fields from parent layouts, and `title.template` in the root layout (for example `'%s | FrontDeck'`) formats child titles.
- `fetch` calls in `generateMetadata` and in the page are **memoized**, so loading the same post twice costs one request.
- File conventions like `opengraph-image.tsx`, `icon.png` and `sitemap.ts` cover images and SEO files.
