---
title: How does the built-in fetch API compare to axios?
category: networking
level: mid
tags: [data-fetching, http]
sources:
  - title: Using the Fetch API – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
---

**fetch** is the built-in, low-level, promise-based HTTP client: you set options yourself and **read and parse the body manually**. **axios** is a library that adds conveniences on top.

```ts
const res = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(post),
  credentials: 'include', // send cookies cross-origin
  cache: 'no-store',      // bypass the HTTP cache
  signal,                 // cancellation
})
const data = await res.json()
```

- **`credentials`** — default `same-origin`; `include` is needed for cookies on cross-origin requests.
- **`cache`** — controls the browser HTTP cache (`no-store`, `reload`, `force-cache`…).
- The body can be read **only once** (`json()`, `text()`, `blob()`); use `res.clone()` if you need it twice. `res.body` is a **stream**.

**axios** is a library on top of XHR/fetch that adds **automatic JSON**, **rejecting on non-2xx statuses**, **interceptors** (attach tokens, refresh on 401), timeouts, a `baseURL` and upload progress. fetch costs zero bundle size and works everywhere (browser, Node, edge), so many teams write a **small wrapper around fetch** instead.
