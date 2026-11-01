---
title: What are common mistakes when handling errors in async code?
category: javascript
level: mid
tags: [async, error-handling]
sources: []
---

The core rule is that **an error is only caught if the promise is awaited (or has `.catch`) inside the `try` block**. Most bugs come from promises that "escape" that handling.

Common mistakes:

- **Not awaiting a promise** inside `try` — `try { save() } catch {}` catches nothing if `save` is async. The rejection becomes an **unhandled rejection**.
- **`forEach` with an async callback** — `forEach` ignores returned promises, so errors and timing escape. Use `for...of` with `await` or `Promise.all(items.map(...))`.
- **Assuming `fetch` rejects on HTTP errors** — it only rejects on network failures. A 404 or 500 resolves normally, so you must check **`response.ok`**.
- **Swallowing errors** with an empty `catch`, which hides bugs and leaves the UI in a broken state.
- **Forgetting cleanup** — put things like hiding a spinner in **`finally`**, so they run on both success and failure.

```ts
const res = await fetch(url)
if (!res.ok) throw new Error(`Request failed: ${res.status}`)
```

As a safety net, browsers fire an **`unhandledrejection`** event, which is useful for logging to an error tracker.
