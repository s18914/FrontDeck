---
title: What is NaN and how do you reliably check for it?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: Number.isNaN() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
---

`NaN` ("Not-a-Number") is a special **number value** produced by invalid math, e.g. `0 / 0` or `Number('abc')`. The reliable check is **`Number.isNaN(value)`**.

Why not other approaches:

- `NaN === NaN` is **`false`** — NaN is the only value not equal to itself, so `===` cannot find it.
- The global `isNaN()` **coerces its argument first**, so `isNaN('hello')` returns `true` even though `'hello'` is a string, not NaN.

```ts
Number.isNaN(NaN)     // true
Number.isNaN('hello') // false
isNaN('hello')        // true – misleading
Object.is(NaN, NaN)   // true
```

Related gotcha: `[NaN].indexOf(NaN)` returns `-1`, but `[NaN].includes(NaN)` returns `true`, because `includes` uses a comparison that treats NaN as equal to itself.
