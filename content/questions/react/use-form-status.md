---
title: What does useFormStatus return, and why does it not work in the component that renders the form?
category: react
level: mid
tags: [forms, hooks]
sources:
  - title: useFormStatus – React docs
    url: https://react.dev/reference/react-dom/hooks/useFormStatus
---

`useFormStatus()` from `react-dom` returns `{ pending, data, method, action }` for the **parent `<form>`** that is being submitted through a function action. It is built for reusable pieces, like a submit button, that need to know the form is submitting **without receiving props**.

It reads the status from the nearest `<form>` **above** the calling component, similar to how context works. The component that renders the `<form>` sits above it, not inside it, so there `pending` is **always `false`**. The fix is to extract a child component:

```tsx
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
}

function ProfileForm() {
  return (
    <form action={saveProfile}>
      <input name="name" />
      <SubmitButton />
    </form>
  )
}
```

Other details:

- `data` is the `FormData` being submitted, so you can show "Saving Ada…" while it is pending.
- `action` is `null` when the form uses a URL string as `action`, since React only tracks function actions.
- Compared with `isPending` from `useActionState`, which belongs to the component that **owns** the action, `useFormStatus` serves components **deep inside** the form without prop drilling.
