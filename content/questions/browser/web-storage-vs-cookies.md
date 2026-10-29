---
title: What are the differences between localStorage, sessionStorage and cookies?
category: browser
level: junior
tags: [storage]
sources:
  - title: Web Storage API – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
---

All three store small strings in the browser, but they differ in **lifetime**, **scope** and whether the data is **sent to the server**.

- **`localStorage`** — persists **until cleared**, shared by all tabs of the origin, about 5 MB, **never sent** to the server.
- **`sessionStorage`** — lives while the **tab** is open, separate per tab.
- **Cookies** — about 4 KB, expire at a set date or with the session, and are **sent with every matching request**. The server can set them too.

Practical rules:

- Web Storage is **synchronous** and stores **strings only**.
- Any script on the page can read it, so never store **tokens or secrets** there.
- Use cookies when the **server needs the value**, like a session ID. `HttpOnly` cookies are hidden from JavaScript.
- In Next.js, read `localStorage` in an **Effect** or event handler, never during server rendering.
