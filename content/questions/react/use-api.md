---
title: What does the use API do, and how is it different from regular hooks?
category: react
level: mid
tags: [hooks, suspense, context]
sources:
  - title: use – React docs
    url: https://react.dev/reference/react/use
---

`use(resource)` reads a value **during render** from a **promise** or a **context**. With a promise, the component **suspends** until it resolves, so the nearest `<Suspense>` shows its fallback, and a rejection goes to the nearest **error boundary**. With a context, it works like `useContext`.

```tsx
'use client'
function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise)
  return comments.map(c => <p key={c.id}>{c.text}</p>)
}
```

How it differs from hooks:

- It can be called **inside conditions and loops**, for example reading a context only in the branch that needs it. It must still be called inside a component or a hook.
- It **cannot be called inside `try`/`catch`**, because it works by throwing internally to suspend. Handle failures with an error boundary, or attach `.catch()` to the promise to resolve to a fallback value.

The promise must be **stable across renders**. A typical pattern: a Server Component starts a fetch without awaiting it and passes the promise to a Client Component, which reads it with `use` inside a Suspense boundary. A promise created directly in a client component's render is a new object each time, so the component keeps suspending.
