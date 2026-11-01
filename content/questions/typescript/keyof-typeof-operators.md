---
title: What do the keyof and typeof type operators do, and how are they combined?
category: typescript
level: mid
tags: [objects, generics]
sources:
  - title: Keyof Type Operator – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
  - title: Typeof Type Operator – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
---

**`keyof T`** produces a **union of the property names** of type `T`. **`typeof value`** in a type position gives you the **type of an existing variable**. Together they let you derive types from real runtime objects instead of writing them twice.

```ts
const routes = { home: '/', posts: '/posts', about: '/about' } as const

type RouteName = keyof typeof routes          // 'home' | 'posts' | 'about'
type RoutePath = (typeof routes)[RouteName]   // '/' | '/posts' | '/about'

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
getProp({ id: 1, name: 'Ann' }, 'name') // string
```

Key points:

- **Type-level `typeof` is not the JavaScript `typeof`** — the JS one returns a string like `'object'` at runtime, the TS one reads a type at compile time.
- `keyof` works on **types**, so with a value you need `keyof typeof value`.
- `K extends keyof T` plus indexed access `T[K]` is the standard pattern for **type-safe property access**.
- For an object with an index signature, `keyof` gives `string | number`, since numeric keys are also allowed.
