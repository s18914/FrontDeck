---
title: When should an API return 400, 409, 422 or 429, and how should the frontend handle each?
category: networking
level: mid
tags: [http, error-handling, forms]
sources: []
---

They all mean "the client did something wrong", but for different reasons: **400** the request is **malformed**, **422** it is well-formed but **fails validation**, **409** it **conflicts with the current state**, and **429** the client sent **too many requests**.

- **400 Bad Request** — invalid JSON, missing required parameter, wrong type. Usually a frontend bug: log it, show a generic error.
- **422 Unprocessable Content** — the JSON is fine, but `email` is not an email or `endDate` is before `startDate`. Map the returned field errors onto **form fields**.
- **409 Conflict** — the username is taken, or someone else edited the record first (version mismatch). Tell the user and offer to reload or merge.
- **429 Too Many Requests** — rate limit hit. **Back off** and retry after the time given in the **`Retry-After`** header, don't hammer the server.

In practice many APIs use 400 for validation errors too, so check the API's conventions. What matters for the frontend is that each case needs **a different user-facing reaction**, and the response body should carry machine-readable details.
