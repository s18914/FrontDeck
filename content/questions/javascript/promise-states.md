---
title: What is a Promise and what states can it be in?
category: javascript
level: junior
tags: [async]
sources:
  - title: Promise – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
---

A Promise is an object representing the **future result of an asynchronous operation**. It is in one of three states: **pending**, **fulfilled** (with a value) or **rejected** (with a reason, usually an error).

Key points:

- Once a promise is fulfilled or rejected, it is **settled** and its state **never changes again**.
- You react to the result with **`.then()`** (success), **`.catch()`** (error) and **`.finally()`** (always).
- These callbacks **always run asynchronously**, even if the promise is already settled.
- Promises replaced deeply nested callbacks ("callback hell") with **flat chains**, and are the foundation of `async`/`await`.

```ts
fetch('/api/user')
  .then((res) => res.json())
  .then((user) => console.log(user))
  .catch((error) => console.error(error))
```
