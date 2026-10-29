---
title: How does request memoization work in Server Components, and when do you need React cache?
category: nextjs
level: mid
tags: [memoization, data-fetching]
sources:
  - title: cache – React docs
    url: https://react.dev/reference/react/cache
---

During a single server render, Next.js **memoizes `fetch`**: identical `GET` calls (same URL and options) from the layout, the page, `generateMetadata` and nested components produce **one network request**. That's why you can call `getUser()` wherever you need it instead of fetching once at the top and prop-drilling.

This automatic deduplication **only covers `fetch`**. For an ORM or a database client, wrap the function in React's **`cache`**:

```ts
import { cache } from 'react'
import 'server-only'

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})
```

Now every `getUser('42')` in the same request shares one promise and one query.

Important limits:

- The scope is **one request**. Nothing is shared between users or requests, so this is deduplication, not caching. For persistence, use `'use cache'`.
- Arguments are compared by **identity**, so pass primitives. A new object literal on every call is always a miss.
- Define the cached function at **module level**. Creating it inside a component gives each render its own empty cache.
- React supports `cache` only in **Server Components**.
