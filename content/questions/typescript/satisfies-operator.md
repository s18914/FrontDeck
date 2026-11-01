---
title: What does the satisfies operator do, and how is it different from a type annotation?
category: typescript
level: mid
tags: [objects]
sources:
  - title: TypeScript 4.9 – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html
---

`value satisfies T` **checks that the value matches `T`** but **keeps the more specific inferred type**. A type annotation (`const x: T = …`) also checks, but then **replaces** the inferred type with `T`.

```ts
type Theme = Record<'primary' | 'secondary', string | [number, number, number]>

const annotated: Theme = { primary: '#3178c6', secondary: [0, 0, 0] }
annotated.primary.toUpperCase() // error: might be a tuple

const checked = { primary: '#3178c6', secondary: [0, 0, 0] } satisfies Theme
checked.primary.toUpperCase()   // OK, still known to be string
```

Why it is useful:

- You get **validation** (missing keys, typos, wrong value types are errors) without losing precise types.
- Unlike `as`, it **never lies** — a mismatch is a compile error.
- Combined with **`as const`** (`{ … } as const satisfies Config`) it keeps literal types too, a common pattern for route maps, config and design tokens.

Rule of thumb: **annotate** when you want the variable to have exactly type `T` (e.g. it will be reassigned), **use `satisfies`** for constant objects whose specific shape you want to keep.
