---
title: How does React.memo decide whether a component can skip re-rendering?
category: react
level: mid
tags: [memoization, rendering]
sources:
  - title: memo – React docs
    url: https://react.dev/reference/react/memo
---

When the parent re-renders, `memo` **shallowly compares** the new props with the previous ones, each prop with `Object.is`. If every prop is equal, React reuses the last result and skips rendering the component.

Key points:

- Primitives compare **by value**. Objects, arrays, functions and JSX compare **by reference**, so an inline `{}`, `() => {}` or `<Icon />` is a new prop on every render and memo never skips.
- **`children` is a prop too.** `<Card><p>Hi</p></Card>` passes a new element each time, which breaks memo on `Card`.
- memo only skips re-renders **caused by the parent**. The component still re-renders when its **own state** changes or a **context** it reads changes.
- An optional second argument, `arePropsEqual(prev, next)`, lets you customize the comparison. It must compare every prop, including functions. Deep equality checks can cost more than the render itself.
- memo is a **performance optimization, not a guarantee**. Never rely on it for correctness.

To make memo effective, keep props stable: pass primitives, hoist constants out of the component, or wrap values in `useMemo` and `useCallback`. With the **React Compiler**, components and their props are memoized automatically, so manual `memo` is rarely needed in new code.
