---
title: How does try...catch...finally behave, and what can it not catch?
category: javascript
level: mid
tags: [error-handling]
sources:
  - title: try...catch – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
---

`try` runs code, `catch` handles an exception thrown inside it, and **`finally` always runs** — after success, after an error, and even after a `return` in `try` or `catch`.

Behaviors interviewers check:

- **`return` in `finally` overrides** a return value or a thrown error from `try`/`catch`. It is almost always a bug.
- The catch binding is optional: `catch { … }` is valid when you do not need the error.
- `try/catch` only catches errors thrown **synchronously in that block** — or from promises that are **awaited** there.

What it does not catch:

```ts
try {
  setTimeout(() => { throw new Error('later') }, 0)
} catch {
  // never reached – the callback runs after try has finished
}
```

The same applies to event handlers and non-awaited promises. Those errors need handling **inside the callback** itself, or a `.catch` on the promise.

`finally` is the right place for **cleanup**: closing connections, releasing locks, resetting loading flags.
