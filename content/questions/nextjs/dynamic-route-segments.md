---
title: How do you create a dynamic route like /blog/[slug] and read its value?
category: nextjs
level: junior
tags: [routing, async]
sources: []
---

Wrap a folder name in square brackets: `app/blog/[slug]/page.tsx` matches `/blog/hello`, `/blog/next-16` and so on. The value arrives in the page's **`params` prop, which is a Promise** in Next.js 16, so you `await` it.

```tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  return <h1>{post.title}</h1>
}
```

Variants:

- **Catch-all** `[...slug]` matches `/docs/a/b/c` and gives `slug: ['a', 'b', 'c']`.
- **Optional catch-all** `[[...slug]]` also matches the bare `/docs`.

Related tools:

- In a Client Component, read params with the **`useParams()`** hook.
- To prerender known values at build time, export **`generateStaticParams`** from the page.
- If the value doesn't exist in your data, call `notFound()` to return a 404.
