---
title: Where should the promise passed to use() be created, and why not during render of the same component?
category: react
level: senior
tags: [suspense, data-fetching, async]
sources: []
---

Create the promise **outside the render of the component that reads it**: in a Server Component, a router loader, an event handler or a **cache** keyed by its inputs, then pass it down. A promise created during render is a **new object on every render**. When the component suspends and React retries, it calls `fetch` again, gets another pending promise and suspends again, so you see the fallback forever or fire repeated requests.

Why `useMemo` or `useState` in the same component does not help: when a component **suspends before it has mounted**, React keeps none of its state, so those caches are thrown away on every attempt.

Good sources of stable promises:

- **Server Component to Client Component**: call `getComments(postId)` without awaiting it in the Server Component, pass the promise as a prop, and `use()` it on the client inside Suspense. The data streams in when ready.
- **A data-layer cache** keyed by arguments, or a Suspense-enabled library such as TanStack Query's `useSuspenseQuery`.
- **State in an already mounted parent**: create the promise in an event handler and store it with `setState`, usually inside a transition.

```tsx
const cache = new Map<string, Promise<User>>()

export function getUser(id: string) {
  if (!cache.has(id)) cache.set(id, fetchUser(id))
  return cache.get(id)!
}
// in a component: const user = use(getUser(id))
```

Senior considerations:

- **Start requests as early as possible**, ideally in parallel, so children do not wait for parents (render-as-you-fetch). This is the main defense against waterfalls.
- A hand-made cache needs **invalidation and eviction**, or it grows and serves stale data. Prefer the framework's or a library's cache.
- A **rejected promise stays rejected** in the cache. Retrying requires evicting the entry and creating a new promise, not just re-rendering.
