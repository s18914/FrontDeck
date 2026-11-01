---
title: What are mapped types, and how do you rename or filter keys with them?
category: typescript
level: senior
tags: [generics, utility-types, objects]
sources:
  - title: Mapped Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
---

A mapped type **builds a new object type by iterating over a union of keys**, usually `keyof T`: `{ [K in keyof T]: … }`. It is how `Partial`, `Readonly`, `Pick` and `Record` are implemented.

Three tools make them flexible:

- **Modifiers** — add or remove `readonly` and `?` with `+` / `-`. `-?` makes every property required, `-readonly` makes it writable.
- **Indexed access** — `T[K]` reads the original property type, so you can transform it.
- **Key remapping with `as`** — rename keys (often with template literal types) or **drop a key by mapping it to `never`**.

```ts
type Mutable<T> = { -readonly [K in keyof T]: T[K] }

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}
type G = Getters<{ name: string; age: number }>
// { getName: () => string; getAge: () => number }

type OnlyFunctions<T> = {
  [K in keyof T as T[K] extends (...args: never[]) => unknown ? K : never]: T[K]
}
```

Details worth mentioning:

- `string & K` is needed because `keyof T` may include `number` and `symbol`, which `Capitalize` does not accept.
- A mapped type over `keyof T` is **homomorphic**: it preserves the original optional and readonly modifiers, which is why `Pick` keeps `?` on picked keys.
- Mapped types are **shallow**. A deep version (`DeepPartial`) needs recursion plus a conditional type, and must special-case arrays, functions and `Date`.

Use them to keep related types **derived from one source of truth** — e.g. form error types from a form values type — rather than maintaining parallel definitions by hand.
