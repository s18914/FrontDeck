---
title: What is a closure in JavaScript?
category: javascript
level: junior
tags: [scope, functions]
sources:
  - title: Closures – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
---

A closure is a function **together with the variables from the scope where it was created**. The inner function keeps access to those variables even after the outer function has returned.

```ts
function createCounter() {
  let count = 0
  return () => ++count
}

const next = createCounter()
next() // 1
next() // 2
```

Where closures show up in practice:

- **Private state** — `count` above cannot be accessed from outside.
- **Factories and callbacks** — event handlers, `setTimeout`, functions returned from other functions.
- **React hooks** — every render creates new closures over that render's props and state.

Important detail: a closure captures **variables, not values**. If the variable changes later, the closure sees the new value. The "stale closure" bug in React is the flip side: a callback created in an old render keeps reading that render's variables.
