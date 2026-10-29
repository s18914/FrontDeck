---
title: What do the main Cache-Control directives do, and how is no-cache different from no-store?
category: networking
level: mid
tags: [caching, http]
sources:
  - title: Cache-Control – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
  - title: Prevent unnecessary network requests with the HTTP Cache – web.dev
    url: https://web.dev/articles/http-cache
---

`Cache-Control` tells browsers and shared caches (CDNs, proxies) **whether** a response may be stored and **how long it stays fresh**. The classic trap: **`no-cache` does not mean "don't cache"** — it means "store it, but **revalidate with the server** before every use". **`no-store`** means "never store it at all".

The directives you'll use most:

- **`max-age=N`** — fresh for N seconds; within that time the cache answers without any request.
- **`s-maxage=N`** — same, but only for **shared caches** (CDN); overrides `max-age` there.
- **`public` / `private`** — `private` limits storage to the user's browser (personalized data).
- **`immutable`** — the file will never change, so don't revalidate even on reload.
- **`stale-while-revalidate=N`** — serve the stale copy instantly while refreshing in the background.

Typical setup:

```ts
// hashed static assets (app.3f9a1c.js)
headers.set('Cache-Control', 'public, max-age=31536000, immutable')
// HTML – always check for a new version
headers.set('Cache-Control', 'no-cache')
// sensitive data (bank statement)
headers.set('Cache-Control', 'no-store')
```
