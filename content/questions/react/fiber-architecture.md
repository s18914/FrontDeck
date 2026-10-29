---
title: What is React Fiber, and why did React need it?
category: react
level: senior
tags: [rendering, concurrency]
sources: []
---

Fiber is React's **reconciler**, used since React 16. It represents the component tree as a **linked structure of "fiber" objects**, one per component instance or host element, and processes them in a **work loop, one unit at a time**. It replaced the old stack reconciler, which walked the tree recursively and **could not stop** until a whole update was done, so a large update blocked the main thread and dropped frames and input.

A fiber holds the component type, key, props, the **hook state** (a linked list, which is why hook call order matters), pointers to its child, sibling and parent, flags describing pending DOM work, and the **priority lanes** of its updates.

What this design enables:

- **Incremental rendering.** The work is a loop over a data structure, not the JavaScript call stack, so React can pause after any fiber, yield to the browser and resume later.
- **Priorities.** Every update has a lane. An urgent update, like typing, can interrupt lower-priority transition work.
- **Double buffering.** React builds a **work-in-progress tree** next to the **current tree** shown on screen. Only a finished tree is committed, then the two swap roles. Abandoned work is simply thrown away, so partial results never reach the DOM.
- The foundation for **concurrent features**: transitions, `useDeferredValue`, Suspense and streaming hydration.

In an interview, you do not need internal field names. The key sentence: Fiber is **the data structure and scheduler that make rendering interruptible and prioritized**, which the recursive approach could not do.
