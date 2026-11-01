---
title: What is the difference between a shallow and a deep copy of an object?
category: javascript
level: mid
tags: [objects]
sources:
  - title: structuredClone() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
---

A **shallow copy** duplicates only the top level — nested objects are **still shared** between the original and the copy. A **deep copy** recursively duplicates everything, so the two are fully independent.

Ways to copy:

- **Shallow:** spread (`{ ...obj }`, `[...arr]`), `Object.assign`, `Array.from`, `slice`.
- **Deep:** **`structuredClone(obj)`** — built into browsers and Node. It handles `Date`, `Map`, `Set` and circular references.

Limitations of `structuredClone`: it **cannot clone functions** or DOM nodes, and class instances lose their prototype (they become plain objects).

The old trick `JSON.parse(JSON.stringify(obj))` is worse: it **drops `undefined` and functions**, turns `Date` into strings and throws on circular references.

In React you usually do not need deep copies. Instead you copy **only the path you change**:

```ts
setUser({ ...user, address: { ...user.address, city: 'Rome' } })
```
