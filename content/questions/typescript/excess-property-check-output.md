---
title: Which of these assignments compile, given that TypeScript is structurally typed?
category: typescript
level: senior
tags: [objects, output-prediction]
sources: []
---

```ts
interface User { name: string }

const a: User = { name: 'Ann', age: 30 }

const draft = { name: 'Ann', age: 30 }
const b: User = draft

function save(user: User) {}
save({ name: 'Ann', age: 30 })
save(draft)
```

<!-- answer -->

- `a` — **error**: *Object literal may only specify known properties, and 'age' does not exist in type 'User'*.
- `b` — **compiles**.
- `save({ name, age })` — **error**, same message.
- `save(draft)` — **compiles**.

The rule underneath is **structural typing**: a type is compatible if it has **at least** the required properties. `{ name: string; age: number }` has `name`, so it is a valid `User`. Extra properties are allowed in general.

On top of that, TypeScript runs **excess property checks**, but **only on fresh object literals** — literals written directly where a type is expected. There, an unknown property is almost always a typo (`colour` instead of `color`), so it is reported. Once the object is stored in a variable, it is no longer "fresh" and only the structural check applies.

Why this matters in practice:

- Excess property checks catch **typos in config objects and props**, but they are easy to bypass by accident with an intermediate variable or a spread.
- Structural typing means a function can receive objects with **extra data you did not expect** — e.g. passing a full user record to a function that serialises its argument may leak fields like `passwordHash`. Types do not strip properties at runtime.
- Excess property checks also do not apply to the object you get from `as User`, which is another reason to avoid assertions.

If you need "exactly this shape", pick properties explicitly or validate with a strict schema at the boundary.
