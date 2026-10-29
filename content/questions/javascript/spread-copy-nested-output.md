---
title: What happens to the original object when you change a nested property of its spread copy?
category: javascript
level: junior
tags: [objects, output-prediction]
sources: []
---

```ts
const original = { name: 'Ann', address: { city: 'Paris' } }
const copy = { ...original }

copy.name = 'Bob'
copy.address.city = 'Rome'

console.log(original.name, original.address.city)
```

<!-- answer -->

```ts
Ann Rome
```

The spread operator makes a **shallow copy**:

- `name` is a **primitive**, so the copy has its own value. Changing `copy.name` does not affect `original`.
- `address` is an **object**, so only the **reference** is copied. Both `original.address` and `copy.address` point to the **same object**, and changing the city through one is visible through the other.

To change a nested value safely, copy every level you modify: `{ ...original, address: { ...original.address, city: 'Rome' } }`, or use `structuredClone` for a full deep copy. This is a very common source of bugs with React state.
