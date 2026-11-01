---
title: What are the main and cross axes in flexbox, and how do justify-content and align-items relate to them?
category: html-css
level: junior
tags: [css-layout]
sources:
  - title: Basic concepts of flexbox – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts
---

The **main axis** is the direction items are laid out in, set by `flex-direction`. The **cross axis** is perpendicular to it. **`justify-content`** aligns items along the main axis, and **`align-items`** aligns them along the cross axis.

- `flex-direction: row` (default) — main axis is **horizontal**, so `justify-content` moves items left/right and `align-items` moves them up/down.
- `flex-direction: column` — the axes **swap**: `justify-content` now works vertically.

```css
.toolbar {
  display: flex;
  justify-content: space-between; /* spread along the row */
  align-items: center;            /* vertically centered */
  gap: 8px;
}
```

Other useful properties:

- **`gap`** — space between items, no margin hacks needed.
- **`flex-wrap: wrap`** — lets items move to new lines.
- **`align-content`** — aligns those **lines** on the cross axis when wrapping.
- **`align-self`** — overrides `align-items` for one item.

The usual confusion is expecting `justify-content: center` to center vertically in a column layout; remember that the axes follow `flex-direction`.
