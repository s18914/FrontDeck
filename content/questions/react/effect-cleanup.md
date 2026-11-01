---
title: When does the cleanup function of useEffect run and what should it do?
category: react
level: mid
tags: [hooks, side-effects]
sources:
  - title: Synchronizing with Effects – React docs
    url: https://react.dev/learn/synchronizing-with-effects
---

The cleanup runs **before the effect runs again** (when dependencies change) and **when the component unmounts**. Its job is to **undo exactly what the setup did**, so the component never leaves work running in the background.

```tsx
useEffect(() => {
  function onResize() { setWidth(window.innerWidth) }
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])
```

Typical pairs:

- `addEventListener` / `removeEventListener`
- `setInterval` / `clearInterval`
- `connect` / `disconnect`, `subscribe` / `unsubscribe`
- starting a request / aborting it or ignoring its result

Important details:

- The cleanup **closes over the values from the render that created it**, so it disconnects from the old `roomId`, not the new one.
- In development, **StrictMode runs setup → cleanup → setup** once on mount to prove the cleanup works. If that double run causes a visible bug, the cleanup is missing or incomplete.
- Missing cleanups cause **memory leaks**, duplicate listeners and "update on unmounted component" style bugs.
