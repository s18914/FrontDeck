---
title: How does the dependency array of useEffect control when the effect runs?
category: react
level: mid
tags: [hooks, side-effects]
sources:
  - title: Lifecycle of Reactive Effects – React docs
    url: https://react.dev/learn/lifecycle-of-reactive-effects
---

React re-runs an effect after a render **only if a dependency changed**, compared with `Object.is`.

- **No array**: runs after **every** render.
- **`[]`**: runs after the **first mount** only (cleanup on unmount).
- **`[a, b]`**: runs on mount and whenever `a` or `b` changes.

```tsx
useEffect(() => {
  const conn = connect(roomId)
  return () => conn.disconnect()
}, [roomId])
```

The key idea: you **don't choose** dependencies. Every reactive value the effect reads (props, state, values computed in the component) **must be listed**; the `react-hooks/exhaustive-deps` lint rule enforces it. Leaving one out creates a **stale closure** bug.

Common pitfalls:

- **Objects, arrays or functions created during render** are new on every render, so the effect runs every time. Move them inside the effect, outside the component, or depend on primitive fields instead.
- Setting state that is also a dependency causes an **infinite loop**.
- If you want to avoid a dependency, change the code so it isn't needed (for example an updater function), rather than suppressing the linter.
