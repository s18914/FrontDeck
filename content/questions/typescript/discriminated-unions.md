---
title: What is a discriminated union and why is it useful for modelling state?
category: typescript
level: mid
tags: [type-narrowing, objects, state]
sources:
  - title: Narrowing – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

A discriminated union is a union of object types that share one **literal property** (the discriminant, often `kind`, `type` or `status`). Checking that property **narrows the whole object** to the matching member.

```ts
type Request =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string }

function view(req: Request) {
  switch (req.status) {
    case 'loading': return 'Loading…'
    case 'success': return `${req.data.length} users` // data exists here
    case 'error':   return req.error                  // error exists here
  }
}
```

Why it beats a single object with optional fields (`{ loading: boolean; data?: User[]; error?: string }`):

- **Impossible states become unrepresentable** — you cannot have `data` and `error` together, or `loading` with stale data, by accident.
- **No `?.` and `!` everywhere** — each branch knows exactly which fields exist.
- It works naturally with **exhaustive checks** and reducer actions (`useReducer`).

The discriminant must be a **literal type**, not a plain `string`, otherwise narrowing does not work.
