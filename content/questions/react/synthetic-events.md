---
title: How do you handle events in React and what is a synthetic event?
category: react
level: junior
tags: [events]
sources:
  - title: Responding to Events – React docs
    url: https://react.dev/learn/responding-to-events
---

You pass a **function** to a camelCase prop such as `onClick` or `onChange`. React calls it with a **synthetic event**: a cross-browser wrapper around the native event with the same interface (`target`, `preventDefault()`, `stopPropagation()`).

```tsx
function SearchForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }
  return <form onSubmit={handleSubmit}>…</form>
}
```

Key points:

- Pass the function, **don't call it**: `onClick={handleClick}`, not `onClick={handleClick()}`. Use an arrow to pass arguments: `onClick={() => remove(id)}`.
- React **delegates** events: it attaches listeners at the root container, not on every element.
- The original event is available as **`e.nativeEvent`**.
- Events bubble through the React tree, and returning `false` does **not** prevent default; call `e.preventDefault()`.
- `onChange` on inputs fires on **every keystroke**, like the native `input` event.
