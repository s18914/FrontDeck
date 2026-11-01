---
title: How do environment variables work in Next.js and what does the NEXT_PUBLIC_ prefix do?
category: nextjs
level: junior
tags: [bundling]
sources:
  - title: How to use environment variables in Next.js – Next.js docs
    url: https://nextjs.org/docs/app/guides/environment-variables
---

Next.js loads `.env*` files into `process.env` automatically. By default variables are **server-only**: available in Server Components, Route Handlers and Server Actions, but **not in the browser**.

Prefixing a variable with **`NEXT_PUBLIC_`** tells Next.js to **inline its value into the client bundle at build time**:

```ts
// .env.local contains NEXT_PUBLIC_API_URL=... and DB_PASSWORD=...
process.env.NEXT_PUBLIC_API_URL // works in Client Components too
process.env.DB_PASSWORD // server only; an empty string in client code
```

Pitfalls:

- **Never** put secrets behind `NEXT_PUBLIC_`. Anything inlined is readable by anyone who opens the JavaScript.
- Public values are **frozen at build time**. Changing them on the server later has no effect until you rebuild.
- Only literal access is replaced: `process.env[name]` with a variable is not inlined.
- `.env.local` overrides `.env` and should not be committed.
