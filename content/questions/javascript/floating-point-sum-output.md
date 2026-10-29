---
title: Why does 0.1 + 0.2 === 0.3 evaluate to false?
category: javascript
level: junior
tags: [type-coercion, output-prediction]
sources:
  - title: Number.EPSILON – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
---

```ts
console.log(0.1 + 0.2)
console.log(0.1 + 0.2 === 0.3)
```

<!-- answer -->

```ts
0.30000000000000004
false
```

JavaScript numbers are **64-bit binary floating-point** values (IEEE 754). Many decimal fractions like `0.1` and `0.2` **cannot be represented exactly in binary**, so they are stored as close approximations, and the tiny errors show up after addition.

How to deal with it:

- **Compare with a tolerance:** `Math.abs(a - b) < Number.EPSILON` (or a tolerance that fits your domain).
- **Use integers for money** — store amounts in cents (`1999` instead of `19.99`).
- **Round only for display** with `toFixed()` or `Intl.NumberFormat`.

This is not a JavaScript bug — every language using IEEE 754 doubles behaves the same way.
