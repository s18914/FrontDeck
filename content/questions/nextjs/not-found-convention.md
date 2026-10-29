---
title: How do you show a custom 404 page in the App Router?
category: nextjs
level: junior
tags: [error-handling, routing]
sources:
  - title: Streaming – Next.js docs
    url: https://nextjs.org/docs/app/guides/streaming
---

Create a `not-found.tsx` file. It renders in two situations:

1. When you call **`notFound()`** from `next/navigation` in a segment: the closest `not-found.tsx` is shown.
2. For **unmatched URLs**: the root `app/not-found.tsx` handles them for the whole app.

```tsx
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  return <Article post={post} />
}
```

Things to know:

- `notFound()` **throws** a special error, so code after it doesn't run and you don't need `return`. Its type is `never`, so TypeScript knows `post` is defined afterwards.
- The response gets a **404** status, which matters for SEO, but only if `notFound()` runs **before streaming starts**. If a `loading.tsx` or another Suspense fallback has already been sent, the status is already 200, so Next.js adds `<meta name="robots" content="noindex">` instead.
- `not-found.tsx` is a Server Component by default, so it can fetch data, for example suggestions of related pages.
