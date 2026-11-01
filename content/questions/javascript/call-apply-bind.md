---
title: What is the difference between call, apply and bind?
category: javascript
level: mid
tags: [functions]
sources:
  - title: Function.prototype.call() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
---

All three set `this` explicitly. **`call` and `apply` invoke the function immediately** — `call` takes arguments one by one, `apply` takes them as an array. **`bind` does not call the function**; it returns a new function with `this` (and optionally some arguments) fixed.

```ts
function greet(greeting, mark) { return `${greeting}, ${this.name}${mark}` }
const user = { name: 'Ann' }

greet.call(user, 'Hi', '!')     // 'Hi, Ann!'
greet.apply(user, ['Hi', '!'])  // 'Hi, Ann!'
const hi = greet.bind(user, 'Hi')
hi('?')                         // 'Hi, Ann?'
```

Things worth knowing:

- A bound function's `this` **cannot be changed again** — calling `bind` or `call` on it has no effect on `this`.
- None of them affect **arrow functions**, which always use lexical `this`.
- `bind` with arguments is a form of **partial application**.
- `apply` is less needed today, since spread (`fn(...args)`) covers most cases.
