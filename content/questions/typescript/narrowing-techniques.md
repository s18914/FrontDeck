---
title: What is type narrowing, and which checks does TypeScript use to narrow a type?
category: typescript
level: mid
tags: [type-narrowing]
sources:
  - title: Narrowing – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

Narrowing is how TypeScript **refines a broad type to a more specific one** inside a branch, based on runtime checks it understands. It follows **control flow**, so after an early `return` the rest of the function also sees the narrowed type.

The main checks:

- **`typeof`** — for primitives: `typeof x === 'string'`.
- **Truthiness** — `if (user)` removes `null` and `undefined` (but also `0` and `''` — a common bug).
- **Equality** — `x === null`, or comparing to a literal like `status === 'error'`.
- **`in`** — `'swim' in animal` picks union members that have that property.
- **`instanceof`** — for classes: `error instanceof TypeError`.
- **Discriminant property** — `shape.kind === 'circle'` on a discriminated union.
- **Type predicates** — your own `isUser(x): x is User` functions.

```ts
function render(value: string | string[] | null) {
  if (!value) return null              // removes null (and '')
  if (Array.isArray(value)) return value.join(', ')
  return value.toUpperCase()           // string
}
```

Pitfall: narrowing on an object property can be **reset inside callbacks**, because TypeScript cannot know the property did not change before the callback runs. Copy it to a `const` first.
