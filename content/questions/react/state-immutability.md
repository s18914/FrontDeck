---
title: Why must you treat objects and arrays in React state as immutable?
category: react
level: mid
tags: [state, objects]
sources:
  - title: Updating Objects in State – React docs
    url: https://react.dev/learn/updating-objects-in-state
  - title: Updating Arrays in State – React docs
    url: https://react.dev/learn/updating-arrays-in-state
---

React decides whether state changed by **comparing references with `Object.is`**. If you mutate an object and set the same reference, React sees "nothing changed" and may **skip the re-render**; the UI goes out of sync with the data.

```tsx
// wrong: same array reference
todos.push(newTodo)
setTodos(todos)

// right: new array
setTodos([...todos, newTodo])
setUser({ ...user, address: { ...user.address, city } })
```

Mutation also breaks other things:

- Old renders' **snapshots** change under your feet, so closures and previous values become wrong.
- Optimisations that compare props by reference (memoization) stop working.
- Features like undo/history become impossible.

Practical rules:

- Arrays: use `map`, `filter`, spread, `toSorted()`, `toReversed()`, `with()` instead of `push`, `splice`, `sort`, `reverse`.
- Nested objects need copying **at every level you change**; spread is shallow.
- For deeply nested updates, **Immer** lets you write mutating-style code that produces new objects.

Mutating a fresh object you just created in the same render or handler is fine; only existing state must not be changed.
