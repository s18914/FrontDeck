---
title: What are branded (nominal) types, and when would you use them in a structurally typed language?
category: typescript
level: senior
tags: [type-narrowing, objects]
sources: []
---

TypeScript is **structural**: two types with the same shape are interchangeable. So a `UserId` and an `OrderId` that are both `string` can be mixed up freely. A **brand** adds a fake, type-only property that makes otherwise identical types **incompatible**.

```ts
declare const brand: unique symbol
type Brand<T, B extends string> = T & { readonly [brand]: B }

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

function getUser(id: UserId) { /* … */ }

const orderId = 'o_123' as OrderId
getUser(orderId)  // error: OrderId is not assignable to UserId
getUser('u_1')    // error: plain string is not a UserId either
```

The property never exists at runtime — the value is still a plain string, so there is **zero runtime cost**.

Good use cases:

- **IDs of different entities** that are all strings or numbers.
- **Validated values** — `Email`, `NonEmptyString`, `PositiveInt` — where the brand proves a check already happened.
- **Units** — `Pixels` vs `Rem`, `Cents` vs `Euros`.

The important design rule: create branded values in **one place only**, a constructor or type guard that performs the real check:

```ts
function toEmail(input: string): Email {
  if (!input.includes('@')) throw new Error('Invalid email')
  return input as Email
}
```

If `as Email` is scattered across the codebase, the brand proves nothing. Schema libraries like Zod support brands directly (`z.string().email().brand<'Email'>()`), so parsing and branding happen together.

Trade-off: brands add friction (you must convert at boundaries such as API responses and database rows), so use them where mix-ups are **likely and costly**, not for every string.
