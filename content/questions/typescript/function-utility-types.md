---
title: How do ReturnType, Parameters and Awaited help you derive types from functions?
category: typescript
level: mid
tags: [utility-types, functions, async]
sources: []
---

They **extract types from an existing function** instead of declaring them again, so the types follow the implementation automatically.

- **`ReturnType<F>`** — the return type of function type `F`.
- **`Parameters<F>`** — the parameter types as a **tuple**; index it to get one: `Parameters<F>[0]`.
- **`Awaited<T>`** — unwraps a `Promise` (recursively), like `await` does.

They take a **type**, so you pass `typeof fn`, not `fn`:

```ts
async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`)
  return (await res.json()) as { id: string; name: string }
}

type Result = ReturnType<typeof getUser>           // Promise<{ id; name }>
type User = Awaited<ReturnType<typeof getUser>>    // { id; name }
type Args = Parameters<typeof getUser>             // [id: string]
```

Typical uses:

- Typing data returned from a server function or query helper without exporting a separate type.
- Wrapping a third-party function whose argument types are not exported.

Pitfall: with **overloaded functions**, these utilities only see the **last overload**.
