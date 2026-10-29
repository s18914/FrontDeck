---
title: How does file-based routing work in the Next.js App Router?
category: nextjs
level: junior
tags: [routing]
sources:
  - title: Layouts and Pages – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/layouts-and-pages
---

In the `app` directory, **folders define URL segments** and a **`page.tsx` file makes a segment publicly accessible**:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/hello-world`

Key rules:

- A folder **without** `page.tsx` is not a route. That lets you **colocate** components, tests or helpers inside `app` without exposing them as URLs.
- A page is a React component exported as **default**, and it's a Server Component unless marked otherwise.
- Other **special files** add behavior to a segment: `layout.tsx` (shared UI), `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts` (an HTTP endpoint instead of a page).
- Special folder names change behavior: `[param]` for dynamic segments, `(group)` for route groups that don't affect the URL, `_folder` for private folders, `@slot` for parallel routes.
