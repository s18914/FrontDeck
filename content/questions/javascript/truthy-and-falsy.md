---
title: Which values are falsy in JavaScript?
category: javascript
level: junior
tags: [type-coercion]
sources:
  - title: Falsy – MDN Glossary
    url: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
---

A value is **falsy** if it becomes `false` when converted to a boolean (for example in an `if` or with `!!`). The falsy values are: **`false`, `0`, `-0`, `0n`, `''`, `null`, `undefined` and `NaN`**. Everything else is **truthy**.

Values that often surprise people because they are truthy:

- `'0'` and `'false'` (non-empty strings)
- `[]` and `{}` (all objects, even empty ones)

A classic pitfall in React:

```tsx
{items.length && <List items={items} />}
```

When `items.length` is `0`, the expression evaluates to `0`, and React **renders the number 0** on the page. Use an explicit boolean instead: `items.length > 0 && …`.
