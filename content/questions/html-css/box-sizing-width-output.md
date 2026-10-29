---
title: How wide is each of these two boxes on the screen?
category: html-css
level: junior
tags: [css-layout, output-prediction]
sources: []
---

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  margin: 10px;
}

.a {
  box-sizing: content-box;
}

.b {
  box-sizing: border-box;
}
```

<!-- answer -->

**`.a` is 250px wide** and **`.b` is 200px wide** (measured from border edge to border edge).

- **`content-box`** (the default): `width` sets only the content. Padding and border are added: `200 + 2×20 + 2×5 = 250px`.
- **`border-box`**: `width` includes padding and border. The browser shrinks the content to fit: `200 − 40 − 10 = 150px` of content, 200px in total.

In both cases the **margin is not part of the width**. It adds 10px of space on each side, so each box takes up 20px more space in the layout than its visible size.

This is why `box-sizing: border-box` is in almost every CSS reset: `width: 50%` plus padding then still means exactly half, instead of overflowing.
