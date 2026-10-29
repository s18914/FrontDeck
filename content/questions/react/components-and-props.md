---
title: What are components and props in React?
category: react
level: junior
tags: [component-patterns]
sources: []
---

A component is a **JavaScript function that returns JSX**. Props are the **inputs** a parent passes to it, received as a single object argument.

```tsx
type AvatarProps = { name: string; size?: number }

function Avatar({ name, size = 48 }: AvatarProps) {
  return <img alt={name} width={size} src={`/avatars/${name}.png`} />
}

<Avatar name="Ada" size={64} />
```

Key points:

- Props are **read-only**. A component must never change its own props; to change something over time it needs **state**.
- Any value can be a prop: strings, numbers, objects, functions (callbacks) and JSX.
- Destructuring with **default values** is the usual way to handle optional props.
- When the parent passes new props, the component re-renders with them.

Think of a component like a function: same props in, same UI out.
