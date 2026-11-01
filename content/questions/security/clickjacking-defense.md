---
title: What is clickjacking and how do you prevent it?
category: security
level: junior
tags: [http]
sources: []
---

Clickjacking is when an attacker **loads your site in an invisible iframe** on their own page and tricks the user into clicking it — for example, a "Claim your prize" button placed exactly over your hidden "Delete account" button. The click really happens on your site, with the user's session.

Defense: tell the browser that other sites may not frame your pages.

- **`Content-Security-Policy: frame-ancestors 'none'`** (or `'self'`, or a list of allowed origins) — the modern standard.
- **`X-Frame-Options: DENY`** or `SAMEORIGIN` — the older header, still worth sending for legacy browsers. When both are present, `frame-ancestors` wins.
- **`SameSite` cookies** help as well: with `Lax` or `Strict`, a cross-site iframe doesn't receive the session cookie, so the framed page appears logged out.

JavaScript "frame-busting" is unreliable — use headers. If your app must be embedded, allow specific origins instead of disabling protection.
