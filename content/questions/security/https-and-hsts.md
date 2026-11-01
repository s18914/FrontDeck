---
title: Why should every site use HTTPS, and what does HSTS add on top of it?
category: security
level: junior
tags: [http]
sources: []
---

**HTTPS** encrypts traffic with TLS and proves the server's identity with a certificate, so nobody on the network (public Wi-Fi, a proxy, an ISP) can **read or modify** pages, cookies or form data. **HSTS** (the `Strict-Transport-Security` header) tells the browser to **always use HTTPS** for the domain, even when the user types `http://` or clicks an old link.

Why HSTS matters: a plain HTTP-to-HTTPS redirect leaves the **first request unprotected**. An attacker can intercept it and keep the user on HTTP (**SSL stripping**). With HSTS the browser upgrades the request before sending anything.

Example: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

- `max-age` — how long, in seconds, the browser remembers the rule.
- `includeSubDomains` — applies it to every subdomain.
- `preload` — allows adding the domain to the list built into browsers, which protects even the very first visit.

Many modern APIs (service workers, geolocation) also require HTTPS.
