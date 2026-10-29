---
title: What does it mean that React components must be pure?
category: react
level: mid
tags: [rendering, side-effects]
sources:
  - title: Keeping Components Pure – React docs
    url: https://react.dev/learn/keeping-components-pure
---

A pure component **returns the same JSX for the same props, state and context**, and **changes nothing outside itself while rendering**. Rendering should only calculate; side effects go elsewhere.

Things that break purity during render:

- Mutating **props, state or variables declared outside** the component.
- Changing the DOM, starting requests, setting timers, writing to `localStorage`.
- Reading values that differ between calls, like `Date.now()` or `Math.random()`, without storing them.

```tsx
let guests = 0
function Cup() {
  guests = guests + 1          // impure: changes an outer variable
  return <p>Guest #{guests}</p>
}
```

Why React needs it:

- React may **call a component more than once**, render out of order, pause or **throw away** a render. Impure code then runs a random number of times.
- **StrictMode double-renders** in development precisely to catch this.
- Purity enables optimisations such as skipping or caching renders.

What is allowed: **local mutation** of objects created during the same render (for example building an array with `push`). Side effects belong in **event handlers** first, and in **effects** when they must run because the component is on screen.
