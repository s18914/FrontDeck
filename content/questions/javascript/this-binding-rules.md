---
title: How is the value of this determined in JavaScript?
category: javascript
level: mid
tags: [functions]
sources:
  - title: this – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
---

For regular functions, `this` is decided **by how the function is called**, not where it is defined. Arrow functions are the exception: they take `this` from the **surrounding scope**.

The rules, from highest priority:

1. **`new`** — `new Fn()` sets `this` to the newly created object.
2. **Explicit binding** — `fn.call(obj)`, `fn.apply(obj)` or a function created with `fn.bind(obj)`.
3. **Implicit binding** — `obj.method()` sets `this` to `obj` (the object before the dot).
4. **Default** — a plain call `fn()` gives `undefined` in strict mode, or the global object in sloppy mode.

The most common bug is **losing `this`** when a method is passed as a callback:

```ts
button.addEventListener('click', counter.increment) // this is the button, not counter
setTimeout(counter.increment, 100)                  // this is not counter either
```

Fixes: wrap it in an arrow (`() => counter.increment()`) or use `counter.increment.bind(counter)`. Note that **classes and ES modules are always strict**, so the default binding there is `undefined`.
