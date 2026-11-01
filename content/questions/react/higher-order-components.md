---
title: What are higher-order components, and are they still useful in modern React?
category: react
level: senior
tags: [component-patterns]
sources: []
---

A higher-order component (HOC) is a **function that takes a component and returns a new component** with added behavior, for example `withAuth(Dashboard)`. It was the main reuse pattern in the class-component era (Redux `connect`, `withRouter`). Today **hooks have replaced most HOCs**, but they still make sense for **wrapping a component from the outside** without touching its code.

```tsx
function withErrorBoundary<P extends object>(Component: ComponentType<P>, fallback: ReactNode) {
  function Wrapped(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
  Wrapped.displayName = `withErrorBoundary(${Component.displayName ?? Component.name})`
  return Wrapped
}
```

Why hooks won for sharing logic:

- **Wrapper hell**: several HOCs stack into deep trees in DevTools.
- **Implicit props and name collisions**: it is unclear which HOC injected a prop, and two HOCs can overwrite the same name.
- **Typing injected props** is awkward in TypeScript compared with a hook's return value.
- Extra chores: `displayName`, hoisting statics, passing refs through (simpler in React 19, where `ref` is a regular prop).

Rules if you write one:

- **Never create a HOC inside render.** Each call returns a new component type, so React remounts the subtree and loses its state on every render. Apply HOCs at module level.
- Pass through all props you do not consume.

Reasonable uses today: cross-cutting wrappers that **render something around** a component, such as an error boundary, Suspense, a feature-flag or permission gate, or integration code from a library. `memo` itself follows the same shape. For sharing data or logic, **prefer a custom hook**.
