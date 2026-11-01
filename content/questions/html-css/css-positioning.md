---
title: What are the differences between static, relative, absolute, fixed and sticky positioning?
category: html-css
level: junior
tags: [css-layout]
sources: []
---

The `position` property controls whether an element stays in **normal flow** and what `top`, `right`, `bottom` and `left` are measured from.

- **`static`** (default) — normal flow; offsets and `z-index` have no effect.
- **`relative`** — stays in flow but can be **shifted**; its original space stays reserved. Often used as the reference point for absolute children.
- **`absolute`** — **removed from flow**, positioned relative to the **nearest positioned ancestor** (anything but `static`).
- **`fixed`** — removed from flow and positioned relative to the **viewport**, so it stays put when scrolling.
- **`sticky`** — behaves like relative until a **scroll threshold** (e.g. `top: 0`) is reached, then sticks inside its parent.

```css
.card { position: relative; }
.card .badge { position: absolute; top: 8px; right: 8px; }
```

Common gotchas: `sticky` doesn't work if an ancestor has `overflow: hidden` or the parent is no taller than the element, and `fixed` stops being relative to the viewport if an ancestor has `transform` or `filter`.
