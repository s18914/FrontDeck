---
title: What is the difference between display block, inline and inline-block?
category: html-css
level: junior
tags: [css-layout]
sources: []
---

**Block** elements start on a new line and take the full available width. **Inline** elements flow inside a line of text and only take as much width as their content. **Inline-block** flows inline like text but can be sized like a block.

- **`block`** (`div`, `p`, `h1`, `section`) — respects `width`, `height`, margins and padding on all sides.
- **`inline`** (`span`, `a`, `strong`) — **ignores `width` and `height`**; vertical margins don't push other lines away, and vertical padding overlaps neighbouring lines.
- **`inline-block`** — sits in the line of text but respects **width, height and all margins**. Useful for badges or buttons in text.

```css
.badge {
  display: inline-block;
  padding: 2px 8px;
  height: 20px; /* works, unlike on an inline span */
}
```

A common gotcha: whitespace in the HTML between `inline-block` elements shows up as a **small gap**, because they are treated like words. For laying out rows of items today, **flexbox** is usually a better choice than `inline-block`.
