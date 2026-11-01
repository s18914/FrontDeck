---
title: What does React StrictMode do and why does it render components twice?
category: react
level: mid
tags: [rendering, side-effects]
sources:
  - title: StrictMode – React docs
    url: https://react.dev/reference/react/StrictMode
---

`<StrictMode>` enables **extra development-only checks** that surface bugs early. It renders no UI and has **no effect in production builds**.

What it does in development:

- **Renders components twice** (and calls `useState`/`useReducer` initialisers, updaters and `useMemo` callbacks twice) to expose **impure rendering**. A pure component gives the same result both times; one that mutates props or external variables shows the bug.
- **Runs every effect one extra time** on mount: setup → cleanup → setup. This exposes **missing cleanup**, such as a subscription that leaks or a connection opened twice.
- **Runs ref callbacks an extra time** in the same way.
- **Warns about deprecated APIs**.

Why it matters: React may render a component multiple times or throw away a render, and real users remount components (navigation, tabs). StrictMode simulates that so the bugs show up on your machine instead of in production.

Notes:

- With React DevTools installed, logs from the second render appear **dimmed** in the console.
- The fix for "my effect runs twice" is **a proper cleanup**, not a ref guard or removing StrictMode.
- Next.js App Router enables Strict Mode by default.
