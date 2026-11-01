---
title: What is the children prop and how does it help with component composition?
category: react
level: junior
tags: [component-patterns]
sources: []
---

`children` is a special prop holding **whatever JSX you put between a component's opening and closing tags**. It lets you build wrapper components that don't need to know what they wrap.

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>
}

<Card>
  <h2>Profile</h2>
  <Avatar name="Ada" />
</Card>
```

Why it matters:

- **Composition over configuration**: instead of many props like `title`, `icon`, `footer`, the caller passes the content directly.
- It reduces **prop drilling**: a parent can pass a ready component through a layout without the layout knowing its props.
- Layouts, modals, cards and providers are almost always built this way.

Type it as **`React.ReactNode`**, which covers elements, strings, numbers, arrays, `null` and more. You can also accept JSX in other named props, like `header` or `actions`, for multiple slots.
