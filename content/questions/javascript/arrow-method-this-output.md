---
title: What does this refer to in a regular method, an arrow function property and an arrow inside a method?
category: javascript
level: mid
tags: [functions, output-prediction]
sources: []
---

```ts
// runs as an ES module
const user = {
  username: 'ann',
  regular() { return this.username },
  arrow: () => this?.username,
  nested() { return [1].map(() => this.username) },
}

console.log(user.regular())
console.log(user.arrow())
console.log(user.nested())
```

<!-- answer -->

```ts
'ann'
undefined
['ann']
```

- `regular()` — a normal method called as `user.regular()`, so **`this` is `user`**.
- `arrow` — arrow functions **do not get their own `this`**. An object literal does not create a scope, so the arrow takes `this` from the **module top level**, where it is `undefined`. Without the `?.` it would throw.
- `nested()` — the arrow inside `map` takes `this` from the **enclosing method**, which is `user`. This is the case where arrows are genuinely useful.

Rule of thumb: **regular functions for object methods, arrows for callbacks inside them**.

Classes behave differently: an arrow **class field** like `handleClick = () => {}` does point at the instance, because field initializers run with `this` set to the newly created object.
