---
title: Are fetch requests cached by default in recent versions of Next.js?
category: nextjs
level: mid
tags: [caching, data-fetching]
sources:
  - title: fetch – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/fetch
---

No. Since **Next.js 15**, `fetch` in Server Components is **not stored in a persistent cache by default**. That reversed the Next.js 13–14 behavior, where `fetch` defaulted to `force-cache` and many teams were surprised by stale data.

What still happens automatically is **request memoization**: identical `GET` calls (same URL and options) during **one render pass** are deduplicated. A layout and a page can both call `getUser()` and only one network request goes out. That's per request, not a cache shared between users.

How to opt into caching:

- **With Cache Components**: wrap the data function in `'use cache'` and describe its lifetime with `cacheLife` and `cacheTag`.
- **Previous model**: `fetch(url, { cache: 'force-cache' })` to cache, `{ next: { revalidate: 3600 } }` for time-based refresh, `{ next: { tags: ['posts'] } }` for on-demand invalidation with `revalidateTag`.

Good to know:

- Memoization only covers `fetch`. For database or ORM calls, wrap the function in React's `cache` to get the same deduplication.
- Cache options on `fetch` have **no effect inside Proxy**.
- In development, `logging.fetches` in `next.config` shows which requests hit or skip the cache.
