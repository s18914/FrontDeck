---
title: What is the same-origin policy?
category: browser
level: junior
tags: [http]
sources:
  - title: Same-origin policy – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy
---

The same-origin policy is a browser rule that stops a script from one **origin** from **reading data** that belongs to another origin. An origin is the combination of **protocol, host and port**.

```ts
// Page on https://shop.com
'https://shop.com/cart'     // same origin
'http://shop.com'           // different protocol
'https://api.shop.com'      // different host
'https://shop.com:8080'     // different port
```

What it means in practice:

- `fetch` to another origin is sent, but the page **can't read the response** unless the server allows it (that's what **CORS** headers are for).
- A page can't access the DOM of a **cross-origin iframe** or window.
- `localStorage`, IndexedDB and other storage are **separated by origin**.

Embedding is generally allowed: `<img>`, `<script>`, `<link>` and `<iframe>` can load cross-origin resources, but JavaScript can't freely inspect their contents.

The goal is to prevent a malicious site from using your logged-in session to **read your data** on another site.
