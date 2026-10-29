---
title: What do useRouter, usePathname and useSearchParams give you, and what are their limits?
category: nextjs
level: mid
tags: [routing, hooks]
sources: []
---

These hooks from **`next/navigation`** (not `next/router`, which belongs to the Pages Router) give **Client Components** access to navigation:

- **`useRouter()`**: imperative navigation with `push`, `replace`, `back`, `forward`, `prefetch`, and `refresh`, which re-fetches the current route's server data without losing client state.
- **`usePathname()`**: the current path as a string, like `/decks/42`, without the query string. Often used to highlight the active nav link.
- **`useSearchParams()`**: a **read-only `URLSearchParams`**. To change it, build a new `URLSearchParams` and navigate to the new URL.

```tsx
'use client'
const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()

function setSort(sort: string) {
  const params = new URLSearchParams(searchParams.toString())
  params.set('sort', sort)
  router.push(pathname + '?' + params.toString())
}
```

Limits:

- They work **only in Client Components**. In Server Components, use the page's `params` and `searchParams` props instead.
- In a **prerendered** route, `useSearchParams` makes the tree up to the nearest **`<Suspense>`** render on the client. Without a boundary the production build fails, so wrap that component in `<Suspense>`.
- For ordinary links prefer `<Link>`: it renders a real anchor and prefetches automatically.
