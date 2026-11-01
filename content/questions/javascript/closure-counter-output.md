---
title: What do two counters created by the same factory function log?
category: javascript
level: junior
tags: [scope, output-prediction]
sources: []
---

```ts
function createCounter() {
  let count = 0
  return () => ++count
}

const a = createCounter()
const b = createCounter()

a()
a()
b()
console.log(a(), b())
```

<!-- answer -->

```ts
3 2
```

Each call to `createCounter()` runs the function body again, so it creates a **new, separate `count` variable**. The returned arrow function is a **closure** over its own `count`.

- `a` is called three times in total → its `count` is `3`.
- `b` is called twice in total → its `count` is `2`.

The counters **do not share state**. They would share it only if `count` were declared **outside** the factory, e.g. at module level.

The same mechanism is why each instance of a React component has its own state: state lives per instance, not per component definition.
