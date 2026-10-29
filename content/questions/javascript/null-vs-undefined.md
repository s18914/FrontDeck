---
title: What is the difference between null and undefined?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: undefined – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
---

`undefined` means **a value was never assigned** — for example an uninitialized variable, a missing object property or a missing function argument. `null` is an **intentional "no value"** that a developer sets explicitly.

Practical differences:

- `typeof undefined` is `'undefined'`, but `typeof null` is `'object'` (a historical bug).
- `null == undefined` is `true`, but `null === undefined` is `false`.
- **Default parameters** and destructuring defaults kick in only for `undefined`, not for `null`.
- `JSON.stringify` **drops properties** with `undefined` values but keeps `null`.

```ts
function greet(name = 'guest') { return name }
greet(undefined) // 'guest'
greet(null)      // null
```

A common convention is to let the language produce `undefined` and use `null` yourself when you want to say "empty on purpose".
