---
title: What is the difference between == and === in JavaScript?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: Equality comparisons and sameness – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness
---

`===` (strict equality) compares values **without type conversion** — different types are never equal. `==` (loose equality) first **coerces** the operands to a common type and then compares them.

```ts
0 == ''           // true
'1' == 1          // true
null == undefined // true
0 === ''          // false
```

The coercion rules of `==` are hard to remember and lead to surprising results, so the common rule is: **always use `===`**. The one widely accepted exception is `value == null`, which checks for both `null` and `undefined` at once.

Two edge cases that both operators share:

- `NaN` is **not equal to itself**.
- Objects are compared **by reference**, not by content.

If you need to distinguish `-0` from `0` or treat `NaN` as equal to itself, use `Object.is()`.
