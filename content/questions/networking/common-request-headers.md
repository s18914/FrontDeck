---
title: What are the Content-Type, Accept and Authorization request headers used for?
category: networking
level: junior
tags: [http, auth]
sources: []
---

**`Content-Type`** describes the format of the **body you are sending**, **`Accept`** says which format you **want back**, and **`Authorization`** carries the **credentials** that identify the caller.

```ts
await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ title: 'Hello' }),
})
```

Things worth knowing:

- Without `Content-Type: application/json` many servers won't parse a JSON body.
- When sending **`FormData`**, don't set `Content-Type` yourself — the browser adds `multipart/form-data` with the required boundary.
- `Authorization` usually holds a **Bearer token**. Cookies are sent automatically by the browser and cannot be set manually through `headers`.
