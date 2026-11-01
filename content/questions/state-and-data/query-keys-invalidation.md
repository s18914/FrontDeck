---
title: How do query keys and query invalidation work in TanStack Query?
category: state-and-data
level: mid
tags: [caching, data-fetching]
sources:
  - title: Query Invalidation – TanStack Query docs
    url: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
---

A **query key** is an array that uniquely identifies cached data, and it must include **every variable the fetch depends on**. **Invalidation** marks matching queries as stale and **refetches the ones currently rendered**, usually after a mutation.

```ts
useQuery({
  queryKey: ['todos', { status, page }],
  queryFn: () => fetchTodos({ status, page }),
})

// after creating a todo
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

How it works:

- When the key changes (for example `page` goes from 1 to 2), it is a **different cache entry** and a new fetch happens automatically.
- Keys are hashed deterministically, so **object key order doesn't matter**.
- Invalidation uses **prefix matching**: `['todos']` matches `['todos', { page: 1 }]` and `['todos', 5]`. Use `exact: true` to match only one key.
- Inactive matching queries are only marked stale and refetch when they are used again.

Pitfalls: leaving a variable out of the key (the cache returns data for the **wrong input**), and inconsistent key shapes across files. Many teams use **query key factories** — one object that builds all keys for a feature.
