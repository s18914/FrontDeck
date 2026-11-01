---
title: How do ETag and If-None-Match let the browser revalidate a cached response?
category: networking
level: mid
tags: [caching, http]
sources:
  - title: HTTP conditional requests – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests
---

The server sends an **`ETag`** — an identifier of the resource version, often a hash of its content. When the cached copy is **stale** (or marked `no-cache`), the browser asks again with **`If-None-Match: "<etag>"`**. If nothing changed, the server replies **`304 Not Modified` with no body** and the browser reuses its copy.

```ts
// first response
// 200 OK            ETag: "a1b2c3"  + full body

// later, revalidation request
// GET /data.json    If-None-Match: "a1b2c3"
// 304 Not Modified  (no body – cached copy is reused)
```

Why it matters:

- It **saves bandwidth**, not round trips — the request still happens. To skip the request entirely you need freshness (`max-age`).
- The older alternative is **`Last-Modified` / `If-Modified-Since`**, which works on timestamps with one-second precision.
- **Weak ETags** (`W/"..."`) mean "semantically equivalent", e.g. differently compressed.
- ETags also enable **optimistic locking**: `If-Match` on a `PUT` fails with **412 Precondition Failed** if someone else changed the resource first.
