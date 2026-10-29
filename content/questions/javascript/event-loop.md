---
title: How does the event loop work in JavaScript?
category: javascript
level: mid
tags: [event-loop, async]
sources:
  - title: JavaScript execution model – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model
---

JavaScript runs on a **single thread** with one **call stack**. The event loop lets it handle asynchronous work: when the call stack is empty, it **runs all queued microtasks**, then gives the browser a chance to **render**, and then takes the **next task** from the task queue.

The pieces:

- **Call stack** — the currently executing synchronous code.
- **Web APIs** — timers, network requests and DOM events run outside the JS thread. When they finish, they **queue a callback**.
- **Task queue** (macrotasks) — `setTimeout`, `setInterval`, UI events, messages.
- **Microtask queue** — promise callbacks, code after `await`, `queueMicrotask`. It is **drained completely** after each task.

Practical consequences:

- **Long synchronous code blocks everything**, including clicks and rendering — the page freezes.
- `setTimeout(fn, 0)` does **not run immediately**; it waits for the current code and all microtasks.
- Heavy computations should be split into chunks or moved to a **Web Worker**.
