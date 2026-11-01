---
title: Why and how would you create custom error classes?
category: javascript
level: mid
tags: [error-handling, objects]
sources: []
---

Custom errors let you **distinguish kinds of failures** and **attach extra data**, so calling code can react differently, e.g. show a form message for a validation error and a retry button for a network error. You create them by **extending `Error`**.

```ts
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

try {
  validate(form)
} catch (err) {
  if (err instanceof ValidationError) showFieldError(err.field, err.message)
  else throw err // rethrow what you cannot handle
}
```

Good practices:

- **Always throw `Error` objects, not strings** — only errors carry a **stack trace**.
- Set **`name`** so logs and error trackers show a meaningful type.
- Use the **`cause` option** to wrap a lower-level error without losing it: `new Error('Saving failed', { cause: err })`.
- **Rethrow** errors you do not know how to handle instead of silently swallowing them.
