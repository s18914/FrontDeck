---
title: What are generics, and why would you add a constraint with extends?
category: typescript
level: mid
tags: [generics, functions]
sources:
  - title: Generics – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/generics.html
---

Generics are **type parameters**: they let a function or type work with many types while **keeping the link between input and output**. A constraint (`T extends X`) limits which types are allowed, so you can safely use the members of `X` inside.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}
first([1, 2]) // number | undefined – T inferred as number

function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
longest('abc', 'de')  // OK, string has length
longest(10, 20)       // error, number has no length
```

Why not just use `any` or a union? With `any` you lose the output type. With `(a: { length: number })` you get the **base type back**, not the specific type you passed in.

Good practice:

- Let TypeScript **infer** type arguments; pass them explicitly only when inference cannot work.
- Use a type parameter only if it **relates two things** (input to output, or two inputs). A generic used once is usually unnecessary.
- `extends` in a generic means "is assignable to", not class inheritance.
