---
title: When would you choose useReducer over useState?
category: react
level: mid
tags: [hooks, state]
sources:
  - title: Extracting State Logic into a Reducer – React docs
    url: https://react.dev/learn/extracting-state-logic-into-a-reducer
---

Choose `useReducer` when **state updates are complex or many handlers change the same state**. It moves update logic into one pure function, `reducer(state, action) => newState`, and components only `dispatch` actions that describe **what happened**.

```tsx
type Action =
  | { type: 'added'; id: string; text: string }
  | { type: 'toggled'; id: string }

function todosReducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'added':   return [...todos, { id: action.id, text: action.text, done: false }]
    case 'toggled': return todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
  }
}

const [todos, dispatch] = useReducer(todosReducer, [])
dispatch({ type: 'added', id: crypto.randomUUID(), text })
```

Good signs for a reducer:

- Several **related fields** change together (status, data, error).
- The next state depends on **non-trivial logic** you want to read in one place and **unit test** without rendering.
- Many event handlers would otherwise repeat similar `setX` calls.

Stick with `useState` for simple, independent values like a toggle or input text.

Notes: the reducer must be **pure**, so random IDs and side effects stay in the handler that dispatches. `dispatch` is stable, so it is safe to pass down. TypeScript **discriminated unions** make actions type-safe.
