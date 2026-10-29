---
title: How do you type props and children of a React component, including extending native element props?
category: typescript
level: mid
tags: [component-patterns]
sources:
  - title: Using TypeScript – React docs
    url: https://react.dev/learn/typescript
---

Declare props as a **type or interface** and annotate the destructured parameter. Use **`React.ReactNode`** for `children`, and **`React.ComponentProps<'button'>`** to accept every native attribute of an element.

```tsx
import type { ComponentProps, ReactNode } from 'react'

type CardProps = { title: string; children: ReactNode }

function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}

type ButtonProps = ComponentProps<'button'> & { variant?: 'primary' | 'ghost' }

function Button({ variant = 'primary', ...rest }: ButtonProps) {
  return <button data-variant={variant} {...rest} />
}
```

Key points:

- **`ReactNode`** accepts anything React can render (elements, strings, numbers, arrays, `null`). `ReactElement` / `JSX.Element` is narrower — only JSX elements.
- **`ComponentProps<'button'>`** gives `onClick`, `disabled`, `type`, `aria-*` etc. for free. Use `ComponentProps<typeof MyComponent>` to reuse another component's props.
- In React 19, **`ref` is a regular prop** for function components, and `ComponentProps<'input'>` already includes it — no `forwardRef` needed.
- `React.FC` is not required; a plain function with typed props is the common style and handles generics better.
