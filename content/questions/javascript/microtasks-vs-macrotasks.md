---
title: What is the difference between microtasks and macrotasks?
category: javascript
level: mid
tags: [event-loop, async]
sources:
  - title: Using microtasks in JavaScript with queueMicrotask() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
---

**Macrotasks** (tasks) are scheduled units of work like `setTimeout` callbacks or UI events — the event loop runs **one task at a time**. **Microtasks** are smaller jobs, mostly **promise callbacks**, and the **whole microtask queue is emptied after every task**, before the next task or rendering.

What goes where:

- **Microtasks:** `.then` / `.catch` / `.finally` callbacks, code after `await`, `queueMicrotask()`, `MutationObserver`.
- **Macrotasks:** `setTimeout`, `setInterval`, DOM events, `MessageChannel`, network callbacks.

Consequences:

- A resolved promise callback **always runs before** a `setTimeout(…, 0)` scheduled at the same time.
- Microtasks queued by other microtasks **run in the same round**. An endless chain of microtasks therefore **starves rendering** and freezes the page, while recursive `setTimeout` does not.

```ts
setTimeout(() => console.log('task'), 0)
Promise.resolve().then(() => console.log('microtask'))
// microtask, task
```
