---
title: What is the difference between Promise.all, Promise.allSettled, Promise.race and Promise.any?
category: javascript
level: mid
tags: [async]
sources:
  - title: Promise.allSettled() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
---

All four take several promises and return one, but they settle under different conditions:

- **`Promise.all`** — fulfills with **all results** when every promise fulfills; **rejects as soon as one rejects** (fail-fast).
- **`Promise.allSettled`** — **always waits for all** and returns an array of `{ status, value | reason }`. It never rejects.
- **`Promise.race`** — settles like **the first promise that settles**, whether it fulfills or rejects.
- **`Promise.any`** — fulfills with **the first successful result**; rejects with an `AggregateError` only if **all** reject.

Typical use cases:

- `all` — data that is needed together, e.g. a page that requires both user and settings.
- `allSettled` — independent operations where partial success is fine, like uploading several files.
- `race` — implementing a **timeout** against another promise.
- `any` — using the fastest of several mirrors or fallbacks.

Pitfall: when `Promise.all` rejects, the other operations **are not cancelled** — they keep running. Cancelling needs `AbortController`.
