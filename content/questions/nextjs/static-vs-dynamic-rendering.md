---
title: What is the difference between static and dynamic rendering in Next.js, and what makes a route dynamic?
category: nextjs
level: mid
tags: [rendering, caching]
sources:
  - title: generateStaticParams – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
---

**Static rendering (prerendering)** produces the HTML and RSC payload **at build time** or during revalidation, then serves the same result to everyone from cache or a CDN. **Dynamic rendering** produces it **per request**, because the output depends on something only the request knows.

Rendering becomes dynamic when the code uses **request-time data**:

- `cookies()`, `headers()`, `connection()`, `draftMode()`;
- the `searchParams` prop;
- data explicitly not cached, such as `fetch(url, { cache: 'no-store' })`.

A dynamic segment like `[slug]` is not dynamic by itself. Params returned by `generateStaticParams` are prerendered at build time, and other params (with the default `dynamicParams = true`) are rendered on the first request and then cached (ISR). Only a dynamic route without `generateStaticParams` renders on every request.

How granular that is depends on the model:

- **Without Cache Components** the decision is **per route**. One `cookies()` call anywhere in the tree makes the whole route dynamic, and `export const dynamic = 'force-dynamic'` or `'force-static'` can override the result.
- **With Cache Components** (`cacheComponents: true`) the unit is the **component**. Static parts and `'use cache'` results go into a prerendered **static shell**, and only the request-dependent parts inside `<Suspense>` render per request (Partial Prerendering).

In development every route renders on demand, so check the `next build` output or the dev tools indicator to see what you really get in production.
