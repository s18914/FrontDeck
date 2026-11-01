---
title: What do the HTTP status code classes mean, and which codes should every frontend developer know?
category: networking
level: junior
tags: [http, error-handling]
sources:
  - title: HTTP response status codes – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
---

The first digit tells you the **category of the result**: **1xx** informational, **2xx** success, **3xx** redirection, **4xx** client error (the request is wrong), **5xx** server error (the request was fine, the server failed).

The ones you meet daily:

- **200 OK** — success with a body. **201 Created** — a `POST` created something. **204 No Content** — success with no body (common for `DELETE`).
- **301 Moved Permanently** vs **302 Found** — permanent vs temporary redirect. **304 Not Modified** — your cached copy is still valid.
- **400 Bad Request** — malformed request. **401 / 403** — not logged in / not allowed. **404 Not Found**.
- **500 Internal Server Error** — unhandled bug. **503 Service Unavailable** — overloaded or in maintenance.

For error handling: a **4xx** usually means "show a message or fix the request", a **5xx** means "maybe retry later".
