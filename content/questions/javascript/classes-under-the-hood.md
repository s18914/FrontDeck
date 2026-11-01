---
title: Are JavaScript classes just syntactic sugar over prototypes?
category: javascript
level: mid
tags: [objects]
sources:
  - title: Classes – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
---

**Mostly yes**: a class creates a constructor function, and its methods are placed on `Constructor.prototype`, so instances use the regular **prototype chain**. But classes also add behavior that plain constructor functions do not have.

Differences worth mentioning:

- A class **must be called with `new`** — calling it as a function throws.
- Class bodies always run in **strict mode**.
- Class declarations are **not usable before their declaration** (temporal dead zone), unlike function declarations.
- Methods are **non-enumerable**, so they do not show up in `for...in`.
- **Private elements** (`#count`) give real privacy enforced by the language, not just a naming convention.
- In a subclass, you must call **`super()` before using `this`**.

```ts
class Counter {
  #count = 0
  increment() { return ++this.#count }
}
typeof Counter // 'function'
```

So the precise answer is: classes are built on prototypes, but they are **more than pure sugar**.
