---
title: How does the useState hook work?
category: react
level: junior
tags: [hooks, state]
sources:
  - title: State – A Component's Memory – React docs
    url: https://react.dev/learn/state-a-components-memory
---

`useState` gives a component **memory that survives between renders**. It returns a pair: the **current value** and a **setter function** that updates it and asks React to re-render.

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

Key points:

- The argument is the **initial value**, used only on the first render. For expensive setup pass a function: `useState(() => loadDraft())`.
- A plain local variable would not work: it is reset on every render and changing it does not trigger a re-render.
- State is **private to each component instance**. Two `<Counter />` elements have separate counts.
- Calling the setter does not change the variable in the current render; the new value appears in the **next render**.
- With TypeScript the type is inferred, or set explicitly: `useState<User | null>(null)`.
