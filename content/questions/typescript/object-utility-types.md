---
title: What do Partial, Required, Pick, Omit and Record do, and when do you use them?
category: typescript
level: mid
tags: [utility-types, objects]
sources:
  - title: Utility Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/utility-types.html
---

They are built-in **utility types that derive a new object type from an existing one**, so you do not duplicate fields by hand and derived types stay in sync with the source.

- **`Partial<T>`** — all properties optional. Typical for update payloads: `updateUser(id, changes: Partial<User>)`.
- **`Required<T>`** — all properties required. Useful for config after defaults are applied.
- **`Pick<T, K>`** — keep only the listed keys: `Pick<User, 'id' | 'name'>` for a list item.
- **`Omit<T, K>`** — remove keys: `Omit<User, 'id'>` for a create form.
- **`Record<K, V>`** — an object with keys `K` and values `V`: `Record<Status, string>` for a label map.

```ts
type User = { id: string; name: string; email: string; avatar?: string }
type NewUser = Omit<User, 'id'>
const labels: Record<'idle' | 'error', string> = { idle: 'Ready', error: 'Failed' }
```

Pitfalls:

- They are **shallow** — `Partial` does not make nested objects partial.
- **`Omit` does not check that the key exists** (`Omit<User, 'nmae'>` compiles), while `Pick` does.
- `Record<string, V>` claims **every** key exists; reading `labels[key]` gives `V`, not `V | undefined`, unless `noUncheckedIndexedAccess` is on.
