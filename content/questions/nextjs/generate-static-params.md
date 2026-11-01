---
title: What does generateStaticParams do and what happens to params it doesn't return?
category: nextjs
level: mid
tags: [routing, rendering]
sources:
  - title: generateStaticParams – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
---

`generateStaticParams` is exported from a dynamic route (a page, layout or route handler under `[slug]`) and returns the **list of param values to prerender at build time**. It replaces `getStaticPaths` from the Pages Router.

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

Each returned object becomes a prerendered page (`/blog/a`, `/blog/b`...), served instantly from the cache and fully prefetchable.

What happens to params that aren't in the list:

- By default (`dynamicParams = true`) they're **rendered on the first request** and then cached. That's the "prerender the top 100 posts, render the long tail on demand" pattern.
- With `export const dynamicParams = false` they return **404**.
- If the route has no `generateStaticParams` at all, it renders dynamically at request time.

Details: it runs **before** the pages are generated, `fetch` calls inside it are memoized together with the page's, and with **Cache Components** it must return **at least one** param, because an empty array is a build error.
