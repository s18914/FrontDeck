---
title: What are cacheLife and cacheTag used for in a cached function?
category: nextjs
level: mid
tags: [caching]
sources:
  - title: cacheLife – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/cacheLife
---

Both are called **inside a `'use cache'` scope** and describe when the cached entry should be refreshed.

**`cacheLife`** sets **time-based** behavior, either with a built-in profile (`'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'max'`) or an object with three values:

- **`stale`**: how long the **browser** may reuse the result without asking the server;
- **`revalidate`**: after this time, the next request still gets the cached value while a fresh one is generated in the background;
- **`expire`**: after this time, stale data is no longer served and the next request waits for a fresh result.

**`cacheTag`** attaches **labels** for **on-demand** invalidation. After a mutation you call `updateTag('posts')` (Server Actions only), which expires the tagged entries immediately so the next read waits for fresh data, or `revalidateTag('posts', 'max')`, which only marks them stale: the next request still gets the old value while a fresh one is generated in the background.

```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function getPost(id: string) {
  'use cache'
  cacheLife('days')
  cacheTag('posts', `post-${id}`)
  return db.post.findUnique({ where: { id } })
}
```

Tips: always pair `'use cache'` with an explicit `cacheLife`, otherwise the `default` profile (15-minute revalidate) applies silently. Very short lifetimes, like the `'seconds'` profile or `expire` under five minutes, are left out of the static shell and behave like dynamic holes.
