---
title: What is proxy.ts in Next.js 16 and what should you not use it for?
category: nextjs
level: mid
tags: [routing, auth, http]
sources:
  - title: Proxy – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/proxy
---

`proxy.ts` is the Next.js 16 name for **middleware** (the file and the exported function were renamed). It runs **before a request is routed** and can **redirect, rewrite, set headers or cookies, or respond directly**. There's one file per project, at the root or in `src/`, and a `matcher` limits which paths it runs on.

```ts
import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (!request.cookies.has('session')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = { matcher: ['/dashboard/:path*'] }
```

Good uses: **optimistic** auth redirects (is a session cookie present?), A/B-test rewrites, locale redirects, adding headers, CORS.

Limits:

- **Not for slow data fetching**: it runs on every matching request before rendering, and `fetch` cache options have no effect there.
- **Not full authorization**: verify sessions and permissions again close to the data, in pages, Server Actions and Route Handlers. A matcher change can silently leave routes unprotected.
- It runs on the **Node.js runtime**, which can't be configured. Apps that need the Edge runtime keep the deprecated `middleware.ts`.
- Without a matcher it runs on **every request**, including static files and images.
- For fixed redirects, `redirects` in `next.config` is simpler.
