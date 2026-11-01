---
title: How do you write a custom type guard, and what is the risk?
category: typescript
level: mid
tags: [type-narrowing, functions]
sources: []
---

A custom type guard is a function whose return type is a **type predicate** `value is T`. When it returns `true`, TypeScript narrows the argument to `T` in that branch.

```ts
type User = { id: string; email: string }

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'email' in value && typeof value.email === 'string'
  )
}

const data: unknown = await res.json()
if (isUser(data)) data.email // User
```

The risk: **the compiler trusts the predicate blindly**. If the body checks the wrong thing, TypeScript still narrows, and you get a lie that looks type-safe. A guard is effectively an assertion you wrote yourself, so keep it small and test it.

Useful details:

- Since **TypeScript 5.5**, simple predicates are **inferred**, so `items.filter((x) => x !== undefined)` now returns `T[]` without a manual guard.
- **Assertion functions** (`asserts value is User`) throw instead of returning a boolean and narrow everything after the call.
- For complex external data, a schema library (Zod, Valibot) generates both the check and the type, so they cannot drift apart.
