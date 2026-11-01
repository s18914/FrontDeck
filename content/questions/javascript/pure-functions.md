---
title: What is a pure function?
category: javascript
level: junior
tags: [functions, side-effects]
sources: []
---

A pure function **always returns the same output for the same input** and has **no side effects** — it does not modify anything outside itself (no mutating arguments or global variables, no DOM changes, network calls or logging).

```ts
const add = (a, b) => a + b // pure

let total = 0
const addToTotal = (x) => (total += x) // impure – changes outer state
```

Why it matters:

- Pure functions are **easy to test and reason about** — no setup or hidden dependencies.
- Their results can be **safely cached** (memoized).
- **React requires components to be pure during rendering**: the same props and state must produce the same JSX. Side effects belong in event handlers or effects. StrictMode renders components twice in development precisely to expose impure rendering.

Note that `Date.now()` or `Math.random()` inside a function also make it impure, because the output no longer depends only on the input.
