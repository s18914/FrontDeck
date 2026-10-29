---
title: How do you keep the main thread responsive when the page has to do heavy JavaScript work?
category: performance
level: senior
tags: [event-loop, concurrency, web-vitals]
sources:
  - title: Optimize long tasks – web.dev
    url: https://web.dev/articles/optimize-long-tasks
---

Any task that runs longer than **50 ms** is a **long task**: while it runs, the browser can't handle input or paint, which shows up as jank and poor **INP**. The fix is to **do less**, **break the work into smaller tasks and yield** between them, or **move it off the main thread** entirely.

**Yielding** lets the browser handle pending input and rendering between chunks:

```ts
async function processAll(items: Item[]) {
  for (const [i, item] of items.entries()) {
    process(item)
    if (i % 100 === 0) await yieldToMain()
  }
}

function yieldToMain() {
  if ('scheduler' in globalThis && 'yield' in scheduler) return scheduler.yield()
  return new Promise((resolve) => setTimeout(resolve, 0))
}
```

`scheduler.yield()` is preferred where supported because the continuation runs **ahead of other queued tasks**, while `setTimeout` puts it at the back of the queue. In handlers, update the UI first (show the spinner or the selected state), then yield, then do the rest.

**Web Workers** suit CPU-heavy work that doesn't touch the DOM: parsing large files, image processing, search indexing, complex calculations. Costs: no DOM access, data is **copied** via `postMessage` (structured clone), which is expensive for big objects unless you transfer `ArrayBuffer`s, and the code needs a message-based API (libraries like Comlink help).

Other tools:

- **Defer non-critical work** — analytics, prefetching — to idle time (`requestIdleCallback`) or after load.
- In React, **`startTransition`** makes large re-renders interruptible, so urgent updates like typing aren't blocked.
- Reduce the work itself: virtualize lists, avoid layout thrashing, ship less JavaScript (parsing and hydration are long tasks too).

Find long tasks in the DevTools **Performance panel** (red-marked tasks) and in the field with the **Long Animation Frames** API.
