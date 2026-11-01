---
title: How does Suspense show a loading state, and what can trigger it?
category: react
level: mid
tags: [suspense, data-fetching]
sources:
  - title: Suspense – React docs
    url: https://react.dev/reference/react/Suspense
---

`<Suspense fallback={...}>` shows the fallback **while any component inside it suspends**, then swaps in the real content once everything in that boundary is ready. Components do not report loading through state. They **suspend during render**, and React shows the fallback of the **nearest boundary above**.

Only **Suspense-enabled sources** can suspend:

- a `lazy()` component while its code downloads;
- reading a promise with `use()`;
- framework data fetching, such as async Server Components in Next.js, and libraries with a Suspense mode, such as `useSuspenseQuery` in TanStack Query.

A `fetch` inside `useEffect` does **not** trigger Suspense. That is ordinary state, and you render your own spinner.

Behavior worth knowing:

- A boundary reveals its content **as a unit**. Everything inside waits for the slowest part.
- **Nested boundaries** create a loading sequence: the outer shell first, details later.
- If **already visible** content suspends again after an update, the fallback replaces it. Wrapping the update in `startTransition` or using `useDeferredValue` keeps the old UI instead.
- Suspense handles **loading, not errors**. A failed request goes to the nearest error boundary, so pair the two.
