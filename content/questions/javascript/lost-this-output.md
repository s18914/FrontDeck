---
title: What happens when an object method is assigned to a variable and called on its own?
category: javascript
level: mid
tags: [functions, output-prediction]
sources: []
---

```ts
// runs as an ES module
const user = {
  username: 'ann',
  getName() { return this.username },
}

const getName = user.getName
console.log(user.getName())
console.log(getName())
```

<!-- answer -->

```ts
'ann'
TypeError: Cannot read properties of undefined (reading 'username')
```

`this` depends on **how the function is called**, not where it was defined.

- `user.getName()` — called **on the object**, so `this` is `user`.
- `getName()` — a **plain call** with nothing before the dot. ES modules are strict, so `this` is **`undefined`**, and reading a property from it throws.

In an old-style non-strict script, `this` would be the global object instead, and the second call would quietly return `undefined`.

The same thing happens whenever you pass a method as a callback, e.g. `setTimeout(user.getName)` or `onClick={store.reset}`. Fixes:

- `const getName = user.getName.bind(user)`
- `() => user.getName()`

Class methods have exactly the same problem, which is why legacy React class components had to call `this.handleClick = this.handleClick.bind(this)` in the constructor.
