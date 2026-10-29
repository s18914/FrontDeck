---
title: How does destructuring work and when do default values apply?
category: javascript
level: junior
tags: [objects]
sources:
  - title: Destructuring – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
---

Destructuring **unpacks values from arrays or properties from objects** into variables. Default values are used **only when the value is `undefined`** — not for `null` or other falsy values.

```ts
const { name, age = 18, address: { city } = {} } = user
const [first, , third = 0] = numbers

const { role = 'user' } = { role: null } // role is null, not 'user'
```

Useful patterns:

- **Renaming:** `const { id: userId } = user`.
- **Nested defaults** (`address: { city } = {}`) prevent a crash when the nested object is missing.
- **Function parameters:** `function Card({ title, size = 'md' }) {}` — the standard way to read React props.

Pitfall: destructuring from `undefined` or `null` throws a `TypeError`, so add a default for optional nested objects.
