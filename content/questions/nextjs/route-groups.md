---
title: What are route groups and when would you use them?
category: nextjs
level: mid
tags: [routing]
sources: []
---

A **route group** is a folder whose name is wrapped in parentheses, like `app/(marketing)`. It **organizes routes without affecting the URL**: `app/(marketing)/pricing/page.tsx` is simply `/pricing`.

Main uses:

- **Different layouts for sections at the same URL level**. `(marketing)/layout.tsx` has a public header, `(app)/layout.tsx` has the logged-in sidebar, yet `/pricing` and `/dashboard` both stay top-level URLs.
- **Opting some routes out of a shared layout**: put the routes that need the layout in a group together with it and leave the others outside.
- **Multiple root layouts**: remove `app/layout.tsx` and give each group its own root layout with `<html>` and `<body>`, for example a marketing site and an app shell with different fonts or providers.
- **Organizing code** by feature or team without changing URLs.

Pitfalls:

- Two groups must not resolve to the **same URL**, such as `(a)/about` and `(b)/about`. That's a build error.
- Navigating **between different root layouts** triggers a **full page load**, not a client-side transition.
