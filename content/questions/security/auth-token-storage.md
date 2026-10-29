---
title: Should you store an auth token in localStorage or in an HttpOnly cookie?
category: security
level: mid
tags: [auth, storage]
sources: []
---

For most web apps the safer default is an **HttpOnly, Secure, SameSite cookie** set by the server. A token in `localStorage` can be **read by any XSS** and replayed from the attacker's machine; an HttpOnly cookie can't be read by script, at the price of having to handle **CSRF**.

Trade-offs:

- **localStorage / sessionStorage** — easy to send as `Authorization: Bearer`, no CSRF by default, works across domains. But any injected script — including a compromised npm package or third-party tag — can read and steal it.
- **HttpOnly cookie** — invisible to JavaScript and sent automatically, so Server Components and Route Handlers see it too. Needs `SameSite` plus CSRF defenses; works best with a same-site API.
- **In memory only** — lost on reload, so usually paired with a refresh token in an HttpOnly cookie. Still reachable by XSS while the page is open, but not sitting in storage.

The key nuance: **HttpOnly doesn't make XSS harmless** — injected code can still send requests as the user while the page is open. It just avoids handing over a long-lived token. The strongest setup for SPAs is a **backend-for-frontend** that keeps tokens on the server.
