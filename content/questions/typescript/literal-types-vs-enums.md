---
title: Why do many teams prefer a union of string literals over an enum?
category: typescript
level: junior
tags: [objects]
sources:
  - title: Enums – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/enums.html
---

A union like `'idle' | 'loading' | 'error'` gives the same safety as an enum but is **pure type information** — it disappears at compile time and works with plain strings. An `enum` is one of the few TypeScript features that **generates runtime code**.

Why the union is usually nicer:

- **No import needed** — you write `'loading'`, not `Status.Loading`.
- **Works with any data** — JSON from an API is plain strings, which match the union directly.
- **Fits type-stripping tools** — Node's built-in TypeScript support and the `erasableSyntaxOnly` flag reject enums.

When you also need the values at runtime (e.g. to render a `<select>`), use an array (or object) with `as const` and derive the type from it:

```ts
const STATUS = ['idle', 'loading', 'error'] as const
type Status = (typeof STATUS)[number] // 'idle' | 'loading' | 'error'
```
