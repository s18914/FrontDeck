---
title: What is the difference between reflow and repaint, and what is layout thrashing?
category: browser
level: mid
tags: [rendering, dom]
sources:
  - title: Avoid large, complex layouts and layout thrashing – web.dev
    url: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
---

A **reflow** (layout) recalculates the size and position of elements; a **repaint** only redraws pixels without changing geometry. Reflow is more expensive, and it is usually followed by a repaint.

- **Triggers layout**: changing `width`, `height`, `margin`, `padding`, `top`, font size, adding or removing DOM nodes, resizing the window.
- **Only repaint**: `color`, `background-color`, `box-shadow`, `visibility`.
- **Neither** (composite only): `transform` and `opacity` on their own layer.

The browser normally **batches** style changes and does layout once per frame. **Layout thrashing** happens when you alternate writes and reads in a loop: reading `offsetHeight`, `getBoundingClientRect()` or `scrollTop` after a write forces a **synchronous layout** right now.

```ts
// Bad: read after write in every iteration
items.forEach((el) => {
  el.style.width = box.offsetWidth + 'px'
})

// Good: read once, then write
const width = box.offsetWidth
items.forEach((el) => (el.style.width = width + 'px'))
```

Fix it by **batching reads before writes**, or by scheduling writes in `requestAnimationFrame`.
