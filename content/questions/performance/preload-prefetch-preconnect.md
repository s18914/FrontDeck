---
title: What is the difference between preload, prefetch and preconnect?
category: performance
level: mid
tags: [http, bundling]
sources:
  - title: rel=preload – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload
---

All three are resource hints in `<link>` tags. **Preload** fetches a resource the **current page** needs soon, at high priority. **Prefetch** fetches a resource a **future navigation** will probably need, at low priority. **Preconnect** only opens the **connection** (DNS, TCP, TLS) to an origin early, without downloading anything.

```html
<link rel="preload" href="/hero.avif" as="image" fetchpriority="high" />
<link rel="prefetch" href="/checkout.js" />
<link rel="preconnect" href="https://cdn.example.com" />
```

When to use which:

- **Preload** resources that are discovered late: fonts referenced in CSS, a hero image set as a CSS background, a critical script loaded by another script. It needs the correct **`as`** attribute. Preloading too much **competes with critical resources**, and an unused preload triggers a console warning.
- **Prefetch** the next likely step: the next page in a flow, a chunk behind a common click. It goes into the HTTP cache and is wasted bandwidth if the guess is wrong.
- **Preconnect** to a few important third-party origins (image CDN, API, font host). Keep it to two or three, since each open connection costs resources. `dns-prefetch` is a lighter fallback.

There is also **`modulepreload`** for JavaScript modules. Frameworks add many of these hints automatically, so check before adding your own.
