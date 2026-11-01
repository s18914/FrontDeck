---
title: How is useDeferredValue different from debouncing an input?
category: react
level: senior
tags: [concurrency, hooks]
sources:
  - title: useDeferredValue – React docs
    url: https://react.dev/reference/react/useDeferredValue
---

`useDeferredValue(value)` returns a copy of the value that **lags behind** during urgent updates. React first re-renders with the **old** deferred value, which is fast, then tries a background, **interruptible** render with the new one. Debouncing instead waits a **fixed delay** after the last keystroke before doing anything.

```tsx
const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)
const isStale = query !== deferredQuery

return (
  <>
    <input value={query} onChange={e => setQuery(e.target.value)} />
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <SlowResults query={deferredQuery} /> {/* must be memoized */}
    </div>
  </>
)
```

Key differences:

- **No fixed delay.** On a fast device the deferred render happens almost immediately. On a slow one it lags only as long as needed. A debounce always adds latency.
- **Interruptible.** If the user types again, React abandons the stale background render. A debounced update still **blocks** the main thread once it finally runs.
- The slow child must be wrapped in **`memo`** (or compiled by the React Compiler). Otherwise it re-renders during the urgent render anyway and nothing is gained.
- It works with **Suspense**: old results stay on screen while new ones load, instead of a fallback.

When debouncing still wins: reducing **work that is not rendering**, such as an API request on every keystroke or analytics events. `useDeferredValue` does not reduce the number of fetches. In practice you often combine both: a debounce for the request and a deferred value for the expensive rendering.
