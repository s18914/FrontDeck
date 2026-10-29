---
title: A teammate added the triangle variant to Shape — does this code still compile?
category: typescript
level: mid
tags: [type-narrowing, output-prediction]
sources: []
---

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.size ** 2
    default: {
      const unhandled: never = shape
      throw new Error(`Unknown shape: ${JSON.stringify(unhandled)}`)
    }
  }
}
```

<!-- answer -->

**No.** The line `const unhandled: never = shape` fails with an error like *Type '{ kind: "triangle"; … }' is not assignable to type 'never'*.

Why: after the `circle` and `square` cases, TypeScript has narrowed `shape` to the **remaining members** of the union. Before `triangle` existed nothing was left, so `shape` was `never` and the assignment was fine. Now the leftover is the triangle type, which **cannot be assigned to `never`**.

This is the **exhaustive check** pattern: it turns "I forgot to handle a new case" into a **compile error at the exact place** that needs updating. The `throw` still protects you at runtime if bad data arrives from outside.

Alternatives with the same effect:

- An **explicit return type** without a `default` — TypeScript reports that the function does not return a value on all paths.
- A helper `assertNever(x: never): never` reused across the codebase.
