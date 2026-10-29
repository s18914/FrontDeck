---
title: What are the primitive types in JavaScript?
category: javascript
level: junior
tags: [objects]
sources:
  - title: JavaScript data types and data structures – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures
---

JavaScript has **seven primitive types**: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` and `null`. Everything else — arrays, functions, dates, plain objects — is an **object**.

Key properties of primitives:

- They are **immutable**. Methods like `str.toUpperCase()` return a new value instead of changing the original.
- They are **compared by value**: `'a' === 'a'` is `true`.
- They have no methods of their own. When you call `'abc'.length`, the engine temporarily wraps the value in a `String` object (**autoboxing**).

A common trick question is `typeof null`, which returns `'object'`. That is a historical bug — `null` is still a primitive.
