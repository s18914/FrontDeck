---
title: How do primitive values differ from objects when you assign or compare them?
category: javascript
level: junior
tags: [objects]
sources: []
---

Assigning a primitive **copies the value**, while assigning an object **copies a reference** to the same object in memory. Likewise, primitives are compared by value and objects are **compared by reference**.

```ts
let a = 1
let b = a
b = 2 // a is still 1

const x = { n: 1 }
const y = x
y.n = 2 // x.n is now 2 – same object

console.log({ n: 1 } === { n: 1 }) // false – two different objects
```

Why it matters:

- Mutating an object through one variable is **visible through every other reference** to it.
- Equality checks on arrays/objects only tell you whether it is the **same instance**, not whether contents match.
- In React, state updates rely on reference changes, so you must create **new objects** instead of mutating existing ones.
