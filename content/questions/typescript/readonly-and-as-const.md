---
title: What do readonly and as const do, and do they make data immutable at runtime?
category: typescript
level: mid
tags: [objects]
sources: []
---

Both are **compile-time only**. They stop *your code* from mutating a value through that type, but **nothing is frozen at runtime** — for that you need `Object.freeze`.

- **`readonly` modifier** — on a property (`readonly id: string`) or an array (`readonly string[]` / `ReadonlyArray<string>`). Assignments and mutating methods like `push` become errors.
- **`as const`** — applied to a literal, it makes the whole value **deeply readonly** and keeps **literal types** instead of widening.

```ts
const config = { theme: 'dark', sizes: [8, 16] } as const
// { readonly theme: 'dark'; readonly sizes: readonly [8, 16] }

config.theme = 'light'  // error
config.sizes.push(24)   // error
```

Pitfalls:

- **`readonly` is shallow** — nested objects stay mutable unless they are readonly too. `Readonly<T>` is shallow as well.
- A readonly array **cannot be passed** where a mutable `string[]` is expected, so accept `readonly T[]` in function parameters you do not mutate.
- **Aliasing**: a mutable reference to the same object can still change it.

In React this is a good fit for props and state, which you should never mutate anyway.
