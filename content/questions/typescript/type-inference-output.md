---
title: What types does TypeScript infer for these declarations?
category: typescript
level: junior
tags: [output-prediction, objects]
sources: []
---

```ts
let a = 'hello'
const b = 'hello'
const c = [1, 'two']
const d = { role: 'admin' }
const e = [1, 2] as const
```

<!-- answer -->

```ts
let a: string
const b: 'hello'
const c: (string | number)[]
const d: { role: string }
const e: readonly [1, 2]
```

TypeScript infers types from values, then **widens** them when the value could change:

- **`let`** can be reassigned, so `'hello'` widens to `string`. A **`const`** primitive can never change, so it keeps the **literal type** `'hello'`.
- An **array literal** gets a union of its element types, not a tuple.
- **Object properties are mutable**, so `role` widens to `string` even though `d` is `const`. This is why passing `d` where `'admin' | 'user'` is expected fails.
- **`as const`** stops widening: everything becomes `readonly` and literal.

Let inference work for local variables and add annotations where it matters — function parameters and public APIs.
