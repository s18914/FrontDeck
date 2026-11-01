---
title: What is the difference between a union type and an intersection type?
category: typescript
level: junior
tags: [objects, type-narrowing]
sources: []
---

A **union** `A | B` means the value is **either A or B**. An **intersection** `A & B` means the value is **both A and B at once** — it has all properties of both.

```ts
type Id = string | number                  // one or the other
type Timestamps = { createdAt: Date }
type Post = { title: string } & Timestamps // title AND createdAt
```

The common pitfall with unions: you can only use members **shared by all options** until you narrow.

```ts
function print(id: Id) {
  id.toUpperCase()                         // error, number has no toUpperCase
  if (typeof id === 'string') id.toUpperCase() // OK
}
```

Intersections are mostly used to **combine object types**. Intersecting incompatible primitives (`string & number`) gives `never`.
