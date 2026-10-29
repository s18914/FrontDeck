---
title: When would you use useTransition, and what is the difference between urgent and non-urgent updates?
category: react
level: senior
tags: [concurrency, hooks]
sources:
  - title: useTransition – React docs
    url: https://react.dev/reference/react/useTransition
---

**Urgent updates** reflect direct interaction, like typing or clicking, and must feel instant. **Non-urgent updates** (transitions) are results that may lag slightly: switching tab content, filtering a big list, navigating. `useTransition` marks updates as non-urgent, so React keeps the UI responsive and can **interrupt** their rendering.

```tsx
const [isPending, startTransition] = useTransition()

function selectTab(next: Tab) {
  startTransition(() => {
    setTab(next) // heavy re-render, can be interrupted
  })
}
// use isPending to dim the old content or show an inline spinner
```

Behavior:

- The **old UI stays visible and interactive** while the new one renders in the background. `isPending` is `true` until the transition finishes.
- If the new content suspends, the transition **keeps already revealed content** on screen instead of falling back to a Suspense spinner.
- In React 19 the function can be **async**. It then becomes an Action, and `isPending` stays `true` until it settles. State updates **after an `await`** currently need another `startTransition`.
- Errors thrown inside the Action reach the nearest error boundary.

Limitations:

- You **cannot control a text input** with a transition. The input must update urgently. Keep two state variables or use `useDeferredValue`.
- It only works for state whose **`set` function you own**. For a value coming from props, use `useDeferredValue`.
- Updates scheduled inside a `setTimeout` in the callback are **not** marked as transitions.
- It is not debouncing: the work still happens, it is just **prioritized** below urgent updates.
