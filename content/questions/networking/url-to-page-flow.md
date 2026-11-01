---
title: What happens between typing a URL into the browser and seeing the page?
category: networking
level: mid
tags: [http, rendering]
sources:
  - title: Populating the page – how browsers work – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work
---

The browser **resolves the domain to an IP address**, **opens a secure connection**, **sends an HTTP request**, receives the HTML and then **parses and renders** it, fetching more resources along the way.

Step by step:

1. **URL parsing and caches** — the browser checks whether it's a search or a URL, applies HSTS (force HTTPS), and may answer from a service worker or the HTTP cache.
2. **DNS lookup** — browser, OS and resolver caches are checked; otherwise a DNS resolver finds the IP.
3. **Connection** — a **TCP handshake** followed by a **TLS handshake** (certificate check, key exchange). With HTTP/3 both happen together over **QUIC**.
4. **HTTP request** — `GET /` with headers such as `Accept`, cookies and `Accept-Encoding`. It often hits a **CDN** rather than the origin.
5. **Response** — status code, headers (caching, cookies, content type) and the HTML body, possibly redirected first (301/302).
6. **Rendering** — the HTML is parsed into the DOM, CSS into the CSSOM, discovered resources are requested, then layout and paint.

Good answers mention that **each round trip costs latency**, which is why CDNs, connection reuse and caching matter.
