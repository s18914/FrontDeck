---
title: What is the temporal dead zone?
category: javascript
level: mid
tags: [scope]
sources:
  - title: let – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
---

The temporal dead zone (TDZ) is the period **from the start of a block until a `let`, `const` or `class` declaration is evaluated**. The variable already exists in that scope, but it is **not initialized**, so any access throws a `ReferenceError`.

```ts
let x = 1
{
  console.log(x) // ReferenceError: Cannot access 'x' before initialization
  let x = 2
}
```

Key points:

- This proves `let` **is hoisted** — otherwise the log would read the outer `x = 1`. The inner `x` shadows the outer one for the **whole block**, including the lines above its declaration.
- The zone is **temporal**, not positional: a function declared above the variable can safely use it, as long as it is **called** after the declaration runs.
- Even `typeof x` throws inside the TDZ, unlike with undeclared variables.

Why it exists: it turns "use before initialization" into a loud error instead of the silent `undefined` you get with `var`.
