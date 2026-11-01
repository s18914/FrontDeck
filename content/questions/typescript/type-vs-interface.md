---
title: What is the difference between a type alias and an interface?
category: typescript
level: junior
tags: [objects]
sources:
  - title: Everyday Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

For describing object shapes they are **almost interchangeable**. The real differences are what else they can express and how they extend.

- **`type` can name any type** — unions, primitives, tuples, function types, mapped and conditional types. An `interface` only describes object shapes.
- **Extending** — interfaces use `extends`, types use intersections (`&`). `extends` gives clearer errors when properties conflict.
- **Declaration merging** — two `interface` declarations with the same name merge into one. A duplicate `type` name is an error.

```ts
type Status = 'idle' | 'loading' | 'error' // only possible with type
interface User { id: string }
interface Admin extends User { permissions: string[] }
```

A common rule: pick one style for objects and be consistent. Many teams use `interface` for public object shapes and `type` for everything else.
