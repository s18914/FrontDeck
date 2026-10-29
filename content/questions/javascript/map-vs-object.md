---
title: When would you use a Map instead of a plain object?
category: javascript
level: mid
tags: [objects]
sources:
  - title: Map – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
---

Use a `Map` when you need a **dynamic key-value collection**, especially with **non-string keys** or frequent additions and deletions. Use a plain object for **records with a known shape** and for data that goes to and from JSON.

Advantages of `Map`:

- **Keys can be any type** — objects, functions, numbers — not only strings and symbols.
- **Insertion order is guaranteed** and it is **directly iterable** (`for...of`, `map.entries()`).
- **`size`** is available without `Object.keys(obj).length`.
- No accidental collisions with inherited keys like `constructor` or `toString`.
- Optimized for frequent `set` and `delete` operations.

Advantages of objects:

- Simple literal syntax and destructuring.
- **Native JSON support** — a `Map` must be converted first (`Object.fromEntries(map)`).
- TypeScript types for fixed shapes are more natural.

In React state, remember that a `Map` must still be **replaced, not mutated**: `new Map(prev).set(key, value)`.
