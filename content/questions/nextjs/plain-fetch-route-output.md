---
title: Is this page rendered statically or dynamically, given that fetch is not cached by default?
category: nextjs
level: mid
tags: [rendering, data-fetching, output-prediction]
sources: []
---

```tsx
// app/posts/page.tsx (Next.js 16, Cache Components not enabled)
export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts')
  const posts: { id: string; title: string }[] = await res.json()

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  )
}
```

<!-- answer -->

It is **static**. The page uses no request-time API (`cookies()`, `headers()`, `searchParams`, `connection()`), so Next.js **prerenders it during `next build`**. The `fetch` runs **once, at build time**, and every visitor gets that HTML. New posts won't appear until the next deploy or a revalidation.

Why it's a trap: since Next.js 15, `fetch` results aren't cached by default, but "not cached" doesn't mean "dynamic". A `fetch` with no `cache` option that runs before any request-time API is simply executed during prerendering.

Ways to change it:

- `fetch(url, { cache: 'no-store' })` or `await connection()` makes the page render **per request**;
- `fetch(url, { next: { revalidate: 60 } })` or `export const revalidate = 60` keeps it static but **regenerates** it at most once a minute.

With **Cache Components enabled**, the same code is reported as an error during prerendering: uncached data must either be cached with `'use cache'` or sit inside a `<Suspense>` boundary (or `loading.tsx`) so it streams at request time.
