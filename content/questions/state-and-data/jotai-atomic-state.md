---
title: What is atomic state management, as used by Jotai?
category: state-and-data
level: mid
tags: [state, rendering]
sources: []
---

Atomic state splits global state into many small, independent units called **atoms**. Components subscribe only to the atoms they read, and **derived atoms** compute values from other atoms. It is a **bottom-up** model, unlike one big top-down store as in Redux.

```tsx
const priceAtom = atom(100)
const qtyAtom = atom(2)
const totalAtom = atom((get) => get(priceAtom) * get(qtyAtom)) // derived

function Total() {
  const total = useAtomValue(totalAtom) // re-renders only when total changes
  return <p>{total}</p>
}
```

Why teams pick it:

- **Fine-grained re-renders** without writing selectors — the dependency graph is tracked automatically.
- Feels like `useState`, but shareable across the tree.
- Works well for **many interdependent pieces of state**: editors, form builders, canvas tools.
- Async atoms integrate with **Suspense**.

Trade-offs: with hundreds of atoms, the data flow is harder to see than in a single store, and there is no central place for actions and middleware. For a handful of global values, context or Zustand is usually simpler.
