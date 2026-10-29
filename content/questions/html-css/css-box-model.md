---
title: What is the CSS box model?
category: html-css
level: junior
tags: [css-layout]
sources:
  - title: The box model – MDN
    url: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model
---

Every element is rendered as a rectangular box made of four layers, from the inside out: **content**, **padding**, **border** and **margin**.

- **Content** — where text and children go, sized by `width` and `height`.
- **Padding** — space **inside** the border; it takes the element's background.
- **Border** — the line around the padding.
- **Margin** — space **outside** the border that pushes other elements away; it is always transparent.

What `width` actually means depends on **`box-sizing`**:

- `content-box` (the default) — `width` is only the content; padding and border are **added on top**.
- `border-box` — `width` includes content, padding and border, which is much easier to reason about.

That's why most projects start with a reset like this:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Two more details: vertical margins between blocks can **collapse** into one, and inline elements ignore `width`, `height` and vertical margins.
