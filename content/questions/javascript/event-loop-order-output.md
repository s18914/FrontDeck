---
title: In what order are a synchronous log, a setTimeout callback and a promise callback executed?
category: javascript
level: mid
tags: [event-loop, output-prediction]
sources: []
---

```ts
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
```

<!-- answer -->

```ts
1
4
3
2
```

The order follows the event loop:

1. **Synchronous code runs first**, top to bottom: `1`, then `4`. The `setTimeout` and `.then` lines only **schedule** callbacks.
2. When the call stack is empty, **all microtasks run**: the promise callback logs `3`.
3. Only then does the event loop take the **next macrotask**: the timer callback logs `2`.

The key takeaway: **a promise callback always beats `setTimeout(…, 0)`** scheduled at the same time, because the microtask queue is drained before the next task. A delay of `0` means "as soon as possible after the current work", not "immediately".

Variations of this question add `async` functions or nested promises, but the same three-step rule answers all of them.
