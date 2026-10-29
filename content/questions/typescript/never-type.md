---
title: What does the never type represent?
category: typescript
level: junior
tags: [type-narrowing, functions]
sources: []
---

`never` is the type of a value that **can never exist**. It is the empty set of types: nothing is assignable to it (except `never` itself).

Where you meet it:

- **Functions that never return** — they always throw or loop forever.
- **Narrowed-out values** — after you have handled every member of a union, the leftover type is `never`.
- **Impossible types** — `string & number` reduces to `never`.

```ts
function fail(message: string): never {
  throw new Error(message)
}

function format(value: string | number) {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return value.toFixed(2)
  value // never – no cases left
}
```

That second use is what makes **exhaustive checks** possible: assigning a leftover value to `never` fails to compile when a new union member is not handled.
