---
title: In what order does this code log when an async function awaits between other scheduled callbacks?
category: javascript
level: mid
tags: [event-loop, async, output-prediction]
sources: []
---

```ts
async function run() {
  console.log('A')
  await null
  console.log('B')
}

console.log('start')
run()
setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('then'))
console.log('end')
```

<!-- answer -->

```ts
start
A
end
B
then
timeout
```

Step by step:

- `start` — synchronous.
- `run()` executes **synchronously until the first `await`**, so `A` is logged immediately.
- `await null` pauses `run` and schedules the rest of it as a **microtask**.
- `setTimeout` queues a **macrotask**; `.then` queues a second **microtask**.
- `end` — synchronous code finishes.
- Microtasks run in the order they were queued: `B`, then `then`.
- Finally the macrotask: `timeout`.

The common mistake is thinking an async function runs entirely in the background. It **starts synchronously**, and only the code **after `await`** is deferred — even when the awaited value is not a promise at all, like `null` here.
