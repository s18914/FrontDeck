---
title: What is the difference between staleTime and gcTime in TanStack Query?
category: state-and-data
level: mid
tags: [caching, data-fetching]
sources:
  - title: Important Defaults – TanStack Query docs
    url: https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
---

**`staleTime`** controls how long data is considered **fresh**. While fresh, it is served from the cache **without refetching**. **`gcTime`** controls how long **unused** cache entries (no component observing them) stay in memory before being **garbage collected**.

Defaults and what they mean:

- `staleTime: 0` — data is stale immediately, so a new mount, window refocus or reconnect triggers a **background refetch**. The user still sees the cached data instantly.
- `gcTime: 5 minutes` — after the last component using a query unmounts, its data stays around for 5 minutes. Coming back within that time shows it instantly.

```ts
useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: 60 * 60 * 1000, // rarely changes, don't refetch for an hour
})
```

Common confusion: **stale data is still shown**. Stale only means "eligible for refetch". The data disappears only when `gcTime` runs out.

Tune `staleTime` per query based on how often the data changes. Raising it is the usual fix for "too many requests". `gcTime` was called `cacheTime` before v5.
