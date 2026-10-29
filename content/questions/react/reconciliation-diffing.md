---
title: How does React's reconciliation decide what to update in the DOM?
category: react
level: mid
tags: [rendering]
sources:
  - title: Preserving and Resetting State – React docs
    url: https://react.dev/learn/preserving-and-resetting-state
---

Reconciliation is React **comparing the new element tree with the previous one** to find the minimal set of DOM changes. A full tree diff is too expensive, so React uses heuristics that make it roughly linear.

The rules:

- **Different element type at the same position** (`<div>` becomes `<section>`, or `ComponentA` becomes `ComponentB`): React **destroys the old subtree** with all its state and mounts a new one.
- **Same type at the same position**: React **keeps the instance and its state**, and only updates changed props/attributes, then recurses into children.
- **Lists are matched by `key`**, not by order, so items can move without losing state.

Practical consequences:

- State is tied to a **position in the tree**, not to the component variable. The same component rendered in the same spot keeps its state, even across a ternary.
- Wrapping an element conditionally (`isMobile ? <div><Form /></div> : <Form />`) changes its position and **resets** `Form`.
- Defining a component **inside another component** creates a new type on every render, so it remounts each time.
- Changing a `key` deliberately forces a remount.
