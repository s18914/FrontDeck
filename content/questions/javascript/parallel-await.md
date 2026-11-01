---
title: How do you run independent async operations in parallel instead of sequentially?
category: javascript
level: mid
tags: [async]
sources: []
---

**Start all the promises first, then await them together** with `Promise.all`. Awaiting each call on its own line makes them run **one after another**, so the total time is the sum instead of the longest one.

```ts
// sequential – ~2 seconds if each takes 1s
const user = await getUser()
const posts = await getPosts()

// parallel – ~1 second
const [user, posts] = await Promise.all([getUser(), getPosts()])
```

Things to keep in mind:

- Use sequential `await` **only when one call depends on the result of another**.
- A `for...of` loop with `await` inside is sequential; **`Promise.all(items.map(fn))`** is parallel.
- Choose `Promise.allSettled` if one failure should not discard the other results.
- Firing hundreds of requests at once can overload the server or hit rate limits, so for large lists use **limited concurrency** (batches or a small pool).

This "request waterfall" is a frequent performance problem in frontend apps — the same idea applies to data fetching in React and Next.js components.
