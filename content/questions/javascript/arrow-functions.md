---
title: How do arrow functions differ from regular functions?
category: javascript
level: junior
tags: [functions]
sources:
  - title: Arrow function expressions – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
---

Arrow functions are a shorter syntax, but the key difference is that they **do not have their own `this`** — they take `this` from the surrounding scope (lexical `this`).

Other differences:

- No own **`arguments`** object — use rest parameters (`...args`) instead.
- They **cannot be used as constructors** — calling them with `new` throws.
- `call`, `apply` and `bind` **cannot change their `this`**.
- With an expression body they **return implicitly**: `x => x * 2`. To return an object literal, wrap it in parentheses: `() => ({ id: 1 })`.

When to prefer each:

- Arrows are great for **callbacks** (`map`, `then`, `setTimeout`) because they keep the outer `this`.
- Avoid arrows as **object methods** that need `this` to point at the object — a regular method is the right tool there.
