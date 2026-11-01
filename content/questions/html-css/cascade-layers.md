---
title: What are CSS cascade layers and what problem does @layer solve?
category: html-css
level: mid
tags: [styling]
sources:
  - title: '@layer – MDN'
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer
---

Cascade layers let you group styles into **named layers with an explicit priority**. Between layers, **layer order beats specificity**, so a simple selector in a later layer wins over a very specific selector in an earlier one.

```css
@layer reset, base, components, utilities;

@layer components {
  #sidebar .card .title { color: gray; }
}

@layer utilities {
  .text-red { color: red; } /* wins, utilities is a later layer */
}
```

The problem it solves: **specificity wars**. Third-party CSS, resets and component libraries often use specific selectors, and overriding them used to mean adding more selectors or `!important`. With layers you put the library in a low layer and your own code in a higher one.

Rules worth knowing:

- Priority comes from the order layers are **first declared**, so declare them all at the top.
- **Unlayered styles beat all layered styles**.
- For **`!important`** the order is **reversed**: important styles in earlier layers win, which lets a reset protect key rules.
- You can import a stylesheet into a layer: `@import url(lib.css) layer(vendor);`.

Tailwind CSS v4 uses native cascade layers (`theme`, `base`, `components`, `utilities`) for exactly this reason.
