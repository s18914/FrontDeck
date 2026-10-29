---
title: How does request deduplication work in client-side data fetching?
category: state-and-data
level: mid
tags: [caching, data-fetching, async]
sources: []
---

Deduplication means that when several components ask for **the same data at the same time**, only **one network request** is sent, and all of them receive the **same promise or result**. Libraries like TanStack Query and SWR do it by keying requests: a second request for a key that is already in flight **reuses the pending promise**.

A minimal version of the idea:

```ts
const inFlight = new Map<string, Promise<unknown>>()

function dedupedFetch<T>(url: string): Promise<T> {
  const existing = inFlight.get(url)
  if (existing) return existing as Promise<T>

  const promise = fetch(url)
    .then((res) => res.json())
    .finally(() => inFlight.delete(url))
  inFlight.set(url, promise)
  return promise as Promise<T>
}
```

Deduplication is about **concurrent** requests. **Caching** goes further: it keeps the resolved data after the request ends, so later requests are skipped while the data is **fresh** (`staleTime` in TanStack Query).

Why it matters: a header, sidebar and page can all call `useUser()` without coordinating, and you still get one request. Pitfalls when doing it by hand: the key must include every parameter, failed promises must be removed so they can be retried, and the cache needs a way to **expire or invalidate** entries.
