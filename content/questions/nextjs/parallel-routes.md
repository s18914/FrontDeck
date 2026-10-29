---
title: What are parallel routes and how do slots work?
category: nextjs
level: mid
tags: [routing]
sources:
  - title: Parallel Routes – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
---

Parallel routes let one layout render **several independent pages at the same time**. Each one is a **slot** defined by an `@folder`, and slots arrive in the parent layout **as props** next to `children`.

```tsx
// app/dashboard/layout.tsx, next to @team and @analytics folders
export default function Layout(props: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <>
      {props.children}
      <div className="grid">{props.team}{props.analytics}</div>
    </>
  )
}
```

Key behaviors:

- Slots are **not URL segments**: `@analytics/views/page.tsx` is served at `/dashboard/views`.
- Each slot can have its own **`loading.tsx` and `error.tsx`**, so widgets stream and fail independently.
- On **soft navigation**, a slot with no matching page keeps showing its previous content. On **hard navigation** (a refresh) Next.js can't recover that state and renders the slot's **`default.tsx`**. In Next.js 16 every slot **must have one**, or the build fails.

Typical uses: dashboards, role-based UI (render `@admin` or `@user`), and **modals** combined with intercepting routes. With role-based slots, remember that both slots render on the server, so authorize inside each one.
