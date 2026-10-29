---
title: What is a layout in the App Router and how do nested layouts behave?
category: nextjs
level: junior
tags: [routing, rendering]
sources: []
---

A `layout.tsx` is UI **shared by a segment and all its children**. It receives `children` (the page or nested layout below it) and wraps them.

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DashboardNav />
      {children}
    </section>
  )
}
```

Key behaviors:

- Layouts **nest**: `app/layout.tsx` wraps `app/dashboard/layout.tsx`, which wraps `app/dashboard/settings/page.tsx`.
- The **root layout** is required and must render `<html>` and `<body>`.
- When you navigate between pages that share a layout, the layout is **preserved**: it doesn't re-render or remount, so its client state (an open sidebar, a typed search) survives.
- Because of that, layouts **don't receive `searchParams`**. Read them in the page, or with `useSearchParams` in a Client Component.
- If you need a fresh instance on every navigation, use `template.tsx` instead.
