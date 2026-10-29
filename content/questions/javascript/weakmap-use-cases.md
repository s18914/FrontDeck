---
title: What is a WeakMap and when is it useful?
category: javascript
level: mid
tags: [objects]
sources:
  - title: WeakMap – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
---

A `WeakMap` is a key-value collection whose **keys must be objects** and are **held weakly**: if nothing else references a key object, it can be garbage-collected together with its value.

Consequences of weak keys:

- It is **not iterable** and has **no `size`** — its contents can change whenever the garbage collector runs.
- It only supports `get`, `set`, `has` and `delete`.

Typical use cases:

- **Attaching extra data to objects you do not own**, e.g. metadata for DOM nodes or third-party objects, without causing memory leaks.
- **Caching results per object** — when the object disappears, the cache entry disappears too.
- **Private data per instance**, a pattern used before `#private` fields existed.

```ts
const cache = new WeakMap()
function getSize(node) {
  if (!cache.has(node)) cache.set(node, node.getBoundingClientRect())
  return cache.get(node)
}
```

A regular `Map` in the same code would keep removed DOM nodes in memory forever. `WeakSet` works the same way for sets of objects.
