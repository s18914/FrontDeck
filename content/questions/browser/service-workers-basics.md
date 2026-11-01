---
title: What is a service worker and how does it enable offline support?
category: browser
level: mid
tags: [caching, http]
sources:
  - title: Using Service Workers – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
---

A service worker is a script that runs **in the background, separate from the page**, and acts as a **programmable network proxy**. It can intercept every request from its pages and answer from a **cache**, which makes offline mode possible.

```ts
// sw.ts
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached ?? fetch(event.request))
  )
})
```

Key points:

- **Lifecycle**: `register` → `install` (precache files) → `activate` (clean old caches) → controls pages. A new version **waits** until all tabs using the old one are closed, unless you call `skipWaiting()`.
- **Scope**: it controls pages under the path where it's served, and requires **HTTPS** (localhost is allowed).
- **No DOM access**; it talks to pages with `postMessage`.
- Common **caching strategies**: cache-first for static assets, network-first for API data, stale-while-revalidate for a mix.
- It also enables **push notifications** and background sync, and is a key part of a **PWA**.

The main pitfall is **stale content**: a bad caching strategy can keep serving an old app. Tools like **Workbox** help with versioning and strategies.
