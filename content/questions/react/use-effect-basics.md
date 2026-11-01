---
title: What is useEffect used for?
category: react
level: junior
tags: [hooks, side-effects]
sources: []
---

`useEffect` lets a component **synchronize with something outside React**, such as a browser API, a subscription, a timer or a third-party widget. The effect runs **after React has updated the screen**, not during rendering.

```tsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)   // cleanup
}, [])                              // dependencies
```

The three parts:

- **Setup function**: the code that connects to the external system.
- **Cleanup function** (optional return): undoes the setup, runs before the next effect and on unmount.
- **Dependency array**: tells React when to re-run the effect.

Typical uses: subscribing to events (`resize`, WebSocket), starting timers, focusing or measuring the DOM, syncing with non-React code.

It is **not** for computing values from props or state, or for reacting to a button click; those belong in render and in event handlers.
