---
title: What is Partial Prerendering and how does the Cache Components model use it?
category: nextjs
level: mid
tags: [rendering, caching, suspense]
sources:
  - title: Caching – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/caching
---

**Partial Prerendering (PPR)** lets a single route mix static and dynamic content. At build time Next.js prerenders a **static shell** (HTML plus RSC payload) that can be served instantly from a CDN, leaving **holes** for request-dependent parts that **stream in** within the same response.

In Next.js 16 this is the default behavior once **Cache Components** is enabled (`cacheComponents: true`; new `create-next-app` projects have it on). The old `experimental.ppr` flag is gone. During prerendering each component ends up in one of three buckets:

- **Static**: pure computation, imports, synchronous work. Included in the shell automatically.
- **Cached**: marked with `'use cache'`. Its result is included in the shell and refreshed according to `cacheLife` and tags.
- **Dynamic**: reads `cookies()`, `headers()`, `searchParams` or uncached data. It must sit inside `<Suspense>`; the **fallback** goes into the shell and the content streams at request time.

If uncached or request-time data isn't covered by `'use cache'` or `<Suspense>`, Next.js reports an error instead of silently making the whole route dynamic.

The key benefit: a single `cookies()` call no longer turns the **entire page** dynamic, as it did in the previous model. Only the subtree that needs it waits.
