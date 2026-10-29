---
title: What are the differences between var, let and const?
category: javascript
level: junior
tags: [scope]
sources:
  - title: let – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
---

`var` is **function-scoped**, while `let` and `const` are **block-scoped**. `const` additionally **cannot be reassigned**. In modern code you use `const` by default and `let` when you need to reassign.

Other differences:

- **Hoisting:** `var` is hoisted and initialized to `undefined`. `let`/`const` are hoisted too, but accessing them before the declaration throws a `ReferenceError` (temporal dead zone).
- **Redeclaration:** `var x` can be declared twice in the same scope; `let`/`const` cannot.
- **Global object:** a top-level `var` in a classic script becomes a property of `window`; `let`/`const` do not.

A common misconception: `const` does **not make values immutable**. It only prevents reassigning the variable.

```ts
const list = [1, 2]
list.push(3) // fine – the array is mutated
list = []    // TypeError: Assignment to constant variable
```
