---
title: How can Redux Toolkit reducers mutate state without breaking immutability?
category: state-and-data
level: mid
tags: [state, objects]
sources:
  - title: Writing Reducers with Immer – Redux docs
    url: https://redux.js.org/toolkit/usage/immer-reducers
---

`createSlice` and `createReducer` run your reducer through **Immer**. Your code receives a **draft** (a Proxy), Immer records the changes you make to it, and then produces a **new immutable state** with **structural sharing**: untouched branches keep the same references.

```ts
// looks like mutation, but produces a new state object
todoToggled(state, action: PayloadAction<string>) {
  const todo = state.items.find((t) => t.id === action.payload)
  if (todo) todo.done = !todo.done
}
```

Rules and pitfalls:

- **Either mutate the draft or return a new value, never both** in the same reducer.
- Reassigning `state = newState` does nothing, because it only rebinds a local variable. To replace the whole state, **return** it.
- This only works **inside** Immer-powered reducers. Mutating state in a component or selector is still a bug.
- Logging a draft shows a Proxy. Use `current(state)` to inspect it.

Immutability still matters because `useSelector` and React compare **references** to decide whether to re-render.
