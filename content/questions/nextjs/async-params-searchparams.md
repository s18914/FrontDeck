---
title: Why are params and searchParams Promises in Next.js 16 and how do you use them?
category: nextjs
level: mid
tags: [routing, async]
sources:
  - title: page.js – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/file-conventions/page
---

Next.js 15 made the request APIs asynchronous with a temporary sync fallback, and **Next.js 16 removed synchronous access**. The `params` and `searchParams` props, as well as `cookies()`, `headers()` and `draftMode()`, are now **Promises** you must `await`.

```tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { tab } = await searchParams
  return <Deck id={id} tab={tab} />
}
```

Why: these values are **request data**. As Promises, they let Next.js prerender everything that **doesn't** await them and wait (or stream) only where they're actually read. A synchronous value would force the framework to know the request up front.

Practical tips:

- In a **Client Component** that receives the Promise as a prop, unwrap it with React's **`use()`** inside `<Suspense>`, or use `useParams` and `useSearchParams`.
- You can **pass the Promise down** and await it deeper in the tree to keep more of the page static.
- `next typegen` generates global helpers like `PageProps<'/decks/[id]'>` and `LayoutProps`.
- A search param can be a **string, an array or undefined**, so validate it before use.
