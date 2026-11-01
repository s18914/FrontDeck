---
title: What does a for loop with var and setTimeout log, and how does let change it?
category: javascript
level: mid
tags: [scope, event-loop, output-prediction]
sources: []
---

```ts
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0)
}
```

<!-- answer -->

```ts
3 3 3
0 1 2
```

Two things combine here:

- **Timing:** the `setTimeout` callbacks run only **after the whole loop has finished**, because they are queued as tasks and wait for the current code to complete.
- **Scope:** `var` is **function-scoped**, so there is **one single `i`** shared by all three closures. By the time they run, `i` is `3`.

With **`let`, each loop iteration gets its own binding** of `j`, so every closure captures a different variable with the value from its iteration.

Before `let` existed, the fix was an IIFE or passing the value as an argument, e.g. `setTimeout(console.log, 0, i)`. Today, using `let` is the answer interviewers expect.
