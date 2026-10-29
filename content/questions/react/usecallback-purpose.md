---
title: What does useCallback actually do, and why does it not make a function faster?
category: react
level: mid
tags: [memoization, hooks, functions]
sources:
  - title: useCallback – React docs
    url: https://react.dev/reference/react/useCallback
---

`useCallback(fn, deps)` returns the **same function reference** across renders until a dependency changes. It does not stop the function from being created: the inline arrow is still created on every render, React simply hands back the cached one. It is equivalent to `useMemo(() => fn, deps)`.

So it only helps when **function identity matters**:

- the callback is passed to a **`memo` child**, where a new function on every render would defeat the memoization;
- the function is a **dependency** of `useEffect`, `useMemo` or another callback;
- a **custom hook returns it**, and consumers may put it in their dependency arrays.

```tsx
const handleSelect = useCallback((id: string) => {
  setSelected(prev => [...prev, id]) // updater form, so no deps needed
}, [])

return <ItemList items={items} onSelect={handleSelect} /> // ItemList is memo()
```

It is **useless** on a callback passed to a DOM element (`<button onClick>`) or to a non-memoized component: nothing compares the reference, and you just add a dependency array to maintain.

A common pitfall is **missing dependencies**, which leave the callback reading stale values. Using the updater form of `setState` keeps the dependency list short. With the **React Compiler**, callbacks are memoized automatically.
