---
title: How is CSS specificity calculated?
category: html-css
level: junior
tags: [styling]
sources:
  - title: Specificity – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity
---

Specificity is a score with **three columns (A, B, C)** that decides which rule wins when several selectors match the same element. Columns are compared **left to right**, so one ID beats any number of classes.

- **A — IDs**: `#header`
- **B — classes, attributes, pseudo-classes**: `.btn`, `[type="text"]`, `:hover`
- **C — element types and pseudo-elements**: `p`, `li`, `::before`

```css
#nav .item a     /* 1-1-1 */
.nav .item:hover /* 0-3-0 */
ul li a          /* 0-0-3 */
```

`1-1-1` wins over `0-3-0`, even though the second one has more selectors.

Rules to remember:

- The universal selector `*` and combinators (`>`, `+`, ` `) add **nothing**.
- **Inline styles** beat any selector, and **`!important`** beats inline styles.
- When specificity is **equal, the later rule wins**.
- `:is()` and `:not()` take the specificity of their **most specific argument**, while `:where()` is always **zero**.

In practice, keep specificity **low and flat** (mostly single classes) so you don't end up fighting it with `!important`.
