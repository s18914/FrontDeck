---
title: How does useOptimistic work, and what happens when the request fails?
category: react
level: mid
tags: [forms, state, async]
sources:
  - title: useOptimistic – React docs
    url: https://react.dev/reference/react/useOptimistic
---

`useOptimistic(value, reducer?)` returns a **temporary version of state** that is shown only **while an Action is pending**. You call its setter inside an Action to show the expected result immediately. When the Action finishes, the optimistic value is dropped and the component shows `value` again, which by then should contain the real, updated data.

```tsx
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (current, newTodo: Todo) => [...current, { ...newTodo, pending: true }],
)

async function addTodoAction(formData: FormData) {
  const todo = { id: crypto.randomUUID(), text: String(formData.get('text')) }
  addOptimisticTodo(todo) // shown instantly, dimmed via `pending`
  await saveTodo(todo)    // real `todos` is refreshed after the save
}
// <form action={addTodoAction}> ... render optimisticTodos
```

What to know:

- **Rollback is automatic.** If the request fails, the transition still ends, the optimistic value disappears and the UI shows the unchanged `value`. You still need to **tell the user**, for example by catching the error and showing a message.
- The setter must run **inside an Action**: a form action, an Action prop or `startTransition`. Outside one, React warns and the optimistic value flashes and reverts.
- With a reducer, if `value` changes while the Action is pending, React **re-applies** the optimistic change on top of the fresh data.
- Flagging items as `pending` lets you style unconfirmed items differently.
