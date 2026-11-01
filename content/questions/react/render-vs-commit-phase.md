---
title: What is the difference between the render phase and the commit phase in React?
category: react
level: senior
tags: [rendering, side-effects]
sources:
  - title: Render and Commit – React docs
    url: https://react.dev/learn/render-and-commit
---

In the **render phase**, React calls your components to calculate what the UI should look like and compares the result with the previous tree. In the **commit phase**, React applies the resulting changes to the DOM and runs effects. Render is pure computation that can be repeated or thrown away. Commit is synchronous and always runs to completion.

Render phase:

- Runs component functions, hooks, reducers, `useMemo` calculations and state updater functions.
- Must be **pure**: no DOM mutations, subscriptions, network requests or writes to refs.
- With concurrent rendering it can be **paused, restarted or discarded**, and StrictMode runs it twice in development. A side effect placed here may run several times, or for UI that is never shown.

Commit phase:

- Inserts, updates and removes DOM nodes, and attaches or detaches refs.
- Runs `useLayoutEffect` cleanups and setups **synchronously, before the browser paints**.
- Schedules `useEffect`, which usually runs **after paint**.
- **Cannot be interrupted**, so the user never sees a half-applied update.

Practical consequences:

- **A render does not mean a DOM change.** If the output is the same, the commit has nothing to do. That is why many re-renders are cheap.
- Side effects belong in **event handlers or effects**, never in the component body.
- When profiling, a slow **render** points to expensive components, while a slow **commit** often points to large DOM changes or heavy layout effects.
