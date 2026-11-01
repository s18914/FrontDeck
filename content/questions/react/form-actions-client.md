---
title: How do form Actions work on the client in React 19, and how do they differ from an onSubmit handler?
category: react
level: mid
tags: [forms, async, events]
sources:
  - title: form – React docs
    url: https://react.dev/reference/react-dom/components/form
---

In React 19 you can pass a **function** to `<form action={fn}>`. On submit, React prevents the browser's default navigation, collects the fields into **`FormData`** and calls your function **inside a transition**, so it can be async and its pending state is tracked.

```tsx
function NewPostForm() {
  async function createPost(formData: FormData) {
    await api.createPost({ title: String(formData.get('title')) })
  }
  return (
    <form action={createPost}>
      <input name="title" />
      <button>Publish</button>
    </form>
  )
}
```

Differences from `onSubmit`:

- No `e.preventDefault()` and no manual `new FormData(e.currentTarget)`.
- Because it runs as a transition, it **integrates** with `useFormStatus`, `useActionState` and `useOptimistic`, and a thrown error reaches the nearest error boundary.
- After a successful action, React **resets uncontrolled fields** automatically. Controlled inputs keep their state.
- A `<button formAction={fn}>` can run a different action for one specific button.
- With Server Functions, the same form can even submit **before JavaScript loads**.

Pitfall: state updates after an `await` inside the action are not part of the transition, so wrap them in another `startTransition`. `onSubmit` is still fine when you need full control over the event, such as client-side validation that cancels submission.
