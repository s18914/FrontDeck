---
title: When is Redux still worth using in a modern React app?
category: state-and-data
level: mid
tags: [state]
sources: []
---

Redux (via Redux Toolkit) is worth it when you have a **large amount of shared client state** that changes in **complex ways**, many people work on it, and you benefit from its **strict, predictable conventions** and tooling. For most new apps, it is not the first choice.

Good reasons to pick it:

- Complex client-side domain logic: editors, dashboards with many interacting panels, offline-first apps.
- You want **Redux DevTools** with action history and time-travel debugging.
- You need **middleware** for logging, analytics or side-effect orchestration.
- A big team benefits from one enforced pattern for where logic lives.
- The app already uses it — RTK makes it far less verbose than old Redux.

Reasons it is often unnecessary today:

- Most "global state" used to be **server data**, which TanStack Query, SWR or **Server Components** now handle better.
- The remaining client state is small, so **local state, context or Zustand** cover it with less ceremony.

If you choose Redux for server data anyway, use **RTK Query** rather than hand-written thunks and loading flags.
