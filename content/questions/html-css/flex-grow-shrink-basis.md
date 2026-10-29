---
title: How do flex-grow, flex-shrink and flex-basis work together?
category: html-css
level: mid
tags: [css-layout]
sources:
  - title: flex – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex
---

**`flex-basis`** is an item's **starting size** on the main axis. If there is **free space** left, it is shared out by **`flex-grow`**; if the items **overflow**, they shrink according to **`flex-shrink`**.

- **`flex-basis`** — `auto` (default) uses the item's `width` or its content size; it can also be a length like `200px` or `0`.
- **`flex-grow`** — proportions of free space. With `1` and `2`, the second item gets **twice as much extra space**, not twice the total width.
- **`flex-shrink`** — how readily an item gives up space. It is weighted by the basis, so big items shrink more. `0` means "never shrink".

Common shorthands:

```css
.item { flex: 1; }        /* 1 1 0%  – equal widths, ignores content */
.item { flex: auto; }     /* 1 1 auto – grows from content size */
.item { flex: none; }     /* 0 0 auto – fixed size */
.sidebar { flex: 0 0 250px; }
```

The classic gotcha: items with long text or wide content **refuse to shrink** below their content width, because flex items have `min-width: auto`. Add **`min-width: 0`** (or `overflow: hidden`) to let them shrink, for example to make `text-overflow: ellipsis` work.

To get truly equal columns, use `flex: 1` (basis `0`), not `flex-grow: 1` alone, which keeps the `auto` basis and adds space on top of content size.
