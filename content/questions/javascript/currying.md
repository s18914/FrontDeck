---
title: What is currying in JavaScript?
category: javascript
level: mid
tags: [functions, scope]
sources: []
---

Currying transforms a function that takes several arguments into a **sequence of functions that each take one argument**: `f(a, b, c)` becomes `f(a)(b)(c)`. It relies on **closures** — each returned function remembers the arguments passed so far.

```ts
const multiply = (a) => (b) => a * b

const double = multiply(2)
double(5) // 10
[1, 2, 3].map(multiply(3)) // [3, 6, 9]
```

Why it is useful:

- You can **pre-configure** a function and reuse it (`double`, `withLogger(prefix)`).
- It produces small single-argument functions that fit well with `map`, `filter` or function composition.

A related but different term is **partial application** — fixing some arguments and getting back a function that takes the rest at once (e.g. with `bind`). Interviewers like to check that you can tell the two apart: currying always yields one-argument steps.

Over-using currying makes code harder to read and debug, so in application code it is typically used sparingly.
