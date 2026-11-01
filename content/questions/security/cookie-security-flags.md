---
title: What do the HttpOnly, Secure and SameSite cookie attributes and the __Host- prefix do?
category: security
level: mid
tags: [storage, http, auth]
sources:
  - title: Set-Cookie header – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
---

These settings limit **who can read a cookie and when the browser sends it**, which is what makes a session cookie hard to steal or misuse.

- **`HttpOnly`** — JavaScript can't read it via `document.cookie`, so XSS can't exfiltrate it. It's still sent with requests, so injected script can act as the user while the page is open.
- **`Secure`** — sent only over HTTPS (localhost is an exception for development).
- **`SameSite`** — controls cross-site sending:
  - `Strict` — never cross-site, even when following a link from another site (users arrive "logged out").
  - `Lax` — sent on top-level navigations with GET, but not on cross-site POSTs, iframes or fetches. A good default.
  - `None` — always sent; requires `Secure`. Needed only for third-party embeds.
- **`__Host-` prefix** — the browser accepts the cookie only with `Secure`, `Path=/` and **no `Domain`**, which locks it to the exact host so a subdomain can't set or overwrite it. `__Secure-` only requires `Secure`.

Also avoid a broad `Domain` attribute (it shares the cookie with all subdomains) and keep `Max-Age` short for auth cookies.

A solid session cookie looks like: `Set-Cookie: __Host-session=…; Path=/; Secure; HttpOnly; SameSite=Lax`
