---
title: What is the difference between revalidatePath and revalidateTag?
category: nextjs
level: mid
tags: [caching, server-actions]
sources:
  - title: Revalidating – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/revalidating
---

Both invalidate cached data on demand after a mutation, but they target it differently:

- **`revalidatePath('/blog')`** invalidates what's cached for a **route path**. It's useful when you don't know, or never set up, which data feeds that page. Pass `'layout'` as the second argument to include nested routes.
- **`revalidateTag('posts', 'max')`** invalidates every cache entry **tagged** `posts` (through `cacheTag` or `fetch(url, { next: { tags } })`), **wherever it's used**: the blog list, a homepage widget, the sitemap.

Tags are **more precise** because they follow the data, not the URL. You don't miss other pages that show the same data, and you don't over-invalidate unrelated data on the same page. The docs recommend tags when possible.

Behavior in Next.js 16:

- `revalidateTag` takes a **second argument**, a `cacheLife` profile such as `'max'`, and uses **stale-while-revalidate**: a visitor may see old data once while fresh data is generated in the background. The one-argument form is deprecated.
- Both can be called in **Server Actions and Route Handlers**, for example from a CMS webhook.
- When the user must see their own change immediately, use **`updateTag`** in a Server Action instead.
