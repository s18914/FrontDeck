---
title: How do conditional types and the infer keyword work?
category: typescript
level: senior
tags: [generics, utility-types]
sources:
  - title: Conditional Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
---

A conditional type `T extends U ? X : Y` is a **type-level if/else**: if `T` is assignable to `U`, the result is `X`, otherwise `Y`. Inside the `extends` clause, **`infer R` declares a type variable** that TypeScript fills in by pattern matching, so you can pull a piece out of a type.

```ts
type ElementOf<T> = T extends readonly (infer E)[] ? E : never
type PropsOf<C> = C extends (props: infer P) => unknown ? P : never
type Unwrap<T> = T extends Promise<infer V> ? Unwrap<V> : T

type A = ElementOf<string[]>            // string
type B = Unwrap<Promise<Promise<number>>> // number
```

This is how built-ins like `ReturnType`, `Parameters` and `Awaited` are implemented.

The behaviour that surprises people is **distribution**. When the checked type is a **naked type parameter** and you pass a union, the condition is applied **to each member separately** and the results are unioned:

```ts
type ToArray<T> = T extends unknown ? T[] : never
type C = ToArray<string | number>        // string[] | number[]
type NoDistribute<T> = [T] extends [unknown] ? T[] : never
type D = NoDistribute<string | number>   // (string | number)[]
```

Distribution is what makes `Exclude<T, U>` and `Extract<T, U>` work. Wrapping both sides in a tuple turns it off. Also note that `never` is an empty union, so a distributive conditional over `never` returns `never`.

Practical advice: conditional types are powerful in **library and utility code**, but in application code prefer simple, named types — deeply nested conditionals produce error messages nobody can read and slow down the type checker.
