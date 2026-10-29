---
title: What does the use cache directive do and what are its constraints?
category: nextjs
level: mid
tags: [caching]
sources:
  - title: use cache – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/directives/use-cache
---

`'use cache'` (part of Cache Components) marks an **async function, a component or a whole file** as cacheable. Next.js stores its **return value** and reuses it for later calls with the same inputs, across requests, not just within one render.

```tsx
import { cacheLife, cacheTag } from 'next/cache'

export async function getProducts(category: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('products')
  return db.product.findMany({ where: { category } })
}
```

How it works:

- The **cache key** is built from the build ID, the function's identity and its **serialized arguments plus captured closure variables**, so `getProducts('shoes')` and `getProducts('hats')` are separate entries.
- At build time, cached results become part of the **static shell**. At runtime, entries live in an in-memory LRU by default; `'use cache: remote'` moves them to a shared store.

Constraints:

- The function must be **async**.
- You **can't call `cookies()` or `headers()`, or read `searchParams`, inside it**. Read them outside and pass the values in as arguments.
- Arguments and return values must be **serializable**. Non-serializable values like `children` can only be **passed through** untouched.
- Unlike React's `cache`, which deduplicates within one request, `'use cache'` **persists** results.
