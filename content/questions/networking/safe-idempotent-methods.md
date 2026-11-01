---
title: What do safe and idempotent mean for HTTP methods, and how do PUT, PATCH and POST compare?
category: networking
level: mid
tags: [http]
sources:
  - title: Idempotent – MDN
    url: https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
---

A **safe** method doesn't change server state (`GET`, `HEAD`, `OPTIONS`). An **idempotent** method can be sent **once or many times with the same end result** on the server (all safe methods plus `PUT` and `DELETE`).

Every safe method is idempotent, but not the other way round. `PATCH` and `POST` are neither.

- **`PUT`** replaces the whole resource with the body, so sending it twice leaves the same state.
- **`PATCH`** applies a change. `{ "name": "Ann" }` is idempotent in practice, but `{ "op": "increment" }` is not — so the spec doesn't guarantee it.
- **`POST`** creates or triggers something, so a retry can create **duplicate orders**.

Why it matters: browsers, proxies and retry logic can **safely retry idempotent requests** after a timeout. For `POST`, APIs often use an **idempotency key** header so a retried payment isn't charged twice. Also, "idempotent" is about server state, not the response — a second `DELETE` may return 404 and still be idempotent.
