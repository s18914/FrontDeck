---
title: What is useId for and why not use Math.random for element IDs?
category: react
level: mid
tags: [hooks, aria, hydration]
sources:
  - title: useId – React docs
    url: https://react.dev/reference/react/useId
---

`useId` generates a **unique ID per component instance that is the same on the server and the client**. Use it to connect elements through accessibility attributes.

```tsx
function PasswordField() {
  const hintId = useId()
  return (
    <>
      <input type="password" aria-describedby={hintId} />
      <p id={hintId}>At least 12 characters.</p>
    </>
  )
}
```

Why not hard-code or randomise:

- A **hard-coded ID** breaks when the component is rendered twice on one page: duplicate IDs make `aria-describedby` and `<label htmlFor>` point to the wrong element.
- **`Math.random()`** or a global counter produces different values on the server and in the browser, causing **hydration mismatches**. `useId` is based on the component's position in the tree, so both sides agree.

Rules:

- **Don't use it for list `key`s**; keys should come from your data.
- For several related IDs, call it once and add suffixes: `` `${id}-name` ``, `` `${id}-email` ``.
- Treat the value as opaque; its exact format is an implementation detail.
