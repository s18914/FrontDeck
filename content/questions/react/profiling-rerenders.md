---
title: How do you find out why a specific component re-rendered, and what does each render reason tell you?
category: react
level: senior
tags: [rendering, memoization]
sources: []
---

Record the interaction in the **React DevTools Profiler** with **"Record why each component rendered while profiling"** enabled, select the component in a commit and read its **render reason**. Each reason points to a different fix, so the skill is mapping the reason to its cause instead of adding `memo` everywhere.

The reasons and what they usually mean:

- **"The parent component rendered"**: the component has no reason of its own, it was dragged along. Move the parent's state down, pass the expensive part as `children`, or wrap the component in `memo`.
- **"Props changed: (onSelect, style)"** while the values look identical: these are **new references** created on every parent render, typically inline functions and objects. Stabilize them with `useCallback` / `useMemo`, hoist constants, or enable the React Compiler. If the prop really changed, the render is legitimate.
- **"Context changed"**: the provider's value changed, or was **recreated** without changing. Memoize the value, split the context, or move to a store with selectors.
- **"Hook N changed"**: the component's own state or a hook it uses updated. The number is the hook's call position, and DevTools can also show its name. Check whether that state belongs higher or lower, or whether a custom hook updates more often than needed.
- **"This is the first time the component rendered"** on every interaction: it is being **remounted**, not re-rendered. Look for a changing `key` or a component defined inside another component.

Also check **how much each render costs** in the ranked chart. A cheap component rendering often is fine, so only optimize renders that are both frequent and expensive. Libraries like why-did-you-render apply the same reasoning automatically in development by logging renders where props were equal by value but not by reference.
