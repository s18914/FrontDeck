---
title: What are the common ways to render content conditionally in React?
category: react
level: junior
tags: [rendering]
sources: []
---

Because JSX is JavaScript, you use **normal JavaScript conditions**: an early `return`, the ternary operator, or `&&`.

```tsx
function Inbox({ user, messages }: Props) {
  if (!user) return <LoginPrompt />          // early return

  return (
    <section>
      {messages.length > 0 ? <List items={messages} /> : <Empty />}
      {user.isAdmin && <AdminPanel />}
    </section>
  )
}
```

Key points:

- `if` statements cannot go **inside** JSX, only before the `return`.
- Returning **`null`** renders nothing.
- With `&&`, keep the left side a real boolean. `{count && <Badge />}` renders `0` when `count` is zero; write `{count > 0 && <Badge />}`.
- For more than two branches, compute a variable first or extract a small component instead of nesting ternaries.
- Hiding with CSS keeps the component mounted and its state alive; conditional rendering **unmounts** it.
