---
title: What is an error boundary and which errors does it not catch?
category: react
level: mid
tags: [error-handling, rendering]
sources:
  - title: Component – React docs
    url: https://react.dev/reference/react/Component
---

An error boundary is a component that **catches errors thrown while rendering its children** (and in their lifecycle methods and effects), and shows a **fallback UI** instead of unmounting the whole app.

It does **not** catch errors in:

- **Event handlers**: use `try`/`catch` there.
- **Asynchronous code** such as `setTimeout` callbacks or a rejected promise (errors inside a `startTransition` callback are an exception and do reach the boundary).
- **Server-side rendering**.
- **The boundary itself**: only its children are covered.

There is still **no hook-based API**; a boundary must be a **class component** with `static getDerivedStateFromError` (switch to the fallback) and optionally `componentDidCatch` (log to a monitoring service). In practice, teams use the **`react-error-boundary`** package or framework support; in the Next.js App Router an `error.tsx` file creates a boundary for a route segment.

Tips:

- Place boundaries at several levels (whole page, individual widgets) so one broken widget doesn't blank the screen.
- To show an async error in a boundary, store it in state and **throw it during render**.
- Provide a way to **reset** the boundary, for example a "Try again" button.
