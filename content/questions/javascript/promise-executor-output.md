---
title: What is logged when code runs inside a Promise constructor and in its then callback?
category: javascript
level: mid
tags: [event-loop, async, output-prediction]
sources: []
---

```ts
console.log('1')

const p = new Promise((resolve) => {
  console.log('2')
  resolve('3')
  console.log('4')
})

p.then((value) => console.log(value))
console.log('5')
```

<!-- answer -->

```ts
1
2
4
5
3
```

Two facts explain it:

- The function passed to `new Promise` (the **executor**) runs **synchronously**, right away. So `2` is logged between `1` and `5`.
- **`resolve()` does not stop the executor** — it only settles the promise. Code after it still runs, so `4` comes next. Use `return resolve(...)` if you want to exit early.

The `.then` callback is always **asynchronous** — it is queued as a **microtask**, even though the promise is already resolved. It runs after the remaining synchronous code (`5`), giving `3` last.

A related trap: wrapping already-asynchronous code in `new Promise` does not make anything faster or "more async". Only the callbacks are deferred, never the executor.
