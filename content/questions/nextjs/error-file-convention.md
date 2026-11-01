---
title: How does error.tsx work and why must it be a Client Component?
category: nextjs
level: junior
tags: [error-handling]
sources:
  - title: error.js – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/file-conventions/error
---

`error.tsx` wraps a route segment in a **React error boundary**. If rendering that segment or its children throws, Next.js shows this component instead of crashing the page, and parent layouts stay usable.

```tsx
'use client'

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}
```

It must be a **Client Component** because error boundaries are a client-side React feature and the fallback needs interactivity, such as the **`retry`** button that re-fetches and re-renders the segment.

Pitfalls:

- It does **not** catch errors in the `layout.tsx` of the same segment, because the boundary sits inside that layout. Root layout errors need `global-error.tsx`.
- In production, errors from Server Components reach the client with a **generic message** and a `digest` for matching server logs, so details don't leak.
