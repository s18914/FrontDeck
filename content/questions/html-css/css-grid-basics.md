---
title: What is CSS Grid and how do you define rows and columns with it?
category: html-css
level: junior
tags: [css-layout]
sources:
  - title: Basic concepts of grid layout – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts
---

CSS Grid is a **two-dimensional** layout system: you define **rows and columns** on the container, and children are placed into the cells of that grid.

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}

.header { grid-column: 1 / -1; } /* span all columns */
```

Key concepts:

- **`fr` unit** — a fraction of the **remaining space**. `1fr 2fr` gives the second column twice as much.
- **`repeat()` and `minmax()`** — `repeat(3, 1fr)` makes three equal columns.
- **Placement** — `grid-column` and `grid-row` use **line numbers**; `-1` means the last line.
- **`grid-template-areas`** — name regions (`"header header" "sidebar main"`) and assign items with `grid-area`.
- **Auto-placement** — items without a position fill cells in order.

A very common responsive pattern with no media queries:

```css
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
```

It fits as many 240px+ columns as the width allows.
