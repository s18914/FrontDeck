---
title: How do async and await work?
category: javascript
level: junior
tags: [async]
sources:
  - title: async function – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
---

`async`/`await` is **syntax on top of promises** that lets you write asynchronous code that reads like synchronous code. An `async` function **always returns a promise**, and **`await` pauses that function** until the awaited promise settles.

```ts
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

Important details:

- `await` **does not block the thread** — only the async function pauses, the rest of the app keeps running.
- A rejected promise makes `await` **throw**, so errors are handled with regular **`try/catch`**.
- Returning a value from an async function **resolves** its promise; throwing **rejects** it.
- **Top-level `await`** works in ES modules, outside any function.
