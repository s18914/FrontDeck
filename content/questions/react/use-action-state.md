---
title: What problem does useActionState solve, and how do you use it with a form?
category: react
level: mid
tags: [forms, hooks, state]
sources:
  - title: useActionState – React docs
    url: https://react.dev/reference/react/useActionState
---

`useActionState` wraps an Action and keeps **the result of its last run as state**, together with a pending flag: `const [state, formAction, isPending] = useActionState(action, initialState)`. It replaces the usual `useState` for errors, `useState` for loading and `try`/`finally` around a submit handler.

```tsx
type State = { error: string | null }

async function subscribe(prev: State, formData: FormData): Promise<State> {
  const email = String(formData.get('email') ?? '')
  if (!email.includes('@')) return { error: 'Invalid email' }
  await api.subscribe(email)
  return { error: null }
}

function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribe, { error: null })
  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>Subscribe</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  )
}
```

Key points:

- The action receives the **previous state first**, then the payload (`FormData` for forms).
- Passed to `<form action>`, it runs **inside a transition** automatically. Outside a form, call the dispatch function inside `startTransition`, otherwise `isPending` will not update.
- Multiple dispatches are **queued and run one after another**, each receiving the previous result.
- **Return expected errors** (validation) as state. A thrown error goes to the nearest error boundary.
- It also works with Server Functions, and the optional `permalink` argument supports submissions before JavaScript loads.
