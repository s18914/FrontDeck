---
title: What is the difference between any and unknown?
category: typescript
level: junior
tags: [type-narrowing]
sources: []
---

Both accept any value. **`any` turns type checking off** — you can do anything with it. **`unknown` is the safe version** — you must narrow it before you can use it.

```ts
function handle(a: any, u: unknown) {
  a.foo.bar()          // compiles, may crash at runtime
  u.foo                // error: 'u' is of type 'unknown'
  if (typeof u === 'string') u.toUpperCase() // OK after narrowing
}
```

Key points:

- `any` is **contagious** — values derived from it are also `any`, so errors spread silently.
- Use `unknown` for data you do not control: `JSON.parse` results, API responses, `catch (error)` (it is `unknown` in strict mode).
- Reach for `any` only as a temporary escape hatch, ideally with a comment explaining why.
