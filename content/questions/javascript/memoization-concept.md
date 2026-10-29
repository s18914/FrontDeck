---
title: What is memoization?
category: javascript
level: junior
tags: [memoization, functions]
sources:
  - title: Memoization – MDN Glossary
    url: https://developer.mozilla.org/en-US/docs/Glossary/Memoization
---

Memoization is **caching the result of a function call** based on its arguments, so repeated calls with the same input return the stored result instead of recomputing it.

```ts
function memoize(fn) {
  const cache = new Map()
  return (n) => {
    if (!cache.has(n)) cache.set(n, fn(n))
    return cache.get(n)
  }
}
```

Trade-offs to mention:

- It only works correctly for **pure functions** — otherwise the cached value can be wrong.
- It **trades memory for speed**; an unbounded cache can grow forever.
- Objects are compared **by reference**, so a new object with the same contents is a cache miss.

It pays off for **expensive** computations called repeatedly with the same arguments. In React the same idea appears as `useMemo`, `useCallback` and `React.memo`.
