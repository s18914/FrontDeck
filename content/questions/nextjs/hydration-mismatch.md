---
title: What causes a hydration mismatch and how do you fix it?
category: nextjs
level: mid
tags: [hydration]
sources:
  - title: Text content does not match server-rendered HTML – Next.js docs
    url: https://nextjs.org/docs/messages/react-hydration-error
---

**Hydration** is React attaching event handlers and state to the HTML the server already rendered. React expects the **first client render to produce exactly the same markup**. If it doesn't, you get a hydration error and React re-renders that part on the client, losing the server-rendering benefit.

Common causes:

- **Non-deterministic values** in render: `Date.now()`, `Math.random()`, or `toLocaleString()` when the server and browser use different time zones or locales.
- **Browser-only checks** in render: `typeof window !== 'undefined'`, `localStorage`, `matchMedia`.
- **Invalid HTML nesting**, such as a `<div>` inside a `<p>` or a link inside a link. The browser "repairs" the DOM, so it no longer matches.
- **Browser extensions** or a CDN modifying the HTML.

Fixes:

- Render the same output on both sides first, then switch to client-only values in **`useEffect`**, for example with a `mounted` flag.
- Load a browser-only component with **`next/dynamic`** and `ssr: false`, from a Client Component.
- Compute the value **once on the server** and pass it down, for example a formatted date.
- For unavoidable differences like a timestamp, add **`suppressHydrationWarning`** to that element. It works one level deep and is an escape hatch, not a fix.
