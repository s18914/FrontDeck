---
title: How do intercepting routes enable the modal pattern in Next.js?
category: nextjs
level: mid
tags: [routing]
sources:
  - title: Intercepting Routes – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes
---

An **intercepting route** shows another route **inside the current layout** during client-side navigation, while the URL changes to that route's real address. Combined with a **parallel route slot**, this gives the classic "photo opens in a modal over the feed" pattern:

- **Clicking** a link to `/photo/123` shows the photo in a **modal** over the feed. The URL is `/photo/123`, so it's shareable, and Back closes the modal.
- **Opening** `/photo/123` directly or **refreshing** shows the full standalone photo page, with no interception.

Folder prefixes are relative to **route segments**, not the file system:

- `(.)photo`: same level
- `(..)photo`: one level up
- `(..)(..)photo`: two levels up
- `(...)photo`: from the `app` root

A typical structure:

- `app/photo/[id]/page.tsx`: the full page
- `app/@modal/(.)photo/[id]/page.tsx`: the intercepted version wrapped in `<Modal>`
- `app/@modal/default.tsx`: returns `null` when no modal is open
- `app/layout.tsx`: renders both `{children}` and `{modal}`

Pitfall: `@slot` folders don't count as segments, so inside `@modal` you still use `(.)` for a sibling route. Close the modal with `router.back()`.
