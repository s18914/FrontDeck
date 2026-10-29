---
title: What is a Fragment in React and why would you use it?
category: react
level: junior
tags: [rendering]
sources:
  - title: Fragment – React docs
    url: https://react.dev/reference/react/Fragment
---

A Fragment **groups several elements without adding an extra DOM node**. A component must return a single root, and a Fragment satisfies that without wrapping everything in a `<div>`.

```tsx
function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Email</td>
    </>
  )
}
```

Why it matters:

- An extra `<div>` can **break valid HTML** (inside `<tr>`, `<ul>`, `<dl>`) and **break layouts** that depend on direct children, such as flexbox and grid.
- It keeps the DOM smaller and cleaner.

The short syntax `<>…</>` cannot take attributes. When you render fragments in a list and need a **`key`**, use the full form:

```tsx
{terms.map(t => (
  <Fragment key={t.id}>
    <dt>{t.word}</dt>
    <dd>{t.meaning}</dd>
  </Fragment>
))}
```
