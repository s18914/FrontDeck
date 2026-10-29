---
title: How does Zustand work and how does it avoid unnecessary re-renders?
category: state-and-data
level: mid
tags: [state, rendering, hooks]
sources:
  - title: Introduction – Zustand docs
    url: https://zustand.docs.pmnd.rs/learn/getting-started/introduction
---

A Zustand store is a **plain object living outside React**, created with `create`. It holds both state and the actions that update it with `set`. Components read it through the generated hook and pass a **selector**, so they **re-render only when the selected value changes**.

```ts
const useCart = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
}))

const count = useCart((s) => s.items.length) // re-renders only when length changes
const addItem = useCart((s) => s.addItem)
```

Key points:

- **No provider** is needed. Any component, or even code outside React, can read the store.
- After each `set`, the hook re-runs the selector and compares the result with the previous one using **`Object.is`**.
- `set` **merges** the returned object into the state shallowly.

The classic pitfall is a selector that returns a **new object or array** every time, like `(s) => ({ a: s.a, b: s.b })`. The reference always differs, so the component re-renders on every store change (and Zustand v5 can even end in an infinite loop). Select primitives separately or wrap the selector in **`useShallow`**.
