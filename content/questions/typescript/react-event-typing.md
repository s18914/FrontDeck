---
title: How do you type event handlers for inputs and forms in React?
category: typescript
level: mid
tags: [events, forms]
sources:
  - title: Using TypeScript – React docs
    url: https://react.dev/learn/typescript
---

React passes **synthetic event types** that are generic over the element: `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.KeyboardEvent<…>` and so on.

```tsx
function Search() {
  const [query, setQuery] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value) // value is typed as string
  }

  return <input value={query} onChange={handleChange} />
}
```

Useful details:

- **Inline handlers need no annotation** — `onChange={(e) => setQuery(e.target.value)}` gets the type from context. Annotate only when the handler is declared separately.
- To type the handler itself, use **`React.ChangeEventHandler<HTMLInputElement>`**.
- **`currentTarget`** is always typed as the element that has the listener. **`target`** is typed as a plain `EventTarget` for most events (it may be a child), so `e.target.value` fails on a `MouseEvent`.
- Not sure which type? **Hover the prop** in the editor (`onChange`, `onSubmit`) and copy the type it expects.

With React 19 form actions (`<form action={fn}>`) you often skip event typing entirely: the action receives a **`FormData`** object.
