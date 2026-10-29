---
title: How do you prevent race conditions when fetching data in useEffect?
category: state-and-data
level: mid
tags: [data-fetching, side-effects, hooks]
sources:
  - title: useEffect – React docs
    url: https://react.dev/reference/react/useEffect
---

When the dependencies change quickly (for example a search query or user id), several requests can be in flight and **responses can arrive out of order**, so an old response overwrites newer data. Fix it in the **cleanup function**: ignore or abort the outdated request.

```tsx
useEffect(() => {
  const controller = new AbortController()

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setUser)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err)
    })

  return () => controller.abort()
}, [userId])
```

How it works: before the effect runs again for a new `userId`, React runs the cleanup from the previous run, which **aborts the old request**. Only the latest response can call `setUser`.

The simpler variant is an **`ignore` flag**: set `let ignore = false`, check `if (!ignore) setUser(data)`, and set `ignore = true` in cleanup. It does not cancel the network request, but the stale result is dropped.

The same cleanup also handles the double effect run in **Strict Mode** during development. In real apps, a data library or Server Components solve this for you.
