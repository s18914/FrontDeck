---
title: What does it mean that pages and layouts are Server Components by default?
category: nextjs
level: junior
tags: [server-components]
sources:
  - title: Server and Client Components – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/server-and-client-components
---

In the App Router, a component is a **React Server Component** unless its file is marked with `'use client'` or imported from such a file. Server Components **run only on the server**: their code is never sent to the browser, only their rendered result (HTML and the RSC payload).

Benefits:

- **Data fetching close to the source**: components can be `async` and query a database directly.
- **Secrets stay on the server**: API keys never reach the bundle.
- **Less JavaScript** shipped to the browser.

Limits. A Server Component **cannot** use:

- state and effects (`useState`, `useEffect` and other client hooks),
- event handlers like `onClick`,
- browser APIs (`window`, `localStorage`),
- React context.

When you need any of these, move that piece into a small **Client Component** with `'use client'` at the top of its file.
