---
title: When does useMemo actually improve performance, and when is it just overhead?
category: react
level: mid
tags: [memoization, hooks]
sources:
  - title: useMemo – React docs
    url: https://react.dev/reference/react/useMemo
---

`useMemo` caches the result of a calculation between renders and recomputes it only when a dependency changes (compared with `Object.is`). It pays off in **two cases**: the calculation is **genuinely expensive**, or you need a **stable reference** for something downstream.

```tsx
const visibleTodos = useMemo(
  () => todos.filter(t => matchesFilter(t, filter)),
  [todos, filter],
)
```

When it helps:

- **Heavy work** during render: filtering or sorting thousands of items, building large derived structures. Measure first (`console.time`, Profiler) instead of guessing.
- **Referential stability**: an object or array passed to a `memo` child, or used as a `useEffect` dependency, would otherwise be "new" on every render.

When it is just overhead:

- **Cheap calculations** like `a + b` or mapping ten items. Comparing dependencies costs about as much as recomputing.
- **Dependencies that change every render**, such as an inline object, so the cache never hits.
- The result goes to a **non-memoized child**, which re-renders anyway.

Treat it as a **performance hint, not a guarantee**: React may throw the cache away, so correctness must not depend on it. With the **React Compiler** enabled, most of this memoization happens automatically.
