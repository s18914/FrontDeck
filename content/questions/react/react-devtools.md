---
title: What can you do with React Developer Tools?
category: react
level: junior
tags: [rendering]
sources: []
---

React DevTools is a **browser extension** that shows the **component tree** instead of the plain DOM, and lets you inspect and debug components.

Main features:

- **Components tab**: select a component to see its **props, state, hooks and context**, edit values live, and see which component rendered it (owners).
- **Inspect from the page**: pick an element on screen and jump to the component that rendered it, or jump to its source code.
- **Highlight updates**: flash components when they re-render, a quick way to spot unnecessary renders.
- **Profiler tab**: record an interaction and see **which components rendered, how long they took and why** they rendered.

Typical interview angle: "How would you debug a component showing the wrong data?" Open DevTools, check its props and state, then walk up the tree to find where the value comes from.
