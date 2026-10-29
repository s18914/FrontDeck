---
title: What is the difference between the spread syntax and rest parameters?
category: javascript
level: junior
tags: [objects, functions]
sources:
  - title: Spread syntax – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  - title: Rest parameters – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
---

Both use `...`, but they do opposite things: **spread expands** an iterable or object into individual elements, while **rest collects** multiple elements into a single array or object.

```ts
// spread – expand
const merged = [...a, ...b]
const updated = { ...user, name: 'Ann' }
Math.max(...numbers)

// rest – collect
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }
const { id, ...others } = user
```

Things to remember:

- Spread creates a **shallow copy** — nested objects are still shared.
- With object spread, **later properties win**, so order matters for overrides.
- A rest element must be **the last** one in the parameter list or destructuring pattern.
