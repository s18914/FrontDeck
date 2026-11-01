---
title: What causes a React component to re-render?
category: react
level: mid
tags: [rendering, state]
sources:
  - title: Render and Commit – React docs
    url: https://react.dev/learn/render-and-commit
---

A component re-renders when **its own state changes**, when **its parent re-renders**, or when a **context it reads changes**. A re-render means React calls the component function again; it does not necessarily change the DOM.

Details that often come up:

- **Parent re-render re-renders all children** by default, even if their props are identical. "Props changed" is not a trigger on its own; props only change because the parent rendered.
- Setting state to the **same value** (compared with `Object.is`) lets React bail out: children are not re-rendered and effects don't run. React may still call the component itself once before bailing out, so don't rely on it never running.
- Mutating an object in state and passing the same reference does **not** trigger a render, which is why state must be immutable.
- Changing a **ref** or a plain variable never causes a re-render.
- After rendering, React **commits only the differences** to the DOM. Many re-renders are cheap and harmless.

Re-renders become a problem only when a component is genuinely expensive. First fix it structurally: move state down closer to where it is used, or pass components as `children` so they are not re-created by a parent's state changes.
