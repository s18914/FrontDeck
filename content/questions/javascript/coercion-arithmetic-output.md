---
title: What do these mixed-type arithmetic expressions evaluate to?
category: javascript
level: junior
tags: [type-coercion, output-prediction]
sources: []
---

```ts
console.log(1 + '2')
console.log('3' - 1)
console.log('3' * '2')
console.log(true + 1)
console.log([] + [])
console.log(null + 1)
console.log(undefined + 1)
```

<!-- answer -->

```ts
'12'  // 1 + '2'
2     // '3' - 1
6     // '3' * '2'
2     // true + 1
''    // [] + []
1     // null + 1
NaN   // undefined + 1
```

The rule behind it: **`+` does string concatenation if either operand is a string** (after converting objects to primitives). All **other arithmetic operators (`-`, `*`, `/`) always convert to numbers**.

- `[] + []` — both arrays become empty strings, so the result is `''`.
- `true` becomes `1`, `null` becomes `0`, but **`undefined` becomes `NaN`**.

In real code, avoid relying on this — convert explicitly with `Number()` or `String()`. A typical bug is adding a value from an `<input>` (always a string) to a number and getting `'12'` instead of `3`.
