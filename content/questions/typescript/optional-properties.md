---
title: How do optional properties work in TypeScript, and how do you safely read them?
category: typescript
level: junior
tags: [objects]
sources:
  - title: Object Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/objects.html
---

A property marked with `?` **may be missing**, so its type becomes `T | undefined` when you read it. With `strictNullChecks` the compiler forces you to handle the `undefined` case.

```ts
type User = { name: string; address?: { city: string } }

declare const user: User
user.address.city            // error: possibly undefined
user.address?.city           // string | undefined
user.address?.city ?? 'n/a'  // string
```

Points worth knowing:

- **`name?: string` is not the same as `name: string | undefined`.** The second one must be present, even if its value is `undefined`.
- **Optional chaining `?.`** short-circuits to `undefined`, and the result type reflects that.
- Inside `if (user.address)` the compiler **narrows** the property, so no `?.` is needed there.
