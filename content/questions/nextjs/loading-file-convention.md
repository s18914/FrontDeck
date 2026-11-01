---
title: What does a loading.tsx file do in the App Router?
category: nextjs
level: junior
tags: [suspense, routing]
sources: []
---

`loading.tsx` defines an **instant loading state** for a route segment. Next.js automatically wraps the segment's `page.tsx` (and everything below it) in a **React `<Suspense>` boundary** and uses this file as the fallback.

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />
}
```

What it gives you:

- **Immediate feedback** on navigation: the shared layout stays visible and interactive while the page streams in.
- The fallback can be **prefetched**, so even dynamic routes respond instantly to a click.
- Navigation stays **interruptible**: the user can click elsewhere before the page finishes.

Pitfall: `loading.tsx` sits **inside** the layout of the same segment, so it doesn't cover slow data fetched in that layout. For finer control, wrap individual slow components in your own `<Suspense>` instead of relying only on the route-level file.
