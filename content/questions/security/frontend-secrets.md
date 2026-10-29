---
title: Why can't you keep secrets such as API keys in frontend code?
category: security
level: junior
tags: [bundling]
sources:
  - title: How to use environment variables in Next.js – Next.js docs
    url: https://nextjs.org/docs/app/guides/environment-variables
---

Everything sent to the browser — JavaScript bundles, HTML, network requests — is **public**. Minification is not protection: anyone can open DevTools, read the source or watch the Network tab.

In Next.js, environment variables are **server-only by default**. Variables prefixed with **`NEXT_PUBLIC_`** are **inlined into the client bundle at build time**, so they must never hold secrets.

```ts
process.env.PAYMENT_SECRET_KEY   // server only: Server Components, Route Handlers, Server Actions
process.env.NEXT_PUBLIC_MAPS_KEY // visible to every visitor
```

What to do instead:

- Call APIs that need a secret **from the server** and send only the result to the client.
- For keys that must be public (maps, analytics), **restrict them at the provider** by domain and quota.
- Add `import 'server-only'` to modules that touch secrets, so importing them into a Client Component fails the build.
- Never commit `.env` files with real secrets; use your hosting platform's secret settings.
