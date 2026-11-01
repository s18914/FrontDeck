---
title: How does promise chaining work?
category: javascript
level: mid
tags: [async]
sources:
  - title: Using promises – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
---

Every call to `.then()`, `.catch()` or `.finally()` **returns a new promise**. What that new promise resolves to depends on **what the callback does**, which is how values flow down the chain.

The rules:

- **Return a value** → the next `.then` receives it.
- **Return a promise** → the chain **waits for it** and passes on its result (promises are flattened).
- **Throw an error** → the next promises are rejected and execution **skips to the nearest `.catch`**.
- A **`.catch` that returns a value recovers** the chain — the following `.then` runs normally.

```ts
getUser()
  .then((user) => getOrders(user.id)) // returns a promise – the chain waits
  .then((orders) => orders.length)
  .catch(() => 0)                     // fallback value
```

The most common bug is **forgetting `return`** inside a `.then` with braces. The next step then receives `undefined` and does not wait for the inner promise, which causes race conditions and unhandled errors.
