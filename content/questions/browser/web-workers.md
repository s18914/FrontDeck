---
title: What are Web Workers and when would you use one?
category: browser
level: mid
tags: [concurrency, async]
sources:
  - title: Using Web Workers – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
---

A Web Worker runs JavaScript on a **separate background thread**, so heavy computation doesn't **block the main thread** where rendering and user input happen. You communicate with it by **sending messages**.

```ts
// main thread
const worker = new Worker(new URL('./parse.worker.ts', import.meta.url), { type: 'module' })
worker.postMessage(hugeCsvText)
worker.onmessage = (e) => setRows(e.data)

// parse.worker.ts
self.onmessage = (e) => self.postMessage(parseCsv(e.data))
```

Key points:

- Workers have **no access to the DOM**, `window` or `localStorage`. They do have `fetch`, timers, IndexedDB and WebSockets.
- Data passed with `postMessage` is **copied** (structured clone). Big binary data like `ArrayBuffer` can be **transferred** instead to avoid copying.
- Starting a worker has a cost, so it pays off only for **long tasks**: parsing large files, image processing, encryption, search over big datasets.

Don't confuse them with **service workers**, which sit between the page and the network for caching and offline support. A Web Worker belongs to one page and exists only to offload work.
