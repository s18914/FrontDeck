---
title: Why can components subscribed to a global store re-render too often, and how do selectors fix it?
category: state-and-data
level: senior
tags: [state, rendering, memoization]
sources:
  - title: Deriving Data with Selectors – Redux docs
    url: https://redux.js.org/usage/deriving-data-selectors
---

Stores like Redux and Zustand re-run every subscribed component's **selector after each update** and re-render the component when the result is **not reference-equal** to the previous one. So performance depends on **what a selector returns**, not only what it reads.

Common causes of extra re-renders:

- **Selecting too much** — `useSelector((s) => s)` or a whole slice re-renders on any change inside it.
- **Returning a new reference** each time — `.filter()`, `.map()` or an object literal in the selector creates a new value on every run, even when the data is the same.
- **Context instead of a store** — context has no selectors, so every consumer re-renders when the value changes.

Fixes:

```ts
// select the smallest value you need, ideally a primitive
const count = useSelector((s) => s.cart.items.length)

// memoize derived arrays so the reference stays stable
const selectDone = createSelector([(s: RootState) => s.todos], (todos) =>
  todos.filter((t) => t.done),
)
```

- Use several narrow selectors, or **shallow equality** (`shallowEqual` in react-redux, `useShallow` in Zustand) when you need an object of fields.
- Use **memoized selectors** (`createSelector`) for derived data. A memoized selector with parameters needs one instance per component, or it keeps recomputing.
- **Select by id in list items**: the parent selects only ids, each row selects its own entity. Editing one row re-renders only that row.
- Split large contexts by update frequency, or move fast-changing values to a store.

Verify with the React DevTools Profiler rather than guessing. Note that the React Compiler memoizes components and values, but it **can't fix a selector** that returns a new reference.
