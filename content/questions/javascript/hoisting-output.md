---
title: What happens when you use var, let and a function declaration before they are declared?
category: javascript
level: junior
tags: [scope, output-prediction]
sources: []
---

```ts
console.log(a)
console.log(greet())
console.log(b)

var a = 1
let b = 2
function greet() { return 'hi' }
```

<!-- answer -->

```ts
undefined
'hi'
ReferenceError: Cannot access 'b' before initialization
```

- `a` — `var` declarations are hoisted and **initialized to `undefined`**; the assignment `= 1` stays where it is.
- `greet()` — **function declarations are hoisted with their body**, so the call works.
- `b` — `let` is hoisted but **not initialized**. Reading it before the declaration is in the **temporal dead zone** and throws.

Follow-up interviewers like: if `greet` were written as `var greet = function () {}`, the call would throw **`TypeError: greet is not a function`**, because only the variable (with value `undefined`) is hoisted, not the function.
