---
title: What is hoisting in JavaScript?
category: javascript
level: junior
tags: [scope]
sources:
  - title: Hoisting – MDN Glossary
    url: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
---

Hoisting means that **declarations are processed before the code runs**, so you can reference some names before the line where they are declared. The code is not physically moved — the engine registers declarations when it creates the scope.

How each kind of declaration behaves:

- **Function declarations** are hoisted **with their body**, so you can call them before they appear.
- **`var`** is hoisted and initialized to **`undefined`**.
- **`let`, `const` and `class`** are hoisted but **not initialized** — using them early throws a `ReferenceError` (temporal dead zone).
- **Function expressions and arrow functions** follow the rules of the variable they are assigned to.

```ts
sayHi() // works
function sayHi() {}

sayBye() // TypeError: sayBye is not a function
var sayBye = function () {}
```
