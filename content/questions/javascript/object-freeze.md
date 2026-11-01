---
title: What does Object.freeze do and what are its limitations?
category: javascript
level: mid
tags: [objects]
sources:
  - title: Object.freeze() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
---

`Object.freeze(obj)` makes an object **immutable at the top level**: you cannot add, remove or change its properties. It returns the same object, now frozen.

Limitations and gotchas:

- It is **shallow** — nested objects can still be modified. A deep freeze requires freezing each nested object recursively.
- Failed writes **throw a `TypeError` in strict mode** (modules, classes) but **fail silently** in sloppy mode.
- It is different from `const`: **`const` protects the variable binding**, `freeze` protects the object's contents.

```ts
const config = Object.freeze({ api: { url: '/v1' }, retries: 3 })
config.retries = 5      // TypeError in strict mode
config.api.url = '/v2'  // works – nested object is not frozen
```

Related: `Object.seal` blocks adding and removing properties but still allows changing existing values. In TypeScript, `readonly` and `as const` give similar guarantees **only at compile time**, with no runtime cost.
