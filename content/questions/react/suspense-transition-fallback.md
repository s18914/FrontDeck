---
title: Why does an update wrapped in startTransition keep showing old content instead of the Suspense fallback?
category: react
level: senior
tags: [suspense, concurrency]
sources:
  - title: startTransition – React docs
    url: https://react.dev/reference/react/startTransition
---

Because a transition tells React the update is **non-urgent**, so React avoids **hiding content that is already visible**. If the new UI suspends, React keeps the previous UI on screen and interactive, and waits in the background. Without a transition, a suspending update to visible content immediately swaps it for the nearest fallback, which causes a jarring spinner flash.

```tsx
function navigate(url: string) {
  startTransition(() => {
    setPage(url) // if the new page suspends, the old page stays visible
  })
}
```

Details that matter:

- It only applies to **already revealed** boundaries. **New** `<Suspense>` boundaries inside the incoming content still show their fallbacks, and the transition does not wait for them. The result: the old page stays, then the new page appears with its own inner skeletons.
- Because no fallback appears, you need your own feedback: use **`isPending`** from `useTransition` to dim the old content or show a spinner on the clicked link.
- **Routers** (the Next.js App Router, React Router) run navigations as transitions, which is why the old page stays until the new page's shell is ready.
- **`useDeferredValue`** gives the same effect for a value: old search results stay visible while new ones suspend.

Sometimes stale content is wrong, for example navigating from one user's profile to another's: showing the previous user while loading is misleading. Give the boundary or the page component a **different `key`** per entity. React then treats it as new content and shows the fallback instead of the stale UI.
