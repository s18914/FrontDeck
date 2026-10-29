---
title: What does the typeof operator return and what are its quirks?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: typeof – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
---

`typeof` returns a **string describing the type** of a value: `'string'`, `'number'`, `'bigint'`, `'boolean'`, `'undefined'`, `'symbol'`, `'object'` or `'function'`.

The quirks interviewers ask about:

- `typeof null === 'object'` — a bug kept for backward compatibility. Check for null with `value === null`.
- `typeof [] === 'object'` — arrays are objects. Use **`Array.isArray()`**.
- `typeof NaN === 'number'` — NaN is a numeric value.
- `typeof function () {} === 'function'` — functions get their own result even though they are objects.
- `typeof undeclaredVariable` returns `'undefined'` instead of throwing, but using `typeof` on a `let`/`const` variable before its declaration still throws a `ReferenceError`.

For anything more specific (dates, class instances) use `instanceof` or other checks.
