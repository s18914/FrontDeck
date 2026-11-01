---
title: How do you cancel a fetch request in JavaScript?
category: javascript
level: mid
tags: [async]
sources:
  - title: AbortController – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
---

Create an **`AbortController`**, pass its **`signal`** to `fetch`, and call **`controller.abort()`** when the request is no longer needed. The fetch promise then rejects with an error whose `name` is **`'AbortError'`**.

```ts
const controller = new AbortController()

fetch('/api/search?q=react', { signal: controller.signal })
  .then((res) => res.json())
  .catch((err) => {
    if (err.name !== 'AbortError') throw err
  })

controller.abort()
```

Where it is used:

- **Cleanup in React effects** — abort in the cleanup function when the component unmounts or the dependencies change.
- **Search-as-you-type** — abort the previous request so an older response cannot overwrite a newer one (a **race condition**).
- **Timeouts** — `fetch(url, { signal: AbortSignal.timeout(5000) })`.

The same signal works beyond fetch: `addEventListener(type, fn, { signal })` removes the listener on abort. Remember to **ignore `AbortError`** in error handling, because it is expected, not a failure.
