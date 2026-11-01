---
title: What is the difference between px, em, rem, percent and viewport units in CSS?
category: html-css
level: junior
tags: [styling, css-layout]
sources: []
---

**`px`** is an absolute unit. **`rem`** is relative to the **root (`html`) font size**, **`em`** to the **current element's font size**, **`%`** to a property of the **parent**, and **viewport units** to the browser window.

- **`rem`** — predictable and respects the user's font-size setting. The default choice for type and spacing.
- **`em`** — compounds when nested (`1.2em` inside `1.2em` is `1.44×`). Useful for things that should scale with their own text, like a button's padding.
- **`%`** — for `width` it's the parent's width; for `font-size` it's the parent's font size.
- **`vw` / `vh`** — 1% of the viewport width / height.
- **`dvh`**, **`svh`**, **`lvh`** — viewport height that accounts for **mobile browser toolbars**. `100vh` is often taller than the visible screen on phones; **`100dvh`** follows the actual visible height.

```css
html { font-size: 100%; }  /* usually 16px */
h1 { font-size: 2rem; }    /* 32px */
.hero { min-height: 100dvh; }
```

Avoid `px` for font sizes: users who raise their default font size won't see a change.
