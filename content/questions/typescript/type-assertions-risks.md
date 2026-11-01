---
title: Why are type assertions with as and the non-null assertion operator considered risky?
category: typescript
level: mid
tags: [type-narrowing]
sources:
  - title: Everyday Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

Both **tell the compiler to trust you** without any runtime check. If you are wrong, the code compiles and crashes later, far from the real mistake.

- **`value as User`** — overrides the inferred type. TypeScript only rejects it when the types are completely unrelated (and `as unknown as User` bypasses even that).
- **`value!`** — removes `null` and `undefined` from the type. It does not check anything.

```ts
const user = (await res.json()) as User      // the API may return anything
document.getElementById('root')!.focus()     // crashes if the element is missing
```

Safer alternatives:

- **Narrow** with a real check: `if (el) el.focus()`, or a type guard.
- **Validate** external data with a schema (Zod) instead of asserting.
- Use **`satisfies`** when you only want to check that a value matches a type.
- Annotate (`const x: User = …`) instead of asserting — annotation checks the value, assertion does not.

Assertions are fine when you **genuinely know more than the compiler** (e.g. a DOM element you just rendered), but each one should be a conscious, rare decision.
