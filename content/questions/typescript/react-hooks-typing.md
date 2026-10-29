---
title: How do you type useState and useRef in React with TypeScript?
category: typescript
level: mid
tags: [hooks, state]
sources:
  - title: Using TypeScript – React docs
    url: https://react.dev/learn/typescript
---

Both are generic. **Inference from the initial value** is enough for simple cases; pass the type argument when the initial value does not describe all future values.

```tsx
const [count, setCount] = useState(0)                // number, inferred
const [user, setUser] = useState<User | null>(null)  // must be explicit
const [items, setItems] = useState<Item[]>([])       // [] alone → never[]

const inputRef = useRef<HTMLInputElement>(null)      // DOM ref
const timerRef = useRef<number | null>(null)         // mutable value

inputRef.current?.focus()
```

Pitfalls:

- **`useState(null)`** infers type `null`, so you can never set a user. **`useState([])`** infers `never[]`. Always pass the type for empty initial values.
- For a **DOM ref**, pass `null` and the element type. In React 19, `useRef<HTMLInputElement>(null)` returns `RefObject<HTMLInputElement | null>`, so `current` must be checked before use.
- In React 19 types **`useRef` requires an argument** — `useRef<number>()` is an error; write `useRef<number | undefined>(undefined)`.
- For state that is a **union of shapes** (loading / success / error), use a discriminated union type with `useState` or `useReducer` instead of several booleans.
