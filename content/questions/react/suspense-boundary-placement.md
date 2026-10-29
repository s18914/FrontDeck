---
title: How do you decide where to place Suspense boundaries, and how can data fetching inside them cause waterfalls?
category: react
level: senior
tags: [suspense, data-fetching, rendering]
sources:
  - title: Suspense – React docs
    url: https://react.dev/reference/react/Suspense
---

Place boundaries around **parts of the UI that should appear together**, following the loading sequence you want users to see: typically the page shell, then main content, then secondary widgets. Waterfalls appear when **each component starts its own fetch only when it renders**, so a child cannot even begin loading until its parent has finished suspending.

Placement guidance:

- **Too coarse**, like one boundary at the root: the whole page waits for the slowest request, and a spinner replaces everything.
- **Too fine**, a boundary around every component: a "popcorn" effect of many spinners popping in and shifting the layout.
- **Nest to reveal progressively.** Navigation and layout stay visible, the main content gets its own skeleton, slow widgets get theirs.
- Pair important boundaries with an **error boundary of the same granularity**, so loading and error states cover the same region.

A typical waterfall:

```tsx
function Profile({ userId }: { userId: string }) {
  const user = use(getUser(userId))  // suspends first...
  return <Posts authorId={user.id} /> // ...Posts starts fetching only afterwards
}
```

Fixes:

- **Start fetches early and in parallel** ("render-as-you-fetch"): kick off requests higher up, in a Server Component, route loader or event handler, and pass **promises** down. Children read them with `use()`.
- In Server Components, start independent requests **before awaiting** them, or use `Promise.all`.
- If one request truly depends on another (posts need the user id), accept the sequence but **move it to the server**, where latency between requests is much lower.

The goal is that boundaries control **what the user sees**, while the fetching strategy controls **when data starts loading**. Do not rely on rendering order to trigger requests.
