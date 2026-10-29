---
title: What are the main HTTP methods and what is each one used for?
category: networking
level: junior
tags: [http]
sources:
  - title: HTTP request methods – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
---

The HTTP method tells the server **what you want to do** with the resource at the URL. In a typical REST API:

- **`GET`** — read a resource. No body, should not change anything on the server.
- **`POST`** — create a resource or trigger an action (e.g. `POST /orders`, `POST /login`).
- **`PUT`** — **replace** a resource entirely with the body you send.
- **`PATCH`** — **partially update** a resource (send only the changed fields).
- **`DELETE`** — remove a resource.

Less common but worth knowing:

- **`HEAD`** — like `GET` but returns only headers (e.g. to check size or `Last-Modified`).
- **`OPTIONS`** — asks which methods are allowed; browsers send it automatically as the **CORS preflight**.

The method is a contract, not just a label: caches, proxies and browsers rely on it. For example, browsers cache `GET` responses and may retry them, but never silently resend a `POST`.
