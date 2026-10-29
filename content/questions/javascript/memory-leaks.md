---
title: What commonly causes memory leaks in frontend JavaScript?
category: javascript
level: mid
tags: [scope, events, side-effects]
sources: []
---

A memory leak happens when memory that is no longer needed is **still reachable**, so the garbage collector cannot free it. JavaScript frees memory based on **reachability**: anything referenced from a root (globals, the call stack, active closures) stays alive.

Typical causes in frontend apps:

- **Event listeners not removed** — especially on `window` or `document`, which outlive the components that added them.
- **Timers and intervals not cleared** — a running `setInterval` keeps its callback and everything it closes over alive.
- **Subscriptions** (WebSockets, observers, store listeners) that are never unsubscribed.
- **Detached DOM nodes** — elements removed from the page but still referenced from a variable or cache.
- **Ever-growing collections** — global arrays, maps or caches without limits.
- **Closures holding large objects** longer than needed.

In React, most of these come from a **missing `useEffect` cleanup**. The rule: whatever an effect sets up (listener, interval, subscription, request), its cleanup tears down.

To investigate, use the **Memory panel in Chrome DevTools**: take heap snapshots before and after repeating an action, and look for objects whose count keeps growing.
