---
title: What does it mean that concurrent rendering in React is interruptible?
category: react
level: senior
tags: [concurrency, rendering]
sources: []
---

React can **start rendering an update, pause to let the browser handle input or paint, and then resume, restart or discard that work**, instead of blocking the main thread until the whole tree is rendered. This applies to **non-urgent updates** such as transitions and deferred values. Urgent updates still render without yielding.

How it works:

- React renders in small units, one component at a time, and **yields** to the browser every few milliseconds to check for more urgent work.
- If an urgent update arrives, such as a keystroke, React **interrupts** the transition render, renders and commits the urgent update, then **restarts** the transition with the latest state.
- Rendering only builds a new tree in memory, so a half-finished tree is **thrown away safely**. The user never sees an inconsistent UI.
- The **commit phase is never interrupted**.

What it is not:

- **Not multithreading.** JavaScript still runs on one thread. This is cooperative scheduling.
- **Not a speed-up for one slow component.** If a single component does 200 ms of synchronous work, React cannot stop in the middle of it. It can only yield between components, so expensive components still need optimizing.
- **Not automatic.** You opt in per update with `startTransition`, `useDeferredValue` or Suspense-based features.

Consequences for your code: a render may run **more than once or never commit**, so render must be pure. Reading a mutable external store during an interrupted render can give different values to different components (tearing), which is why `useSyncExternalStore` exists.
