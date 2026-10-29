---
title: How does the nullish coalescing operator differ from the logical OR operator?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: Nullish coalescing operator (??) – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
---

`a ?? b` returns `b` only when `a` is **`null` or `undefined`**. `a || b` returns `b` when `a` is **any falsy value**, including `0`, `''` and `false`.

```ts
const count = 0
count || 10 // 10 – probably a bug
count ?? 10 // 0  – keeps the valid zero
```

Use `??` for **default values** when `0`, `''` or `false` are legitimate inputs (counts, empty strings from inputs, boolean settings). Use `||` only when you really want to replace every falsy value.

Details worth knowing:

- `??` cannot be mixed with `||` or `&&` without parentheses — it is a syntax error.
- There is an assignment form: `options.limit ??= 20` assigns only if the property is null or undefined.
- It pairs naturally with optional chaining: `user?.settings?.theme ?? 'light'`.
