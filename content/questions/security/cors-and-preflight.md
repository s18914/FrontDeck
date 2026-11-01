---
title: What is CORS, and when does the browser send a preflight request?
category: security
level: mid
tags: [http]
sources:
  - title: Cross-Origin Resource Sharing (CORS) – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
---

CORS is how a server **opts in to letting other origins read its responses** in the browser. The same-origin policy lets a page *send* many cross-origin requests but blocks JavaScript from *reading* the response, unless the server answers with headers such as `Access-Control-Allow-Origin`.

- **Simple requests** — `GET`, `HEAD` or `POST` with only basic headers and a `Content-Type` of `text/plain`, `multipart/form-data` or `application/x-www-form-urlencoded`. Sent directly; the browser checks the response headers before exposing it.
- **Preflighted requests** — anything else: `PUT`, `DELETE`, `Content-Type: application/json`, an `Authorization` header. The browser first sends `OPTIONS` asking which methods and headers are allowed, and sends the real request only if the server agrees. `Access-Control-Max-Age` caches the answer.
- **Credentials** — cookies need `credentials: 'include'` in `fetch` plus `Access-Control-Allow-Credentials: true` and an **explicit origin** (not `*`) on the server.

The key point: **CORS protects users, not your server**. The browser enforces it so other sites can't read data using the user's cookies. curl or a backend ignore it completely, and a simple request still **reaches** your server. So you still need authentication, authorization and CSRF protection. A CORS error is fixed on the server or with a same-origin proxy, not in frontend code.
