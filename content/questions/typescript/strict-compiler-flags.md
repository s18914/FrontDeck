---
title: Which tsconfig strictness flags matter most, and what does noUncheckedIndexedAccess add on top of strict?
category: typescript
level: senior
tags: [type-narrowing, objects]
sources:
  - title: TSConfig strict – TypeScript docs
    url: https://www.typescriptlang.org/tsconfig/strict.html
  - title: TSConfig noUncheckedIndexedAccess – TypeScript docs
    url: https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html
---

**`strict: true`** is the baseline for any new project. It is a bundle of flags, and new strict checks are added to it over time. **`noUncheckedIndexedAccess`** is **not** part of it and closes one of the biggest remaining holes: index access that may return nothing.

The flags inside `strict` that matter most:

- **`strictNullChecks`** — `null` and `undefined` are separate types. Without it, almost every "cannot read property of undefined" bug is invisible to the compiler.
- **`noImplicitAny`** — parameters without a type and without context are errors instead of silent `any`.
- **`strictFunctionTypes`** — function parameters are checked **contravariantly**, so a handler that needs a `MouseEvent` cannot be passed where any `Event` may arrive. Method shorthand syntax is still checked bivariantly.
- **`useUnknownInCatchVariables`** — `catch (e)` is `unknown`, not `any`.
- **`strictPropertyInitialization`** — class fields must be initialised.

What `noUncheckedIndexedAccess` changes:

```ts
const users: User[] = []
const first = users[0]            // strict: User — with the flag: User | undefined
const labels: Record<string, string> = {}
labels['missing'].toUpperCase()   // crashes at runtime; the flag makes it a compile error
```

Without it, TypeScript assumes every index and every key of an index signature exists. With it, you must handle `undefined` (or use `for…of`, destructuring with defaults, or `.at()` with a check).

Other flags worth knowing: **`exactOptionalPropertyTypes`** (distinguishes a missing property from one set to `undefined`), **`noImplicitOverride`**, and **`noFallthroughCasesInSwitch`**.

Migration advice: turn flags on **one at a time** in an existing codebase, fix errors per flag, and never weaken them later. Next.js and Vite templates already ship with `strict: true`.
